import { useState } from "react"
import SearchIcon from "../assets/icon-search.svg"
import LoadingIcon from "../assets/icon-loading.svg"

export default function Search({setPlace}){

    const [ result, setResult ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ cityName, setCityName ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=5&language=en&format=json`);
            let data = await response.json();
            setResult(data.results);
        }
        catch(err){
            console.log(`Error: ${err}`);
        }
        finally{
            setIsLoading(false);
        }
    }

    return(
        <section className="relative">
            <h1 className="my-12 font-(family-name:--DM-Sans) text-6xl text-center font-medium">How's the sky looking today?</h1>
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
                        className="w-full p-3 font-medium"
                        type="text"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        placeholder="Search for a place..."
                    />
                </div>
                <button 
                    className="p-3 bg-(--Blue-500) rounded-lg font-medium"
                    type="submit"
                >
                    Search
                </button>
            </form>
            {isLoading && <div className="w-full bg-(--neutral-800) p-2 rounded-lg absolute border-(--neutral-700) flex gap-2 z-1 items-center">
                <img src={`${LoadingIcon}`} className="spin shrink-0"></img>
                <p>
                    Search in Progress
                </p>
            </div>}
            {Array.isArray(result) && <div className="w-full bg-(--neutral-800) p-2 rounded-lg absolute border-(--neutral-700) z-1">
                <ul>
                    {result.map(p => (
                        <li 
                            key={p.id} 
                            className="p-2 hover:bg-(--neutral-700) border border-(--neutral-800) hover:border hover:border-(--neutral-600) active:border active:bg-(--neutral-700) active:border-(--neutral-600) rounded-lg cursor-pointer"
                            onClick={() => {setPlace(p); setResult(null); setCityName("")}}
                        >
                            {p.name}
                        </li>
                    ))}
                </ul>
            </div>}
        </section>

    )
}