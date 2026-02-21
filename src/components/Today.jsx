export default function Today({ place, weather, isLoading, windSpeed, precipitation, getWeatherIcon}) {

    return (
        <section>
            <div 
                className={`${isLoading ? 'bg-(--neutral-700)' : "bg"} flex justify-center text-center flex-col my-4 font-[DM-Sans] rounded-4xl min-h-65`}
            >
                {(isLoading && weather === null) &&
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
                        <img className="w-28" src={getWeatherIcon(weather.current.weather_code)} alt="Weather icon"></img>
                        <span className="text-7xl italic ml-4">
                                {`${weather.current.temperature_2m.toFixed(0)}°`}
                        </span>
                        </div>
                    </>
                }
            </div>
            <div className="grid grid-cols-2 gap-4 my-4 md:flex md:justify-between">
                <div className="p-3 bg-(--neutral-800) rounded-lg border border-(--neutral-700) w-full">
                    <h3>Feels like</h3>
                    {isLoading && 
                        <span>-</span>
                    }
                    {!isLoading &&
                        <p className="text-2xl mt-4">{`${weather.current.apparent_temperature.toFixed(0)}°`}</p>
                    }
                </div>
                <div className="p-3 bg-(--neutral-800) rounded-lg border border-(--neutral-700) w-full">
                    <h3>Humidity</h3>
                    {isLoading && 
                        <span>-</span>
                    }
                    {!isLoading &&
                        <p className="text-2xl mt-4">{`${weather.current.relative_humidity_2m}%`}</p>
                    }
                </div>
                <div className="p-3 bg-(--neutral-800) rounded-lg border border-(--neutral-700) w-full">
                    <h3>Wind</h3>
                    {isLoading && 
                        <span>-</span>
                    }
                    {!isLoading &&
                        <p className="text-2xl mt-4">{`${weather.current.wind_speed_10m} ${windSpeed}`}</p>
                    }
                </div>
                <div className="p-3 bg-(--neutral-800) rounded-lg border border-(--neutral-700) w-full">
                    <h3>Precipitation</h3>
                    {isLoading && 
                        <span>-</span>
                    }
                    {!isLoading &&
                        <p className="text-2xl mt-4">{`${weather.current.precipitation} ${precipitation === "inch" ? "in" : "mm"}`}</p>
                    }
                </div>
            </div>
        </section>
    )


}