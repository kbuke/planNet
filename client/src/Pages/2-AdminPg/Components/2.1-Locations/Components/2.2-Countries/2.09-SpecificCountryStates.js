import { useState } from "react"

import AddCountryState from "./2.12-AddCountryState"


export default function SpecificCountryStates({
    universalCountryImports,
    countryStates,
    handleNewLocation,
    handleNewLocationInputs,
    allStates,
    setAllStates
}){
    console.log(countryStates)
    const [hoveredState, setHoveredState] = useState("")
    const [addState, setAddState] = useState(false)

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

    return(
        addState?
            <AddCountryState 
                universalCountryImports={universalCountryImports}
                countryStates={countryStates}
                addState={addState}
                setAddState={setAddState}
                handleNewLocationInputs={handleNewLocationInputs}
                allStates={allStates}
                setAllStates={setAllStates}
                handleNewLocation={handleNewLocation}
            />
        :
            locationInfoContainer(
                setCountryId, setCountryInfo,
                countryImg, passportStamp,
                countryName, countryOptions,
                selectedOption, setSelectedOption,
                setCountryInfo, countryStates,
                null, hoveredState,
                setHoveredState, null,
                null, setAddState,
                addState 
            )
    )
}