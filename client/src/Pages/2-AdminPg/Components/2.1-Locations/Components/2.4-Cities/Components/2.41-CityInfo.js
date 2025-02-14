import { useState } from "react"

import EditCityInfo from "./2.45-EditCityInfo"

export default function CityInfo({
    universalCityInfo,
    handleEditLocation,
    handleNewLocationInputs,
    allCities,
    setAllCities,
    cityIntro,
    countryCapital,
    stateCapital,
    cityState
}){

    const [editCityInfo, setEditCityInfo] = useState(false)
    
    const setCityId = universalCityInfo.setCityId
    const setCityInfo = universalCityInfo.setCityInfo
    const cityName = universalCityInfo.cityName
    const cityImg = universalCityInfo.cityImg
    const cityOptions = universalCityInfo.cityOptions
    const selectedCityOption = universalCityInfo.selectedCityOption
    const setSelectedCityOption = universalCityInfo.setSelectedCityOption
    const locationInfoContainer = universalCityInfo.locationInfoContainer

    console.log(setEditCityInfo)

    return(
        editCityInfo ?
            <EditCityInfo 
                locationInfoContainer={locationInfoContainer}
                universalCityInfo={universalCityInfo}
                setEditCityInfo={setEditCityInfo}
                editCityInfo={editCityInfo}
                handleEditLocation={handleEditLocation}
                handleNewLocationInputs={handleNewLocationInputs}
                allCities={allCities}
                setAllCities={setAllCities}
                cityIntro={cityIntro}
                countryCapital={countryCapital}
                stateCapital={stateCapital}
                cityState={cityState}
            />
            :
            locationInfoContainer(
                setCityId, setCityInfo,
                cityImg, null,
                cityName, cityOptions,
                selectedCityOption, setSelectedCityOption,
                cityIntro, null, 
                null, null, 
                null, null, 
                null, null, 
                null, null,
                null, setEditCityInfo
            )
    )
}