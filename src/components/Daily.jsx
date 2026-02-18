export default function Daily({weather, getWeatherIcon}){

    let daily = weather.daily.time;

    console.log(daily)

    return(
        <section>
            <h2 className="mb-4 font-medium text-xl">Daily Forecast</h2>
            <div className="grid grid-cols-3 gap-3">
                {daily.map((day, i) => (
                    <div key={i} className="p-3 bg-(--neutral-800) rounded-lg border border-(--neutral-700) text-center">
                        <h3>{new Date(day).toLocaleString('en-US', {weekday: "short"})}</h3>
                        <img src={getWeatherIcon(weather.daily.weather_code[i])} alt="Weather icon" className="w-24 h-auto"></img>
                        <div className="flex justify-between items-center">
                            <span>{weather.daily.temperature_2m_max[i].toFixed(0)}°</span>
                            <span className="text-(--neutral-300)">{weather.daily.temperature_2m_min[i].toFixed(0)}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}