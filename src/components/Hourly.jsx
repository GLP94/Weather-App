import {useState, useEffect} from "react"
import iconDropDown from "../assets/icon-dropdown.svg";

export default function Hourly({weather, getWeatherIcon}){

    const [extr, setExtr] = useState([])
    const [a, setA] = useState([])
    const [b, setB] = useState([])

    let hours = weather.hourly.time;
    let codes = weather.hourly.weather_code;
    let temperatures = weather.hourly.temperature_2m
    
    useEffect(() => {

        let curr = new Date().toISOString().slice(0, 16)

        const dateExtractor = () => {
            for (let i = 0; i < hours.length; i++){
                if (hours[i] >= curr){
                    setExtr(hours.slice(i, i + 24));
                    setA(codes.slice(i, i + 24));
                    setB(temperatures.slice(i, i + 24));
                    break;
                }
            }
        }

        dateExtractor();

    }, [hours, codes, temperatures])

    return(
        <section className="bg-(--neutral-800) rounded-2xl my-4 pb-4">
            <div className="flex justify-between items-center px-4 pt-6 pb-2">
                <h2 className="text-xl font-semibold">Hourly Forecast</h2>
                <button className="font-normal py-2 px-4 flex justify-between items-center bg-(--neutral-600) rounded-lg border border-(--neutral-600) w-30">Tuesday <img className="h-4 w-4" src={iconDropDown} /></button>
            </div>
            <div className="overflow-y-auto h-180 px-4">
                {extr.map((h, i) => (
                    <div key={i} className="p-3 my-4 bg-(--neutral-700) rounded-lg border border-(--neutral-600)">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img src={getWeatherIcon(a[i])} alt="Weather icon" className="w-12 h-auto mr-4"></img>
                                <span className=" text-xl">{new Date(h).toLocaleTimeString([], {hour: "numeric", hour12: true})}</span>
                            </div>
                            <span className="font-medium text-xl">{b[i].toFixed(0)}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )

}