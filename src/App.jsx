import axios from "axios";
import { useState } from "react";

import "./index.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b6385109a5a43aa73163bb7d7b44d894&units=metric`;

  const fetchData = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  const getWeatherClass = () => {
    const weather = data.weather ? data.weather[0].main : null;

    switch (weather) {
      case "Clouds":
      case "Haze":
        return "clouds";
      case "Rain":
      case "Thunderstorm":
      case "Drizzle":
        return "rain";
      case "Clear":
      case "Few clouds":
      case "Scattered clouds":
        return "clear";
      default:
        return "default";
    }
  };

  return (
    <div className={`App ${getWeatherClass()}`}>
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={fetchData}
          placeholder="Introduce Localización..."
          type="text"
        />
      </div>
      {data.name != undefined && (
        <div className="container">
          <div className="position-up">
            <div className="location">
              <p className="city">{data.name}</p>
              <div className="temp">
                <h1>{data.main ? data.main.temp.toFixed() : null} ºC</h1>
              </div>
              <div className="state">
                <p>{data.weather ? <p>{data.weather[0].main}</p> : null}</p>
              </div>
            </div>
          </div>
          <div className="position-down">
            <div className="sensation">
              <p className="measure sensation">
                {data.main ? data.main.feels_like.toFixed() : null} ºC
              </p>
              <p className="sensation">Sens. Térmica</p>
            </div>
            <div className="humidity">
              <p className="measure humidity">
                {data.main ? data.main.humidity : null}%
              </p>
              <p className="humidity">Humedad</p>
            </div>
            <div className="wind">
              <p className="measure speed">
                {data.wind ? data.wind.speed.toFixed() * 3.6 : null}km/h
              </p>
              <p className="speed">Vel. Viento</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
