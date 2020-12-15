import React, { useState } from "react";
import useInterval from "./useInterval";
import "./styles.css";

export default function App() {
  const [status, setStatus] = useState("OFF");
  const [message, setMessage] = useState("");
  const [interval, setInterval] = useState(null);

  function togglePower() {
    if (status === "ON") {
      setStatus("OFF");
      setMessage("");
    } else if (status === "OFF") {
      setStatus("STARTING");
      setMessage("Please wait...");
      setInterval(1000);
    }
  }

  useInterval(() => {
    if (status === "STARTING" || status === "FINISHED") {
      setStatus("ON");
      setMessage("Welcome!");
      setInterval(null);
    }

    if (status === "PREPARING") {
      setStatus("FINISHED");
      setMessage("Enjoy!");
      setInterval(1500);
    }
  }, interval);

  function order(what) {
    setStatus("PREPARING");
    setMessage("Preparing, please wait...");
    setInterval(1500);
  }

  return (
    <div className="device">
      <div className="screen">
        {message}
        {status === "ON" && (
          <div>
            <div>
              <button onClick={() => order("coffee")}>Koffie</button>
            </div>
            <div>
              <button onClick={() => order("espresso")}>Espresso</button>
            </div>
            <div>
              <button onClick={() => order("cappuccino")}>Cappuccino</button>
            </div>
          </div>
        )}
      </div>

      <button
        className={`powerButton ${status !== "OFF" && "on"}`}
        onClick={togglePower}
      >
        {status === "OFF" ? "OFF" : "ON"}
      </button>
    </div>
  );
}
