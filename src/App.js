import React, { useState } from "react";
import useInterval from "./useInterval";
import "./styles.css";

export default function App() {
  const [status, setStatus] = useState("OFF");
  const [message, setMessage] = useState("");
  const [startupInterval, setStartupInterval] = useState(null);

  function togglePower() {
    if (status === "ON") {
      setStatus("OFF");
      setMessage("");
    } else if (status === "OFF") {
      setStatus("ON");
      setMessage("Please wait...");
      setStartupInterval(1000);
    }
  }

  useInterval(() => {
    if (status !== "ON") return;
    setMessage("Welcome!");
    setStartupInterval(null);
  }, startupInterval);

  return (
    <div className="device">
      <div className="screen">{message}</div>

      <button
        className={`powerButton ${status === "ON" && "on"}`}
        onClick={togglePower}
      >
        {status}
      </button>
    </div>
  );
}
