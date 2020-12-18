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
      setMessage("What do you want to drink?");
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
    setMessage(`Preparing ${what}...`);
    setInterval(1500);
  }

  return (
    <div className="app">
      <h1>Coffee Machine Simulator</h1>
      <div className="device">
        <div className="screen">
          {message}
          {status === "ON" && <ChooseDrink order={order} />}
        </div>

        <button
          className={`powerButton ${status !== "OFF" && "on"}`}
          onClick={togglePower}
        >
          {status === "OFF" ? "OFF" : "ON"}
        </button>
      </div>
      <footer>(useReducer)</footer>
    </div>
  );
}

function ChooseDrink({ order }) {
  const drinks = ["Tea", "Coffee", "Cappuccino"];

  return (
    <>
      {drinks.map((drink) => (
        <div key={drink}>
          <button className="choose" onClick={() => order(drink)}>
            {drink}
          </button>
        </div>
      ))}
    </>
  );
}
