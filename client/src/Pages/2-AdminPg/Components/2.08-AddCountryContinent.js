import { useEffect, useState } from "react"

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

    //Find most recent country added
    useEffect(() => {
        if (allCountries.length > 0) {
            const highestId = Math.max(...allCountries.map(country => country.id))
            setNewCountryId(highestId)
        }
    })

    console.log(`The most recent country is ${newCountryId}`)

    const handleContinentNewCountry = (e) => {
        e.preventDefault()

        console.log(`Adding country ${newCountryId} and ${countriesContinent}`)

        const jsonData = {
            newCountryId,
            countriesContinent
        }

        fetch("/continentscountries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData)
        })
            .then((r) => r.json())
            .then((continentNewCountry) => {
                setContinentsCountries([...continentsCountries, continentNewCountry])
                setAddCountryPg(false)
            })
    }

    return(
        <div
            id="popUpBackground"
        >
            <form
                id="addNewCountry"
                onSubmit={(e) => handleContinentNewCountry(e)}
            >
                <select
                    value={countriesContinent}
                    onChange={(e) => setCountriesContinent(e.target.value)}
                    className="newCountrySafety"
                >
                    <option
                        value="" disabled
                    >
                        Please select the continent the country is based
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

                <button
                    type="submit"
                >
                    Create New Country
                </button>
            </form>
        </div>
    )
}