import { useState } from "react"
import SearchIcon from "../assets/icon-search.svg"
import LoadingIcon from "../assets/icon-loading.svg"
import errorIcon from "../assets/icon-error.svg"
import retryIcon from "../assets/icon-retry.svg"


export default function Search({setPlace}){

    const [ result, setResult ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ cityName, setCityName ] = useState("");
    const [ error, setError ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=5&language=en&format=json`);
            if (!response.ok) throw new Error("Server Error!")
            let data = await response.json();
            setResult(data.results);
        }
        catch(err){
            console.log(`Error: ${err}`);
            if (err.name === "TypeError") setError(true);
            else if (err.message === "Server Error!") setError(true);
        }
        finally{
            setIsLoading(false);
        }
    }

    const handleError = () => {
        setError(false)
    }

    return(
        <section className="relative font-[DM-Sans]">
            {error && 
                <section className="flex flex-col text-center">
                    <img src={errorIcon} alt="Error icon"></img>
                    <h1>Something went wrong</h1>
                    <p>We couldn't connect to the server (API error). Please try again in a few moments.</p>
                    <button onClick={handleError}><img src={retryIcon} alt="Retry icon"></img> Retry</button>
                </section>
            }
            {!error &&
            <>
                <h1 className="my-12 text-6xl text-center font-medium">How's the sky looking today?</h1>
                <form 
                    className="flex flex-col my-4"
                    onSubmit={handleSubmit}
                >
                    <div className="my-2 bg-(--neutral-800) flex rounded-lg">
                        <img 
                            src={SearchIcon}
                            className="pl-6"
                            alt="Search icon"
                        />
                        <input 
                            id="searchInput"
                            className="w-full p-3 font-medium text-xl"
                            type="text"
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                            placeholder="Search for a place..."
                        />
                    </div>
                    <button 
                        className="p-3 bg-(--Blue-500) rounded-lg font-medium text-xl"
                        type="submit"
                    >
                        Search
                    </button>
                </form>
            </> 
            }
            {isLoading && <div className="w-full bg-(--neutral-800) p-2 rounded-lg absolute border-(--neutral-700) flex gap-2 z-1 items-center">
                <img src={`${LoadingIcon}`} className="spin shrink-0" alt="Loading icon"></img>
                <p>
                    Search in Progress
                </p>
            </div>}
            {Array.isArray(result) && result.length === 0 &&
                <div>
                    <h1>No search result found!</h1>
                </div>
            }
            {Array.isArray(result) && result.length > 0 &&
            <div className="w-full bg-(--neutral-800) p-2 rounded-lg absolute border-(--neutral-700) z-1">
                <ul>
                    {result.map(p => (
                        <li 
                            key={p.id} 
                            className="p-2 hover:bg-(--neutral-700) border border-(--neutral-800) hover:border hover:border-(--neutral-600) active:border active:bg-(--neutral-700) active:border-(--neutral-600) rounded-lg cursor-pointer"
                            onClick={() => {setPlace(p); setResult(null); setCityName(""); console.log(p)}}
                        >
                            {p.name}
                        </li>
                    ))}
                </ul>
            </div>}
        </section>
    )
}