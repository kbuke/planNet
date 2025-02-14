import { useState } from "react"

export default function EditCityInfo({
    locationInfoContainer,
    universalCityInfo,
    setEditCityInfo,
    editCityInfo,
    handleEditLocation,
    handleNewLocationInputs,
    allCities,
    setAllCities,
    cityIntro,
    countryCapital,
    stateCapital,
    cityState
}){
    console.log(cityState)
    const cityName = universalCityInfo.cityName
    const cityImg = universalCityInfo.cityImg

    const setCityId = universalCityInfo.setCityId
    const cityId = universalCityInfo.cityId

    const cityOptions = universalCityInfo.cityOptions
    const selectedCityOption = universalCityInfo.selectedCityOption
    const setSelectedCityOption = universalCityInfo.setSelectedCityOption

    const setCityInfo = universalCityInfo.setCityInfo

    const [editCityName, setEditCityName] = useState(cityName)
    const [editCityImg, setEditCityImg] = useState(cityImg)
    const [editCityIntro, setEditCityIntro] = useState(cityIntro)
    const [editCountryCapital, setEditCountryCapital] = useState(countryCapital)
    const [editStateCapital, setEditStateCapital] = useState(stateCapital)

    const editCityInfoObj = {
        name: editCityName,
        image: editCityImg,
        intro: editCityIntro,
        state_capital: editStateCapital,
        country_capital: editCountryCapital
    }

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

    const editCityForm = () => {
        return(
            <form
                onSubmit={(e) => handleEditLocation(
                    e, editCityInfoObj,
                    `/cities/${cityId}`, setAllCities,
                    allCities, setEditCityInfo
                )}
            >
                <h1>Edit {cityName} Info</h1>

                {
                    handleNewLocationInputs(
                        "Edit City Name",
                        setEditCityName,
                        editCityName
                    )
                }

                {
                    handleNewLocationInputs(
                        "Edit City Image",
                        setEditCityImg,
                        editCityImg
                    )
                }

                <div
                    id="adminAddLocationsInputContainer"
                >
                    <label>Enter new city intro</label>

                    <textarea 
                        onChange={(e) => setEditCityIntro(e.target.value)}
                        id="addLocationIntroInput"
                        value={editCityIntro}
                    />
                </div>

                {
                    cityCapitalOptions(
                        `Is ${cityName} the capital of the country?`,
                        editCountryCapital,
                        setEditCountryCapital
                    )
                }

                {
                    cityState?
                        cityCapitalOptions(
                            `Is ${cityName} the state capital?`,
                            editStateCapital,
                            setEditStateCapital
                        )
                    :
                        null
                }

                <div
                    id="adminAddLocationsButtonContainer"
                >
                    <button
                        className="adminAddLocationsButton"
                        type="submit"
                    >
                        Edit City
                    </button>

                    <button
                        onClick={() => setEditCityInfo(false)}
                        className="adminAddLocationsButton"
                        style={{backgroundColor: "red"}}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        )
    }

    console.log(setEditCityInfo)

    return(
        locationInfoContainer(
            setCityId, setCityInfo,
            cityImg, null,
            cityName, cityOptions,
            selectedCityOption, setSelectedCityOption,
            null, null,
            null, null,
            null, null,
            null, setEditCityInfo,
            editCityInfo, editCityForm
        )
    )
}