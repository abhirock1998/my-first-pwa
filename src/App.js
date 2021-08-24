import React, { useState } from "react";
import "./App.css";
import fetchWeatherData from "./fetchWeather";
const imageUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

function App() {
  const [city, setCity] = useState("");
  const [current, setCurrent] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();
    const result = await fetchWeatherData(city);
    if (typeof result !== "string") {
      setCurrent(result);
    } else {
      alert(result);
    }

    setCity("");
  };
  return (
    <div className="app">
      <div className="app__container">
        <div className="app__result">
          <form className="app__input">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="Enter City"
            />
            <button onClick={handleClick} type="submit"></button>
          </form>
          {Object.keys(current).length !== 0 && (
            <div className="app__today">
              <h1>
                {current.name} <sup>{current.sys.country}</sup>
              </h1>
              <p>{Math.round(current.main.temp - 273)}&deg;C</p>
              <h3>{current.weather[0].main}</h3>
              <img src={imageUrl(current.weather[0].icon)} alt="icon" />
              <p>{current.weather[0].description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;


