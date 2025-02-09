import { useState } from "react";

import AddCityBorough from "./2.44-AddCityBorough";

export default function CityBoroughs({
    universalCityInfo,
    cityBoroughs,
    handleNewLocation,
    handleNewLocationInputs,
    allBoroughs,
    setAllBoroughs,
    cityId
}){
    const [hoveredBorough, setHoveredBorough] = useState()
    const [boroughId, setBoroughId] = useState()
    const [boroughInfo, setBoroughInfo] = useState(false)
    const [addBorough, setAddBorough] = useState(false)

    const setCityId = universalCityInfo.setCityId
    const setCityInfo = universalCityInfo.setCityInfo
    const cityName = universalCityInfo.cityName
    const cityImg = universalCityInfo.cityImg
    const cityOptions = universalCityInfo.cityOptions
    const selectedCityOption = universalCityInfo.selectedCityOption
    const setSelectedCityOption = universalCityInfo.setSelectedCityOption
    const locationInfoContainer = universalCityInfo.locationInfoContainer

    return(
        addBorough?
            <AddCityBorough 
                universalCityInfo={universalCityInfo}
                cityBoroughs={cityBoroughs}
                addBorough={addBorough}
                setAddBorough={setAddBorough}
                allBoroughs={allBoroughs}
                setAllBoroughs={setAllBoroughs}
                cityId={cityId}
                handleNewLocation={handleNewLocation}
                handleNewLocationInputs={handleNewLocationInputs}
            />
        :
            locationInfoContainer(
                setCityId, setCityInfo, 
                cityImg, null,
                cityName, cityOptions,
                selectedCityOption, setSelectedCityOption, 
                null, cityBoroughs, 
                null, hoveredBorough, 
                setHoveredBorough, setBoroughId, 
                setBoroughInfo, setAddBorough,
                addBorough, null
            )
    )
}