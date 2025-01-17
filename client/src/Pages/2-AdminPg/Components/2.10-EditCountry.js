
import { useState } from "react"
import "./2.10-EditCountry.css"

export default function EditCountry({
    countryId,
    allCountries,
    setAllCountries,
    setEditCountry,
    countryName,
    setCountryName,
    countryImg,
    setCountryImg,
    countryInfo,
    setCountryInfo,
    countryFlag,
    setCountryFlag,
    countryPassportStamp,
    setCountryPassportStamp,
    countrySafety,
    setCountrySafety
}){
    const [editCountriesContinent, setEditCountriesContinent] = useState(false)

    const handleEditCountry = (e) => {
        e.preventDefault()
        fetch(`/countries/${countryId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: countryName,
                image: countryImg,
                safety_level: countrySafety,
                intro: countryInfo,
                flag: countryFlag,
                passport_stamp: countryPassportStamp
            })
        })
        .then((r) => {
            if(r.ok){
                return r.json()
            } else {
                console.error("Failed to update country")
                return null
            }
        })
        .then((newCountryInfo) => {
            if(newCountryInfo){
                setAllCountries(allCountries.map(oldCountries => 
                    oldCountries.id === newCountryInfo.id ? newCountryInfo : oldCountries
                ))
            }
        })
    }

    const countryInputs = (labelText, setVariable, variable) => {
        return(
            <div
                id="editCountryInputContainer"
            >
                <label
                    className="editCountryInputTitle"
                >
                    {labelText}
                </label>

                <input 
                    onChange={(e) => setVariable(e.target.value)}
                    value={variable}
                    className="adminEditCountryInput"
                />
            </div>
        )
    }

    const safetyLevels = ["Safe", "Use Caution", "Not Safe"]

    return(
        <div>
            <h2>Edit {countryName}</h2>

            {countryInputs("Edit Countries Name", setCountryName, countryName)}
            {countryInputs("Edit Countries Flag", setCountryFlag, countryFlag)}
            {countryInputs("Edit Countries Image", setCountryImg, countryImg)}
            {countryInputs("Edit Countries Passport Stamp", setCountryPassportStamp, countryPassportStamp)}

            <div
                id="editCountryInputContainer"
            >
                <label
                    className="editCountryInputTitle"
                >
                    Please Select Country's Safety Level
                </label>

                <select
                    value={countrySafety}
                    onChange={(e) => setCountrySafety(e.target.value)}
                    style={{marginRight: "5px"}}
                >
                    <option
                        value="" disabled
                    >
                        Please Select
                    </option>

                    {safetyLevels.map((level, index) => (
                        <option
                            key={index}
                            value={level}
                        >
                            {level}
                        </option>
                    ))}
                </select>
            </div>

            <div
                id="editCountryInputContainer"
            >
                <label
                    className="editCountryInputTitle"
                >
                    Edit Country's Info
                </label>

                <textarea 
                    onChange={(e) => setCountryInfo(e.target.value)}
                    value={countryInfo}
                    className="editCountryInfoText"
                />
            </div>

            <div
                id="adminEditLocationButtonContainer"
            >
                <button
                    className="adminEditLocationButton"
                    onClick={(e) => handleEditCountry(e)}
                >
                    Make Changes
                </button>

                <button
                    onClick={() => setEditCountry(false)}
                    className="adminEditLocationButton"
                    style={{backgroundColor: "red"}}
                >
                    Cancel Edit
                </button>
            </div>
        </div>
    )
}