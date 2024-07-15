import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector((state) => state.customer.fullName);

  console.log("Customer component rendered", customer);
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
