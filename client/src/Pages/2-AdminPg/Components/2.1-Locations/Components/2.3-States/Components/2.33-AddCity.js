import { useState } from "react";


export default function AddCity({
    universalStateImports,
    stateCities,
    addCity,
    setAddCity,
    allCities,
    setAllCities,
    stateId,
    stateCountryId,
    handleNewLocation,
    handleNewLocationInputs
}){

    const [cityName, setCityName] = useState("")
    const [cityImg, setCityImg] = useState("")
    const [cityIntro, setCityIntro] = useState("")
    const [countryCapital, setCountryCapital] = useState("")
    const [stateCapital, setStateCapital] = useState("")

    const setStateId = universalStateImports.setStateId
    const setStateInfo = universalStateImports.setStateInfo
    const stateName = universalStateImports.stateName 
    const stateImg = universalStateImports.stateImg
    const stateOptions = universalStateImports.stateOptions
    const selectedStateOption = universalStateImports.selectedStateOption
    const setSelectedStateOption = universalStateImports.setSelectedStateOption
    const locationInfoContainer = universalStateImports.locationInfoContainer

    //Set up dropbox for state and country capital options
    const cityCapitalOptions = (
        labelHeading, variable, setVariable
    ) => {
        const options = ["Yes", "No"]

        return(
            <div
                id="adminAddLocationsInputContainer"
            >
                <label>
                    {labelHeading}
                </label>

                <select
                    value={variable}
                    onChange={(e) => setVariable(e.target.value)}
                    id="addLocationIntroSelect"
                    style={{marginLeft: "10px", marginRight: "10px"}}
                >
                    <option
                        value="" disabled
                    >
                        {labelHeading}
                    </option>

                    {options.map((option, index) => (
                        <option
                            key={index}
                        >
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        )
    }

    const jsonData = {
        cityName: cityName,
        cityImg: cityImg,
        cityIntro: cityIntro,
        countryCapital: countryCapital==="Yes" ? true : false,
        stateCapital: stateCapital==="Yes" ? true : false,
        stateId: stateId,
        countryId: stateCountryId
    }

    const newCityInput = () => {
        return(
            <form
                onSubmit={(e) => handleNewLocation(
                    e, jsonData,
                    "/cities", setAllCities,
                    allCities, setAddCity
                )}
            >
                <h1>Add New City to {stateName}</h1>

                {
                    handleNewLocationInputs(
                        "Enter new city name",
                        setCityName
                    )
                }

                {
                    handleNewLocationInputs(
                        "Enter new city image",
                        setCityImg
                    )
                }

                {
                    cityCapitalOptions(
                        `Is ${cityName} the capital of the country?`, countryCapital, 
                        setCountryCapital
                    )
                }

                {
                    cityCapitalOptions(
                        `Is ${cityName} the capital of the state?`, stateCapital,
                        setStateCapital
                    )
                }

                <div
                    id="adminAddLocationsInputContainer"
                >
                    <label>Enter new city intro</label>

                    <textarea 
                        onChange={(e) => setCityIntro(e.target.value)}
                        id="addLocationIntroInput"
                    />
                </div>

                <div
                    id="adminAddLocationsButtonContainer"
                >
                    <button
                        className="adminAddLocationsButton"
                        type="submit"
                    >
                        Create New City
                    </button>

                    <button
                        onClick={() => setAddCity(false)}
                        className="adminAddLocationsButton"
                        style={{backgroundColor: "red"}}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        )
    }

    return(
        locationInfoContainer(
            setStateId, setStateInfo,
            stateImg, null,
            stateName, stateOptions,
            selectedStateOption, setSelectedStateOption,
            null, null,
            null, null,
            null, null,
            null, setAddCity,
            addCity, newCityInput
        )
    )
}