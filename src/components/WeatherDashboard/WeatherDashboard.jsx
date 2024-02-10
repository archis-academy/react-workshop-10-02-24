import { useState, useEffect } from "react";
import "./WeatherDashboard.css";
import locationIcon from "/location.svg";
import searchIcon from "/search.svg";

function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Eskisehir");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d0def370a93e58fc50dffd11552d6ed4`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function handleSearchClick() {
    fetchData();
  }

  const currentDateTime = new Date();

  return (
    <div>
      <div className="search-container">
        <div className="search-container-left">
          <img src={locationIcon} />
          <input
            className="search-input"
            placeholder="Şehir adını giriniz..."
            type="text"
            onChange={handleCityChange}
          />
        </div>
        <img src={searchIcon} onClick={handleSearchClick} />
      </div>
      {weatherData ? (
        <div className="weather-display-container">
          <div className="weather-display-top">
            <p>{currentDateTime.toLocaleDateString()}</p>
            <p>{currentDateTime.toLocaleTimeString()}</p>
          </div>
          <div className="weather-display-bottom">
            <img src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png" />
            <div>
              <p>{weatherData.main.temp}°C</p>
              <p>{weatherData.weather[0].main}</p>
              <p>{weatherData.name}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default WeatherDashboard;
