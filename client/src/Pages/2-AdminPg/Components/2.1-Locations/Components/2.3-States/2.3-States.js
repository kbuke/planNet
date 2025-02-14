import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

import SpecificStateInfo from "./Components/2.31-SpecificStateInfo"
import SpecificStateCities from "./Components/2.32-SpecificStateCities"

export default function States({
    selectedState, setSelectedState,
    stateInfo, setStateInfo,
    locationInfoContainer,
    handleNewLocation, handleNewLocationInputs,
    handleEditLocation
}){
    console.log(`I have chosen state ${selectedState}`)

    const appData = useOutletContext()
    console.log(appData)

    const allCountries = appData.allCountries
    const setAllCountries = appData.setAllCountries

    const allStates = appData.allStates 
    const setAllStates = appData.setAllStates

    const allCities = appData.allCities
    const setAllCities = appData.setAllCities

    const [specificState, setSpecificState] = useState()
    const [selectedStateOption, setSelectedStateOption] = useState("Info")

    //Fetch specific state 
    useEffect(() => {
        fetch(`/states/${selectedState}`)
        .then(r => {
            if(r.ok){
                return r.json()
                .then(state => {
                    setSpecificState(state)
                })
            }
        })
    }, [selectedState, stateInfo, allStates, allCities, allStates])

    console.log(specificState)

    const stateName = specificState?.name
    const stateIntro = specificState?.intro
    const stateImg = specificState?.image
    const stateCities = specificState?.cities

    const stateCountry = specificState?.country
    const stateCountryId = stateCountry?.id
    const stateCountryName = stateCountry?.name 
    const stateCountryImg = stateCountry?.image

    console.log(stateCountry)

    const stateOptions = ["Info", "Cities"]

    const universalStateImports = {
        stateId: selectedState,
        setStateId: setSelectedState,
        stateName: stateName,
        stateImg: stateImg,
        stateOptions: stateOptions,
        locationInfoContainer: locationInfoContainer,
        selectedStateOption: selectedStateOption,
        setSelectedStateOption: setSelectedStateOption,
        setStateId: setSelectedState,
        setStateInfo: setStateInfo
    }

    return(
        selectedStateOption === "Info"?
            <SpecificStateInfo 
                stateIntro={stateIntro}
                universalStateImports={universalStateImports}
                stateCountryName={stateCountryName}
                stateCountryImg={stateCountryImg}
                stateCountryId={stateCountryId}
                handleNewLocation={handleNewLocation}
                handleNewLocationInputs={handleNewLocationInputs}
                allStates={allStates}
                setAllStates={setAllStates}
                allCountries={allCountries}
                setAllCountries={setAllCountries}
                handleEditLocation={handleEditLocation}
            />
        :
            <SpecificStateCities 
                universalStateImports={universalStateImports}
                stateCities={stateCities}
                allCities={allCities}
                setAllCities={setAllCities}
                stateId={selectedState}
                stateCountryId={stateCountryId}
                handleNewLocation={handleNewLocation}
                handleNewLocationInputs={handleNewLocationInputs}
                handleEditLocation={handleEditLocation}
            />
    )
}