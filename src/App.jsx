import { useState, useEffect } from "react"
import Header from "./components/Header"
import Search from "./components/Search"
import Today from "./components/Today"

export default function App() {

  const [temperature, setTemperature] = useState(localStorage.getItem("temperature") || "celsius");
  const [windSpeed, setWindSpeed] = useState(localStorage.getItem("windSpeed") || "kmh");
  const [precipitation, setPrecipitation] = useState(localStorage.getItem("precipitation") || "mm");
  const [place, setPlace] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    localStorage.setItem("temperature", temperature);
    localStorage.setItem("windSpeed", windSpeed);
    localStorage.setItem("precipitation", precipitation);
  }, [temperature, windSpeed, precipitation])

  useEffect(() => {

    if (!place) return;
      
    const fetchWorker = async () => {
      let {latitude, longitude} = place;
      let url = "https://api.open-meteo.com/v1/forecast?" 
                + `&latitude=${latitude}`
                + `&longitude=${longitude}`
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
        setWeather(data);
      }
      catch(err){
        console.log(`Error: ${err}`)
      }
    }
    
    fetchWorker();

  }, [precipitation, temperature, windSpeed, place])

    console.log(weather)

    return(
      <div className="m-4">
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
        />
        {weather 
        && <Today weather={weather} place={place}>
          </Today>}
      </div>
    )
}
