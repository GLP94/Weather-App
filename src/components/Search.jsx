import { useState, useEffect, useRef } from "react"
import SearchIcon from "../assets/icon-search.svg"
import LoadingIcon from "../assets/icon-loading.svg"
import errorIcon from "../assets/icon-error.svg"
import retryIcon from "../assets/icon-retry.svg"


export default function Search({setPlace, setNoResult, setWeather}){

    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [cityName, setCityName] = useState("");
    const [error, setError] = useState(false);
    
    let menuRef = useRef(null);

    useEffect(() => {
        const handleClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)){
                setResult(null);
            }
        }

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);
        setNoResult(false);

        try {
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=5&language=en&format=json`);
            if (!response.ok) throw new Error("Server Error!")
            let data = await response.json();
            setResult(data.results || null);
            if (!data.results){
                setNoResult(true)
                setWeather(null);
            }else{
                setNoResult(false);
            }
        }
        catch(err){
            console.error(err);
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
        <section className="relative">
            {error && 
                <section className="flex flex-col text-center items-center mt-16">
                    <img 
                        className="w-8 h-auto"
                        src={errorIcon} 
                        alt="Error icon"
                        aria-hidden="true"
                        >
                    </img>
                    <h1 className="text-4xl mt-8">Something went wrong</h1>
                    <p className="py-4">We couldn't connect to the server (API error). Please try again in a few moments.</p>
                    <button 
                        onClick={handleError} 
                        className="flex focus:outline-2 bg-(--neutral-800) py-2 px-4 focus:outline-offset-3 focus:outline-white hover:bg-(--neutral-700) rounded-lg"
                    >
                        <img src={retryIcon} alt="Retry icon" className="mr-2"></img> 
                        Retry
                    </button>
                </section>
            }
            {!error &&
            <>
                <h1 className="my-12 text-6xl text-center font-medium">How's the sky looking today?</h1>
                <form 
                    className="flex flex-col my-2 w-full md:flex-row md:justify-center md:items-center gap-4"
                    onSubmit={handleSubmit}
                >
                    <label className="my-2 bg-(--neutral-800) flex rounded-lg focus-within:outline-2 focus-within:outline-offset-3 hover:bg-(--neutral-700) max-w-140 w-full">
                        <img 
                            src={SearchIcon}
                            className="pl-6"
                            alt="Search icon"
                            aria-hidden="true"
                        />
                        <input 
                            id="searchInput"
                            className="p-3 font-medium text-xl focus:border-none focus:outline-none"
                            type="text"
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                            placeholder="Search for a place..."
                        />
                    </label>
                    <button 
                        className="py-3 px-4 bg-(--Blue-500) rounded-lg font-medium text-xl focus:outline-2 focus:outline-offset-3 focus:outline-(--Blue-500) hover:bg-(--Blue-700) "
                        type="submit"
                    >
                        Search
                    </button>
                </form>
            </> 
            }
            {isLoading && <div className="w-full bg-(--neutral-800) p-2 rounded-lg absolute border-(--neutral-700) flex gap-2 z-1 items-center">
                <img src={LoadingIcon} className="spin shrink-0" alt="Loading icon"></img>
                <p>
                    Search in Progress
                </p>
            </div>}
            {Array.isArray(result) && result.length > 0 &&
                <div 
                    className="w-full bg-(--neutral-800) p-2 rounded-lg absolute border-(--neutral-700) z-1"
                    ref={menuRef}
                >
                    <ul>
                        {result.map(p => (
                            <li 
                                key={p.id} 
                                className="p-2 hover:bg-(--neutral-700) border border-(--neutral-800) hover:border hover:border-(--neutral-600) active:border active:bg-(--neutral-700) active:border-(--neutral-600) rounded-lg cursor-pointer"
                                onClick={() => {setPlace(p); setResult(null); setCityName("")}}
                                tabIndex="0"
                            >
                                {p.name}
                            </li>
                        ))}
                    </ul>
                </div>}
        </section>
    )
}