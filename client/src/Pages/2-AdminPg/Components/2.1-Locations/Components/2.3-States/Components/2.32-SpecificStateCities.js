import { useState } from "react"

import AddCity from "./2.33-AddCity"

export default function SpecificStateCities({
    universalStateImports,
    stateCities,
    allCities,
    setAllCities,
    stateId,
    stateCountryId,
    handleNewLocation,
    handleNewLocationInputs
}){
    const [hoveredCity, setHoveredCity] = useState()
    const [cityId, setCityId] = useState()
    const [cityInfo, setCityInfo] = useState(false)
    const [addCity, setAddCity] = useState(false)

    const setStateId = universalStateImports.setStateId
    const setStateInfo = universalStateImports.setStateInfo
    const stateName = universalStateImports.stateName 
    const stateImg = universalStateImports.stateImg
    const stateOptions = universalStateImports.stateOptions
    const selectedStateOption = universalStateImports.selectedStateOption
    const setSelectedStateOption = universalStateImports.setSelectedStateOption
    const locationInfoContainer = universalStateImports.locationInfoContainer

    console.log(stateCities)

    return(
        addCity ?
            <AddCity
                universalStateImports={universalStateImports}
                stateCities={stateCities}
                addCity={addCity}
                setAddCity={setAddCity}
                allCities={allCities}
                setAllCities={setAllCities}
                stateId={stateId}
                stateCountryId={stateCountryId}
                handleNewLocation={handleNewLocation}
                handleNewLocationInputs={handleNewLocationInputs}
            />
        :
            locationInfoContainer(
                setStateId, setStateInfo,
                stateImg, null,
                stateName, stateOptions,
                selectedStateOption, setSelectedStateOption,
                null, stateCities,
                null, hoveredCity, 
                setHoveredCity, setCityId, 
                setCityInfo, setAddCity, 
                addCity, null
            )
    )
}