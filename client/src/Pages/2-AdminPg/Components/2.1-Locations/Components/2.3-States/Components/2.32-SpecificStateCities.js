import { useState } from "react"

import AddCity from "./2.33-AddCity"
import Cities from "../../2.4-Cities/2.4-Cities"

export default function SpecificStateCities({
    universalStateImports,
    stateCities,
    allCities,
    setAllCities,
    stateId,
    stateCountryId,
    handleNewLocation,
    handleNewLocationInputs,
    handleEditLocation
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
        cityInfo ?
            <Cities 
                cityInfo={cityInfo}
                setCityInfo={setCityInfo}
                cityId={cityId}
                setCityId={setCityId}
                locationInfoContainer={locationInfoContainer}
                handleNewLocation={handleNewLocation}
                handleNewLocationInputs={handleNewLocationInputs}
                handleEditLocation={handleEditLocation}
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