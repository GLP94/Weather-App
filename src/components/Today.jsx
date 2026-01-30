import { useState, useEffect } from "react"

import todayLarge from "../assets/bg-today-large.svg"
import todaySmall from "../assets/bg-today-small.svg"
import sunny from "../assets/icon-sunny.webp"
import storm from "../assets/icon-storm.webp"
import snow from "../assets/icon-snow.webp"
import rain from "../assets/icon-rain.webp"
import partlyCloudy from "../assets/icon-partly-cloudy.webp"
import overcast from "../assets/icon-overcast.webp"
import fog from "../assets/icon-fog.webp"

export default function Today({ place, weather }) {

    const [bgImage, setBgImage] = useState(todaySmall);

    useEffect(() => {
        const handleResizing = () => {
            setBgImage(window.innerWidth <= 375 ? todaySmall : todayLarge);
        }

        handleResizing();
        window.addEventListener("resize", handleResizing)
        return () => window.removeEventListener("resize", handleResizing)
    }, [])

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
    const iconName = Object.keys(values).find((key) => values[key].includes(weather.current.weather_code));
    const weatherIcon = icons[iconName];

    return (

        <div className="bg-cover bg-center bg-no-repeat w-full flex justify-center text-center flex-col p-4 font-[DM-Sans] rounded-4xl"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <h1 className="text-4xl mt-4">{`${place.name}, ${place.country}`}</h1>
            <span className="text-xl mt-4 text-(--neutral-200)">{new Date(weather.current.time).toLocaleString('en-US', {weekday: "long", month: "short", day: "numeric", year: "numeric"})}</span>
            <div className="flex justify-center items-center content-center my-6">
                <img className="w-32" src={weatherIcon}></img>
                <span className="text-8xl italic ml-4">
                    {`${weather.current.temperature_2m.toFixed(0)}°`}
                </span>
            </div>
        </div>
    )


}