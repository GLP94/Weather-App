import SearchIcon from "../assets/icon-search.svg"

export default function Search({setPlace, place}){

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cityName = e.target.searchInput.value;

        try {
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=5&language=en&format=json`);
            const data = await response.json();
            setPlace(data.results);
            console.log(data.results)
        }
        catch(err){
            console.log(`Error: ${err}`)
        }
    }

    return(
        <section className="relative">
            <h1 className="my-12 font-(family-name:--DM-Sans) text-6xl text-center font-[500]">How's the sky looking today?</h1>
            <form 
                className="flex flex-col my-4"
                onSubmit={handleSubmit}
            >
                <div className="my-2 bg-(--neutral-800) flex rounded-lg">
                    <img 
                        src={SearchIcon}
                        className="pl-6"
                    />
                    <input 
                        id="searchInput"
                        className="w-full p-3 font-[500]"
                        type="text"
                        placeholder="Search for a place..."
                        
                    >
                    </input>
                </div>
                
                <button 
                    className="p-3 bg-(--Blue-500) rounded-lg font-[500]"
                    type="submit"
                >
                    Search
                </button>
            </form>
            {place && <div className="w-full bg-(--neutral-800) p-4 rounded-lg absolute">
                <ul>
                    {place.map(p => (
                        <li 
                            key={p.id} 
                            className="p-2 hover:bg-(--neutral-700) hover:border hover:border-(--neutral-600) rounded-lg"
                            onClick={() => setPlace(p)}
                        >
                            {p.name}
                        </li>
                    ))}
                </ul>
            </div>}
        </section>

    )
}