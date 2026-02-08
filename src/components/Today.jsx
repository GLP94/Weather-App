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

export default function Today({ place, weather, isLoading, windSpeed, precipitation}) {

    const [bgImage, setBgImage] = useState(todaySmall);

    useEffect(() => {
        const handleResizing = () => {
            setBgImage(window.innerWidth <= 375 ? todaySmall : todayLarge);
        }

        handleResizing();
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
        <section>
            <div className={`${isLoading ? 'bg-(--neutral-700)' : ""} bg-auto bg-center bg-no-repeat flex justify-center text-center flex-col p-4 font-[DM-Sans] rounded-4xl min-h-75`}
                style={{ backgroundImage: isLoading ? "" : `url(${bgImage})`}}
            >
                {isLoading &&
                    <div className="flex flex-col items-center">
                        <div className="flex gap-2 items-end">
                            <div className="bg-white h-3 w-3 rounded-full bounce delay100"></div>
                            <div className="bg-white h-3 w-3 rounded-full bounce delay300"></div>
                            <div className="bg-white h-3 w-3 rounded-full bounce delay600"></div>
                        </div>
                        <span>Loading...</span>
                    </div>
                }
                {!isLoading &&
                    <>
                        <h2 className="text-4xl mt-4">{`${place.name}, ${place.country}`}</h2>
                        <span className="text-xl mt-4 text-(--neutral-200)">{new Date(weather.current.time).toLocaleString('en-US', {weekday: "long", month: "short", day: "numeric", year: "numeric"})}</span>
                        <div className="flex justify-center items-center content-center my-6">
                        <img className="w-28" src={weatherIcon}></img>
                        <span className="text-7xl italic ml-4">
                                {`${weather.current.temperature_2m.toFixed(0)}°`}
                        </span>
                        </div>
                    </>
                }
            </div>
            <div className="grid grid-cols-2 gap-4 my-4">
                <div className="p-3 bg-(--neutral-800) rounded-lg border border-(--neutral-600)">
                    <h3>Feels like</h3>
                    {isLoading && 
                        <span>-</span>
                    }
                    {!isLoading &&
                        <p className="text-3xl mt-4">{`${weather.current.apparent_temperature.toFixed(0)}°`}</p>
                    }
                </div>
                <div className="p-3 bg-(--neutral-800) rounded-lg border border-(--neutral-600)">
                    <h3>Humidity</h3>
                    {isLoading && 
                        <span>-</span>
                    }
                    {!isLoading &&
                        <p className="text-3xl mt-4">{`${weather.current.relative_humidity_2m}%`}</p>
                    }
                </div>
                <div className="p-3 bg-(--neutral-800) rounded-lg border border-(--neutral-600)">
                    <h3>Wind</h3>
                    {isLoading && 
                        <span>-</span>
                    }
                    {!isLoading &&
                        <p className="text-3xl mt-4">{`${weather.current.wind_speed_10m} ${windSpeed}`}</p>
                    }
                </div>
                <div className="p-3 bg-(--neutral-800) rounded-lg border border-(--neutral-600)">
                    <h3>Precipitation</h3>
                    {isLoading && 
                        <span>-</span>
                    }
                    {!isLoading &&
                        <p className="text-3xl mt-4">{`${weather.current.precipitation} ${precipitation}`}</p>
                    }
                </div>
            </div>
        </section>
    )


}