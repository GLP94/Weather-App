import { useState, useEffect } from "react"
import Header from "./components/Header"
import Search from "./components/Search"
import Today from "./components/Today"
import Daily from "./components/Daily"
import Hourly from "./components/Hourly"
import sunny from "./assets/icon-sunny.webp"
import storm from "./assets/icon-storm.webp"
import snow from "./assets/icon-snow.webp"
import rain from "./assets/icon-rain.webp"
import partlyCloudy from "./assets/icon-partly-cloudy.webp"
import overcast from "./assets/icon-overcast.webp"
import fog from "./assets/icon-fog.webp"

export default function App() {

  const [temperature, setTemperature] = useState(localStorage.getItem("temperature") || "celsius");
  const [windSpeed, setWindSpeed] = useState(localStorage.getItem("windSpeed") || "kmh");
  const [precipitation, setPrecipitation] = useState(localStorage.getItem("precipitation") || "mm");
  const [place, setPlace] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    localStorage.setItem("temperature", temperature);
    localStorage.setItem("windSpeed", windSpeed);
    localStorage.setItem("precipitation", precipitation);
  }, [temperature, windSpeed, precipitation])

  useEffect(() => {

    if (!place) return;

    const fetchWorker = async () => {
      const { latitude, longitude } = place;
      setIsLoading(true);
      setWeather(null);

      const url = "https://api.open-meteo.com/v1/forecast?"
        + `&latitude=${latitude}`
        + `&longitude=${longitude}`
        + `&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m`
        + `&hourly=temperature_2m,weather_code`
        + `&current=temperature_2m,weather_code,apparent_temperature,wind_speed_10m,relative_humidity_2m,precipitation`
        + `&forecast_days=7`
        + `&timezone=auto`
        + `&temperature_unit=${temperature}`
        + `&wind_speed_unit=${windSpeed}`
        + `&precipitation_unit=${precipitation}`

      try {
        const response = await fetch(url)
        const data = await response.json();
        setWeather(data);
      }
      catch (err) {
        console.error(`Error: ${err}`)
      }
      finally{
        setIsLoading(false)
      }
    }

    fetchWorker();

  }, [precipitation, temperature, windSpeed, place])

  const weatherCodes = new Map([
    [0, sunny],
    [1, partlyCloudy], [2, partlyCloudy],
    [3, overcast],
    [45, fog], [48, fog],
    [56, rain], [57, rain], [61, rain], [63, rain],
    [65, rain], [66, rain], [67, rain], [80, rain],
    [81, rain], [82, rain],
    [71, snow], [73, snow], [75, snow], [77, snow],
    [85, snow], [86, snow],
    [95, storm], [96, storm], [99, storm]
  ])

  function getWeatherIcon(code) {
    return weatherCodes.get(code) || sunny;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="m-8 max-w-7xl font-[DM-Sans] flex flex-col md:items-center">
        <Header
          temperature={temperature}
          windSpeed={windSpeed}
          precipitation={precipitation}
          setTemperature={setTemperature}
          setWindSpeed={setWindSpeed}
          setPrecipitation={setPrecipitation}
        />
        <Search
          setPlace={setPlace}
          setNoResult={setNoResult}
          setWeather={setWeather}
        />
        {noResult &&
          <h1 className="text-center mt-8 text-2xl">No search result found!</h1>
        }
        {weather &&
          <div className="flex gap-4 flex-col md:flex-row">
            <div>
              <Today
                weather={weather}
                getWeatherIcon={getWeatherIcon}
                place={place}
                windSpeed={windSpeed}
                precipitation={precipitation}
                isLoading={isLoading}
              >
              </Today>
              <Daily
                weather={weather}
                isLoading={isLoading}
                getWeatherIcon={getWeatherIcon}
              >
              </Daily>
            </div>
            <div>
              <Hourly
                weather={weather}
                getWeatherIcon={getWeatherIcon}
                isLoading={isLoading}
              >
              </Hourly>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
