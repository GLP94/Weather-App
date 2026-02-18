import {useState, useEffect} from "react"
import iconDropDown from "../assets/icon-dropdown.svg";

export default function Hourly({weather, getWeatherIcon}){

    const [hour, setHour] = useState([]);
    const [a, setA] = useState([]);
    const [b, setB] = useState([]);
    const [appearance, setAppearance] = useState(false);
    const [daySelected, setDaySelected] = useState("");

    let hours = weather.hourly.time;
    let codes = weather.hourly.weather_code;
    let temperatures = weather.hourly.temperature_2m;

    useEffect(() => {

        let curr = new Date().toISOString().slice(0, 16);

        let dayRef = Number(daySelected)

        const dateExtractor = () => {
            setHour(hours.slice(dayRef, dayRef + 12));
            setA(codes.slice(dayRef, dayRef + 12));
            setB(temperatures.slice(dayRef, dayRef + 12));
        }
        

        dateExtractor();

    }, [hours, codes, temperatures, daySelected])

    return(
        <section className="bg-(--neutral-800) border border-(--neutral-700) rounded-2xl my-4 pb-4">
            <div className="flex justify-between items-center px-3 pt-6 relative pb-2">
                <h2 className="text-lg font-semibold">Hourly Forecast</h2>
                <div className="flex flex-col items-end">
                    <button 
                        onClick={() => setAppearance(prev => !prev)}
                        className="font-normal p-2 flex justify-between items-center bg-(--neutral-600) rounded-lg border border-(--neutral-600) w-30"
                    >
                        {new Date(hours[Number(daySelected)]).toLocaleString("en-US", {weekday: "long"})} 
                        <img className="h-4 w-4" src={iconDropDown} />
                    </button>
                    <ul className={`${appearance ? "flex" : "hidden"} p-2 mt-13 absolute z-2 bg-(--neutral-800) rounded-lg w-48 flex flex-col border border-(--neutral-700)`}>
                        <li className=" w-full rounded-md p-2 hover:bg-(--neutral-700)">
                            <button
                                onClick={(event) => {setAppearance(prev => !prev); setDaySelected(event.target.value)}}
                                value="0"
                            >
                                {new Date(hours[0]).toLocaleString("en-US", {weekday: "long"})}
                            </button>
                        </li>
                        <li className="w-full rounded-md p-2 hover:bg-(--neutral-700)">
                            <button
                                onClick={(event) => {setAppearance(prev => !prev); setDaySelected(event.target.value)}}
                                value="24"
                            >
                                {new Date(hours[24]).toLocaleString("en-US", {weekday: "long"})}
                            </button>
                        </li>
                        <li className="w-full rounded-md p-2 hover:bg-(--neutral-700)">
                            <button
                                onClick={(event) => {setAppearance(prev => !prev); setDaySelected(event.target.value)}}
                                value="48"
                            >
                                {new Date(hours[48]).toLocaleString("en-US", {weekday: "long"})}
                            </button>
                        </li>
                        <li className="w-full rounded-md p-2 hover:bg-(--neutral-700)">
                            <button
                                onClick={(event) => {setAppearance(prev => !prev); setDaySelected(event.target.value)}}
                                value="72"
                            >
                                {new Date(hours[72]).toLocaleString("en-US", {weekday: "long"})}
                            </button>
                        </li>
                        <li className="w-full rounded-md p-2 hover:bg-(--neutral-700)">
                            <button
                                onClick={(event) => {setAppearance(prev => !prev); setDaySelected(event.target.value)}}
                                value="96"
                            >
                                {new Date(hours[96]).toLocaleString("en-US", {weekday: "long"})}
                            </button>
                        </li>
                        <li className="w-full rounded-md p-2 hover:bg-(--neutral-700)">
                            <button
                                onClick={(event) => {setAppearance(prev => !prev); setDaySelected(event.target.value)}}
                                value="120"
                            >
                                {new Date(hours[120]).toLocaleString("en-US", {weekday: "long"})}
                            </button>
                        </li>
                        <li className="w-full rounded-md p-2 hover:bg-(--neutral-700)">
                            <button
                                onClick={(event) => {setAppearance(prev => !prev); setDaySelected(event.target.value)}}
                                value="144"
                            >
                                {new Date(hours[144]).toLocaleString("en-US", {weekday: "long"})}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="overflow-y-auto h-165 px-4 scrollbar flex flex-col gap-4 pt-2" tabIndex="-1">
                {hour.map((h, i) => (
                    <div key={i} className="p-2 -mr-2 bg-(--neutral-700) rounded-lg border border-(--neutral-600)">
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