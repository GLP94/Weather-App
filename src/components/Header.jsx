import { useState } from "react";
import logo from "../assets/logo.svg";
import iconUnit from "../assets/icon-units.svg";
import iconDropDown from "../assets/icon-dropdown.svg";
import checkmark from "../assets/icon-checkmark.svg";

export default function Header() {
    const [temperature, setTemperature] = useState("celsius");
    const [windSpeed, setWindSpeed] = useState("km/h");
    const [precipitaion, setPrecipitation] = useState("mm");
    const [appearance, setAppearance] = useState(false);

    return (

        <header className="w-full flex justify-between items-center">

            <div>
                <img src={logo}
                    alt="Weather App Logo"
                    className="w-36"
                />
            </div>
            <div className="flex flex-col items-end relative">
                <button className="bg-(--neutral-800) flex px-3 py-2 rounded-lg gap-2"
                    onClick={() => setAppearance(!appearance)}
                >
                    <img src={iconUnit} />
                    Units
                    <img src={iconDropDown} />
                </button>
                <ul className={`${appearance ? "flex" : "hidden"} absolute top-10 bg-(--neutral-800) p-1 mt-2 rounded-lg w-48 flex flex-col gap-2 border border-(--neutral-700)`}>
                    <li className="px-3 py-2">Switch to Imperial</li>
                    <li className="px-3 text-(--neutral-300) text-xs">Temperature</li>
                    <li>
                        <form className="flex flex-col gap-1 px-1">
                            <label className="flex justify-between p-2 has-checked:bg-(--neutral-700) rounded-md">
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
                                    <img src={checkmark} />
                                )}
                            </label>
                            <label className="flex justify-between p-2 has-checked:bg-(--neutral-700) rounded-md">
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
                                    <img src={checkmark} />
                                )}
                            </label>
                        </form>
                    </li>
                    <hr></hr>
                    <li className="px-3 text-(--neutral-300) text-xs">Wind Speed</li>
                    <li>
                        <form className="flex flex-col gap-1 px-1">
                            <label className="flex justify-between p-2 has-checked:bg-(--neutral-700) rounded-md">
                                km/h
                                <input
                                    className="appearance-none sr-only"
                                    type="radio"
                                    name="windspeed"
                                    value="km/h"
                                    checked={windSpeed === "km/h"}
                                    onChange={(e) => setWindSpeed(e.target.value)}
                                >
                                </input>
                                {windSpeed === "km/h" && (
                                    <img src={checkmark} />
                                )}
                            </label>
                            <label className="flex justify-between p-2 has-checked:bg-(--neutral-700) rounded-md">
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
                                    <img src={checkmark} />
                                )}
                            </label>
                        </form>
                    </li>
                    <hr></hr>
                    <li className="px-3 text-(--neutral-300) text-xs">Precipitation</li>
                    <li>
                        <form className="flex flex-col gap-1 px-1">
                            <label className="flex justify-between p-2 has-checked:bg-(--neutral-700) rounded-md">
                                Millimiters (mm)
                                <input
                                    className="appearance-none sr-only"
                                    type="radio"
                                    name="precipitation"
                                    value="mm"
                                    checked={precipitaion === "mm"}
                                    onChange={(e) => setPrecipitation(e.target.value)}
                                >
                                </input>
                                {precipitaion === "mm" && (
                                    <img src={checkmark} />
                                )}
                            </label>
                            <label className="flex justify-between p-2 has-checked:bg-(--neutral-700) rounded-md">
                                Inches (in)
                                <input
                                    className="appearance-none sr-only"
                                    type="radio"
                                    name="windspeed"
                                    value="in"
                                    checked={precipitaion === "in"}
                                    onChange={(e) => setPrecipitation(e.target.value)}
                                >
                                </input>
                                {precipitaion === "in" && (
                                    <img src={checkmark} />
                                )}
                            </label>
                        </form>
                    </li>
                </ul>
            </div>
        </header>
    )
}