import { useState } from "react"
import Header from "./components/Header"
import Search from "./components/Search"

export default function App() {

  const [temperature, setTemperature] = useState("celsius");
  const [windSpeed, setWindSpeed] = useState("km/h");
  const [precipitation, setPrecipitation] = useState("mm");
  const [place, setPlace] = useState(null);

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
          place={place}
        />
      </div>
    )
}
