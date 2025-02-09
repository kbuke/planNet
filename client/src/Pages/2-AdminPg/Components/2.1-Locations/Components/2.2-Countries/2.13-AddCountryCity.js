import { useEffect, useState } from "react";


export default function AddCountryCity({
    universalCountryImports,
    countryCities,
    addCity,
    setAddCity,
    allCities,
    setAllCities,
    countryId,
    handleNewLocation,
    handleNewLocationInputs,
    countryStates
}){
    const [selectedStateName, setSelectedStateName] = useState("")
    const [selectedStateId, setSelectedStateId] = useState()
    const [cityName, setCityName] = useState("")
    const [cityImg, setCityImg] = useState("")
    const [cityIntro, setCityIntro] = useState("")
    const [countryCapital, setCountryCapital] = useState("")
    const [stateCapital, setStateCapital] = useState("")

    const setCountryId = universalCountryImports.setCountryId
    const setCountryInfo = universalCountryImports.setCountryInfo
    const countryName = universalCountryImports.countryName
    const countryImg = universalCountryImports.countryImg
    const countryOptions = universalCountryImports.countryOptions
    const selectedCountryOption = universalCountryImports.selectedCountryOption
    const setSelectedCountryOption = universalCountryImports.setSelectedCountryOption
    const locationInfoContainer = universalCountryImports.locationInfoContainer

    useEffect(() => {
        const chosenState = countryStates.filter(state => state.name === selectedStateName)
        return(
            setSelectedStateId(chosenState.id)
        )
    }, [selectedStateName])

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
        countryCapital: countryCapital==="Yes"? true : false,
        stateCapital: stateCapital==="Yes"? true : false,
        stateId: countryStates.length === 0 ? null : selectedStateId,
        countryId: countryId
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
                <h1>Add New City to {countryName}</h1>

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
                    countryStates.length !== 0?
                        cityCapitalOptions(
                            `Is ${cityName} the capital of the state?`, stateCapital,
                            setStateCapital
                        )
                        :
                        null
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
            setCountryId, setCountryInfo,
            countryImg, null,
            countryName, countryOptions,
            selectedCountryOption, setSelectedCountryOption,
            null, null,
            null, null,
            null, null,
            null, setAddCity,
            addCity, newCityInput
        )
    )
}