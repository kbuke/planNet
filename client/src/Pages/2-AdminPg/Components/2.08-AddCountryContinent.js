import { useEffect, useState } from "react"

export default function AddCountryContinent({
    appData
}){
    const continentsCountries = appData.continentsCountries
    const setContinentsCountries = appData.setContinentsCountries
    const allContinents = appData.allContinents
    const allCountries = appData.allCountries

    console.log(allCountries)

    const [countriesContinent, setCountriesContinent] = useState()
    const [latestCountryId, setLatestCountryId] = useState()

    //Find most recent country added
    useEffect(() => {
        if (allCountries.length > 0) {
            const highestId = Math.max(...allCountries.map(country => country.id))
            setLatestCountryId(highestId)
        }
    })

    console.log(`The most recent country is ${latestCountryId}`)

    return(
        <div
            id="popUpBackground"
        >
            <div
                id="addNewCountry"
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

                <button>Create New Country</button>
            </div>
        </div>
    )
}