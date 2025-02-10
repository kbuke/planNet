import { useState } from "react"

import AddCountryState from "./2.12-AddCountryState"
import States from "../2.3-States/2.3-States"


export default function SpecificCountryStates({
    universalCountryImports,
    countryStates,
    handleNewLocation,
    handleNewLocationInputs,
    allStates,
    setAllStates,
    setContinentId,
    setContinentInfo
}){
    console.log(countryStates)
    const [hoveredState, setHoveredState] = useState("")
    const [addState, setAddState] = useState(false)
    const [selectedState, setSelectedState] = useState()
    const [stateInfo, setStateInfo] = useState(false)

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
        selectedState ?
            <States 
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                stateInfo={stateInfo}
                setStateInfo={setStateInfo}
                locationInfoContainer={locationInfoContainer}
                handleNewLocation={handleNewLocation}
                handleNewLocationInputs={handleNewLocationInputs}
            />
        :
            locationInfoContainer(
                setCountryId, setCountryInfo,
                countryImg, passportStamp,
                countryName, countryOptions,
                selectedOption, setSelectedOption,
                setCountryInfo, countryStates,
                null, hoveredState,
                setHoveredState, setSelectedState,
                setStateInfo, setAddState,
                addState, null,
                [setCountryId, setCountryInfo, setContinentId, setContinentInfo] 
            )
    )
}