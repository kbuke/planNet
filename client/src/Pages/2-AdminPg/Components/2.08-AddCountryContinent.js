import { useEffect, useState } from "react"

import "./2.08-AddCountryContinent.css"

export default function AddCountryContinent({
    appData,
    setAddCountryPg
}){
    const continentsCountries = appData.continentsCountries
    const setContinentsCountries = appData.setContinentsCountries
    const allContinents = appData.allContinents
    const allCountries = appData.allCountries

    console.log(allCountries)

    const [countriesContinent, setCountriesContinent] = useState()
    const [newCountryId, setNewCountryId] = useState()
    const [twoContinents, setTwoContinents] = useState(false)
    const [secondContinentId, setSecondContinentId] = useState()

    //Find most recent country added
    useEffect(() => {
        if (allCountries.length > 0) {
            const highestId = Math.max(...allCountries.map(country => country.id))
            setNewCountryId(highestId)
        }
    })

    const handleContinentNewCountry = (continentId) => {
        console.log(`Adding country ${newCountryId} and ${continentId}`);
    
        const jsonData = {
            newCountryId,
            countriesContinent: continentId
        };
    
        fetch("/continentscountries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData)
        })
            .then((r) => r.json())
            .then((continentNewCountry) => {
                setContinentsCountries([...continentsCountries, continentNewCountry]);
            });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (countriesContinent) {
            handleContinentNewCountry(countriesContinent); // Add for the first continent
        }
    
        if (twoContinents && secondContinentId) {
            handleContinentNewCountry(secondContinentId); // Add for the second continent
        }
    
        // Close the form after handling the request(s)
        setAddCountryPg(false);
    };
    

    const selectOptions = (variable, setVariable) => {
        return(
            <select
                value={variable}
                onChange={(e) => setVariable(e.target.value)}
                className="newCountrySafety"
                style={{marginTop: "60px"}}
            >
                <option 
                    value="" disabled
                >
                    Please select the Continent 
                </option>

                {allContinents.map((option, index) => (
                    <option
                        key={index}
                        value={option.id}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
        )
    }

    return(
        <div
            id="popUpBackground"
        >
            <form
                id="addNewCountry"
                onSubmit={(e) => handleSubmit(e)}
            >
                {selectOptions(countriesContinent, setCountriesContinent)}

                {twoContinents ?
                    selectOptions(secondContinentId, setSecondContinentId)
                    :
                    <div
                        id="secondContinentQuery"
                    >
                        <label>Does this country belong in two continents?</label>
                        <button
                            id="secondContinentButton"onClick={() => setTwoContinents(true)}
                        >
                            Link 2nd continent
                        </button>
                    </div>
                }

                <div>
                    <button
                        type="submit"
                        className="linkContinentButton"
                    >
                        Create New Country
                    </button>

                    {twoContinents ?
                        <button
                            onClick={() => setTwoContinents(false)}
                            className="linkContinentButton"
                            style={{backgroundColor: "red"}}
                        >
                            Cancel Second Continent
                        </button>
                        :
                        null
                    }
                </div>
            </form>
        </div>
    )
}