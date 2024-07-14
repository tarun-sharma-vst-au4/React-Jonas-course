// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Message from "./Message";
import styles from "./Form.module.css";
import Spinner from "./Spinner";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../context/CitiesContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { mapLat, mapLng } = useUrlPosition();
  const { createCity, isLoading } = useCities();
  console.log("Form Lat and Lng: ", mapLat, mapLng);
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isLoadingGeocoding, seTisLoadingGeocoding] = useState(false);
  const [getCodingError, setGeocodingError] = useState("");

  useEffect(() => {
    if (!mapLat && !mapLng) {
      return;
    }
    async function fetchCity() {
      try {
        seTisLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(
          `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
        );

        const data = await res.json();
        console.log("Data: ", data);
        if (!data.countryCode) {
          throw new Error("No country  found 🥲");
        }
        setCityName(data.city || data.locality || data.principalSubdivision);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        console.error("Error fetching city: ", error);
        setGeocodingError(error.message);
      } finally {
        seTisLoadingGeocoding(false);
      }
    }

    fetchCity();
  }, [mapLat, mapLng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) {
      return;
    }

    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: { lat: mapLat, lng: mapLng },
    };

    console.log("New City: ", newCity);
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) {
    return <Spinner />;
  }

  if (getCodingError) {
    return <Message message={getCodingError} />;
  }

  if (!mapLat && !mapLng) {
    return <Message message={"Start by clicking somewhere on the map"} />;
  }

  return (
    <form
      className={`${styles.form}  ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{` ${emoji}`}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <Button
          type={"back"}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
