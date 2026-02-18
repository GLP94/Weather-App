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
      let {latitude, longitude} = place;
      setIsLoading(true);
      setWeather(null);

      let url = "https://api.open-meteo.com/v1/forecast?" 
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

      try{
        let response = await fetch(url)
        let data = await response.json();
        console.log(data);
        setWeather(data);
      }
      catch(err){
        console.log(`Error: ${err}`)
      }
      finally{
        setIsLoading(false);
      }
    }
    
    fetchWorker();

  }, [precipitation, temperature, windSpeed, place])

  function getWeatherIcon(code){
    const values = {
        sunny: [0],
        partlyCloudy: [1, 2],
        overcast: [3],
        fog: [45, 48],
        rain: [56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
        snow: [71, 73, 75, 77, 85, 86],
        storm: [95, 96, 99]
    };

    const icons = { sunny, partlyCloudy, overcast, fog, rain, snow, storm };
    const iconName = Object.keys(values).find((key) => values[key].includes(code));

    return icons[iconName];
  }

    return(
      <div className="md:flex justify-center">
        <div className="m-4 font-[DM-Sans] w-[320px]">
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
            <>
              <Today 
                weather={weather} 
                getWeatherIcon={getWeatherIcon}
                place={place} 
                windSpeed={windSpeed}
                precipitation={precipitation}
              >
              </Today>
              <Daily
                weather={weather}
                isLoading={isLoading}
                getWeatherIcon={getWeatherIcon}
              >
              </Daily>
              <Hourly
                weather={weather}
                getWeatherIcon={getWeatherIcon}
              >
              </Hourly>
            </>
          }
        </div>
      </div>
    )
}
