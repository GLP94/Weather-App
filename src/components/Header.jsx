import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.svg";
import iconUnit from "../assets/icon-units.svg";
import iconDropDown from "../assets/icon-dropdown.svg";
import checkmark from "../assets/icon-checkmark.svg";

export default function Header({temperature, windSpeed, precipitation, setTemperature, setWindSpeed, setPrecipitation}) {
    
    const [appearance, setAppearance] = useState(false);

    let isMetric = temperature === "celsius"
                    && windSpeed === "kmh"
                    && precipitation === "mm";

    let unitName = isMetric ? "Switch to Imperial" : "Switch to Metric";

    let menuRef = useRef(null);

    
    
    useEffect(() => {
        const handleClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)){
                setAppearance(false);
            }
        }
    
        document.addEventListener("click", handleClick);

        return () => document.removeEventListener("click", handleClick);
        
    }, []);
    

    const handleUnit = () => {
        if (isMetric){
            setTemperature("fahrenheit");
            setWindSpeed("mph");
            setPrecipitation("inch");
        }
        else{
            setTemperature("celsius");
            setWindSpeed("kmh");
            setPrecipitation("mm");
        }
    }

    return (

        <header className="w-full flex justify-between items-center">
            <div>
                <img src={logo}
                    alt="Weather App Logo"
                    className="w-36"
                />
            </div>
            <div className="flex flex-col items-end relative"
                ref={menuRef}
            >
                <button className="bg-(--neutral-800) flex px-3 py-2 rounded-lg gap-2 focus:outline-2 focus:outline-offset-3 focus:outline-white hover:bg-(--neutral-700)"
                    onClick={() => {setAppearance(prev => !prev)}}
                    aria-haspopup="true"
                >
                    <img src={iconUnit} alt="Units Option" aria-hidden="true"/>
                    Units
                    <img src={iconDropDown} alt="Dropdown icon" aria-hidden="true"/>
                </button>
                <ul 
                    className={`${appearance ? "flex" : "hidden"} z-2 absolute top-10 bg-(--neutral-800) p-1 mt-2 rounded-lg w-48 flex flex-col gap-2 border border-(--neutral-600)`} 
                    aria-expanded={appearance}
                >
                    <li className="p-1">
                        <button
                            className="focus:outline-1 focus:outline-offset-3 focus:outline-white w-full text-left rounded-md p-2 hover:bg-(--neutral-700)"
                            onClick={handleUnit}
                        >
                            {unitName}
                        </button>
                    </li>
                    <li className="px-3 text-(--neutral-300) text-xs">Temperature</li>
                    <li>
                        <form className="flex flex-col gap-1 px-1">
                            <label className="flex justify-between p-2 has-checked:bg-(--neutral-700) rounded-md hover:bg-(--neutral-700)">
                                Celsius (°C)
                                <input
                                    className="appearance-none sr-only has-checked:bg-(--neutral-700)"
                                    type="radio"
                                    name="temperature"
                                    value="celsius"
                                    checked={temperature === "celsius"}
                                    onChange={(e) => setTemperature(e.target.value)}
                                >
                                </input>
                                {temperature === "celsius" && (
                                    <img src={checkmark} alt="checked"/>
                                )}
                            </label>
                            <label className="flex justify-between p-2 has-checked:bg-(--neutral-700) rounded-md hover:bg-(--neutral-700)">
                                Fahrenheit (°F)
                                <input
                                    className="appearance-none sr-only"
                                    type="radio"
                                    name="temperature"
                                    value="fahrenheit"
                                    checked={temperature === "fahrenheit"}
                                    onChange={(e) => setTemperature(e.target.value)}
                                >
                                </input>
                                {temperature === "fahrenheit" && (
                                    <img src={checkmark} alt="checked"/>
                                )}
                            </label>
                        </form>
                    </li>
                    <hr className="border-(--neutral-600)"></hr>
                    <li className="px-3 text-(--neutral-300) text-xs">Wind Speed</li>
                    <li>
                        <form className="flex flex-col gap-1 px-1">
                            <label className="flex justify-between p-2 has-checked:bg-(--neutral-700) rounded-md hover:bg-(--neutral-700)">
                                km/h
                                <input
                                    className="appearance-none sr-only"
                                    type="radio"
                                    name="windspeed"
                                    value="kmh"
                                    checked={windSpeed === "kmh"}
                                    onChange={(e) => setWindSpeed(e.target.value)}
                                >
                                </input>
                                {windSpeed === "kmh" && (
                                    <img src={checkmark} alt="checked"/>
                                )}
                            </label>
                            <label className="flex justify-between p-2 has-checked:bg-(--neutral-700) rounded-md hover:bg-(--neutral-700)">
                                mph
                                <input
                                    className="appearance-none sr-only"
                                    type="radio"
                                    name="windspeed"
                                    value="mph"
                                    checked={windSpeed === "mph"}
                                    onChange={(e) => setWindSpeed(e.target.value)}
                                >
                                </input>
                                {windSpeed === "mph" && (
                                    <img src={checkmark} alt="checked"/>
                                )}
                            </label>
                        </form>
                    </li>
                    <hr className="border-(--neutral-600)"></hr>
                    <li className="px-3 text-(--neutral-300) text-xs">Precipitation</li>
                    <li>
                        <form className="flex flex-col gap-1 px-1">
                            <label className="flex justify-between p-2 has-checked:bg-(--neutral-700) rounded-md hover:bg-(--neutral-700)">
                                Millimiters (mm)
                                <input
                                    className="appearance-none sr-only"
                                    type="radio"
                                    name="precipitation"
                                    value="mm"
                                    checked={precipitation === "mm"}
                                    onChange={(e) => setPrecipitation(e.target.value)}
                                >
                                </input>
                                {precipitation === "mm" && (
                                    <img src={checkmark} alt="checked"/>
                                )}
                            </label>
                            <label className="flex justify-between p-2 has-checked:bg-(--neutral-700) rounded-md hover:bg-(--neutral-700)">
                                Inches (in)
                                <input
                                    className="appearance-none sr-only"
                                    type="radio"
                                    name="precipitation"
                                    value="inch"
                                    checked={precipitation === "inch"}
                                    onChange={(e) => setPrecipitation(e.target.value)}
                                >
                                </input>
                                {precipitation === "inch" && (
                                    <img src={checkmark} alt="checked"/>
                                )}
                            </label>
                        </form>
                    </li>
                </ul>
            </div>
        </header>
    )
}