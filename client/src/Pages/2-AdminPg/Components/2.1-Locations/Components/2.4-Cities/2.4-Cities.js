import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import CityInfo from "./Components/2.41-CityInfo";
import CityBoroughs from "./Components/2.42-CityBoroughs";
import CityNeighbourhoods from "./Components/2.43-CityNeighbourhoods";

export default function Cities({
    cityInfo,
    setCityInfo,
    cityId,
    setCityId,
    locationInfoContainer,
    handleNewLocation,
    handleNewLocationInputs
}){
    const appData = useOutletContext()

    const allCities = appData.allCities
    const setAllCities = appData.setAllCities

    const allBoroughs = appData.allBoroughs
    const setAllBoroughs = appData.setAllBoroughs

    const allNeighbourhoods = appData.allNeighbourhoods
    const setAllNeighbourhoods = appData.setAllNeighbourhoods 

    const [specificCity, setSpecificCity] = useState()
    const [selectedCityOption, setSelectedCityOption] = useState("Info")

    console.log(`I have selected city ${cityId}`)

    //Fetch specific city
    useEffect(() => {
        fetch(`/cities/${cityId}`)
        .then(r => {
            if(r.ok){
                return r.json()
                .then(city => {
                    setSpecificCity(city)
                })
            }
        })
    }, [cityId, allBoroughs])

    const cityName = specificCity?.name 
    const cityImg = specificCity?.image
    const cityIntro = specificCity?.intro 
    const cityBoroughs = specificCity?.boroughs

    const cityOptions = ["Info", "Boroughs", "Neighbourhoods"]

    console.log(specificCity)

    const universalCityInfo = {
        cityName: cityName,
        cityImg: cityImg,
        cityOptions: cityOptions,
        locationInfoContainer: locationInfoContainer,
        selectedCityOption: selectedCityOption,
        setSelectedCityOption: setSelectedCityOption,
        setCityId: setCityId,
        setCityInfo: setCityInfo
    }

    return(
        selectedCityOption==="Info"?
            <CityInfo 
                cityIntro={cityIntro}
                universalCityInfo={universalCityInfo}
            />
        :
        selectedCityOption==="Boroughs"?
            <CityBoroughs 
                universalCityInfo={universalCityInfo}
                cityBoroughs={cityBoroughs}
                allBoroughs={allBoroughs}
                setAllBoroughs={setAllBoroughs}
                cityId={cityId}
                handleNewLocation={handleNewLocation}
                handleNewLocationInputs={handleNewLocationInputs}
            />
        :
            <CityNeighbourhoods />
    )
}