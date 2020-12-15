import React, { useState } from "react";
import useInterval from "./useInterval";
import "./styles.css";

export default function App() {
  const [status, setStatus] = useState("OFF");
  const [message, setMessage] = useState("");
  const [startupInterval, setStartupInterval] = useState(1000);

  function togglePower() {
    let newStatus = "";
    if (status === "ON") {
      newStatus = "OFF";
      setMessage("");
    } else if (status === "OFF") {
      newStatus = "ON";
      setMessage("Please wait...");
    }

    setStatus(newStatus);
  }

  useInterval(() => {
    if (status !== "ON") return;
    console.log("hoi");
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
