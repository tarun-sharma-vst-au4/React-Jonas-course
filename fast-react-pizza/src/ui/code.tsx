import React, { useReducer } from "react";

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "setUsername":
      return { ...state, username: action.payload };
    case "toggleModal":
      return { ...state, isModalOpen: !state.isModalOpen };
    // More cases as needed
    default:
      return state;
  }
};

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    username: "",
    isModalOpen: false,
    // Initialize more state variables as needed
  });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>

      <input
        type="text"
        value={state.username}
        onChange={(e) =>
          dispatch({ type: "setUsername", payload: e.target.value })
        }
        placeholder="Enter username"
      />

      <button onClick={() => dispatch({ type: "toggleModal" })}>
        {state.isModalOpen ? "Close Modal" : "Open Modal"}
      </button>
      {/* More UI elements and state interactions */}
    </div>
  );
}

export default MyComponent;

const estTimeString = now.toLocaleString("en-US", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
