import { useState } from "react"

import SpecificCountry from "../2.2-Countries/2.07-SpecificContry"

export default function AdminContinentCountries({
    locationInfoContainer,
    continentImg,
    continentName,
    selectedOption,
    setSelectedOption,
    continentsCountries,
    setContinentInfo,
    setContinentId,
    handleNewLocation,
    handleNewLocationInputs,
    allStates,
    setAllStates,
    allCountries,
    setAllCountries,
    handleEditLocation
}){
    const [hoveredCountry, setHoveredCountry] = useState("")
    const [selectedCountryId, setSelectedCountryId] = useState()
    const [countryInfo, setCountryInfo] = useState(false)

    console.log(`I have chosen country ${selectedCountryId} from ${continentName}`)

    return(
        !selectedCountryId ?
            locationInfoContainer(
                setContinentId, setContinentInfo,
                continentImg, null,
                continentName, ["Info", "Countries"],
                selectedOption, setSelectedOption,
                null, continentsCountries, 
                "country", hoveredCountry,
                setHoveredCountry, setSelectedCountryId,
                setCountryInfo, null, 
                null, null,
                [setContinentId, setContinentInfo]
            )
        :
           <SpecificCountry 
                countryId={selectedCountryId}
                setCountryId={setSelectedCountryId}
                countryInfo={countryInfo}
                setCountryInfo={setCountryInfo}
                locationInfoContainer={locationInfoContainer}
                handleNewLocation={handleNewLocation}
                handleNewLocationInputs={handleNewLocationInputs}
                allStates={allStates}
                setAllStates={setAllStates}
                setContinentId={setContinentId}
                setContinentInfo={setContinentInfo}
                handleEditLocation={handleEditLocation}
                allCountries={allCountries}
                setAllCountries={setAllCountries}
           /> 
    )
}