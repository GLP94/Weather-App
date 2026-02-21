export default function Daily({weather, getWeatherIcon}){

    let daily = weather.daily.time;

    return(
        <section>
            <h2 className="my-4 font-medium text-xl">Daily Forecast</h2>
            <div className="flex flex-wrap gap-3">
                {daily.map((day, i) => (
                    <div key={i} className="p-2 bg-(--neutral-800) rounded-lg border border-(--neutral-700) text-center flex flex-col items-center">
                        <h3>{new Date(day).toLocaleString('en-US', {weekday: "short"})}</h3>
                        <img src={getWeatherIcon(weather.daily.weather_code[i])} alt="Weather icon" className="w-16 h-auto m-3"></img>
                        <div className="w-full flex justify-between items-center">
                            <span>{weather.daily.temperature_2m_max[i].toFixed(0)}°</span>
                            <span className="text-(--neutral-300)">{weather.daily.temperature_2m_min[i].toFixed(0)}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}