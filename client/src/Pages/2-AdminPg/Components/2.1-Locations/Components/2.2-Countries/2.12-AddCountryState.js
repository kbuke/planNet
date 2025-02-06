import { useState } from "react"

import "./2.12-AddCountryState.css"


export default function AddCountryState({
    universalCountryImports,
    countryStates,
    addState,
    setAddState,
    handleNewLocationInputs,
    allStates,
    setAllStates,
    handleNewLocation
}){
    const [stateName, setStateName] = useState("")
    const [stateImg, setStateImg] = useState("")
    const [stateIntro, setStateIntro] = useState("")

    const locationInfoContainer = universalCountryImports.locationInfoContainer
    const countryImg = universalCountryImports.countryImg
    const countryName = universalCountryImports.countryName
    const passportStamp = universalCountryImports.passportStamp
    const countryFlag = universalCountryImports.countryFlag
    const selectedOption = universalCountryImports.selectedOption
    const setSelectedOption = universalCountryImports.setSelectedOption
    const setCountryInfo = universalCountryImports.setCountryInfo
    const setCountryId = universalCountryImports.setCountryId
    const countryOptions = universalCountryImports.countryOptions
    const countryId = universalCountryImports.countryId

    const jsonData = {
        locationName: stateName,
        locationImg: stateImg,
        locationIntro: stateIntro,
        relationId: countryId
    }

    const newStateInput = () => {
        return(
            <form
                onSubmit={(e) => handleNewLocation(
                    e, jsonData,
                    "/states", setAllStates,
                    allStates, setAddState
                )}
            >
                <h1>Add New State to {countryName}</h1>

                {handleNewLocationInputs(
                    "Enter new state name:",
                    setStateName
                )}

                {handleNewLocationInputs(
                    "Enter new state image:",
                    setStateImg
                )}

                <div
                    id="adminAddLocationsInputContainer"
                >
                    <label>Enter new state intro</label>
                    <textarea 
                        onChange={(e) => setStateIntro(e.target.value)}
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
                        Create New State
                    </button>

                    <button
                        onClick={() => setAddState(false)}
                        className="adminAddLocationsButton"
                        style={{backgroundColor: "red"}}
                    >
                        Cancel
                    </button>
                </div>
        </form>
    )}

    console.log(addState)

    return(
        locationInfoContainer(
            setCountryId, setCountryInfo,
            countryImg, passportStamp,
            countryName, countryOptions,
            selectedOption, setSelectedOption, 
            null, null,
            null, null, 
            null, null, 
            null, setAddState,
            addState, newStateInput
        )
    )
}