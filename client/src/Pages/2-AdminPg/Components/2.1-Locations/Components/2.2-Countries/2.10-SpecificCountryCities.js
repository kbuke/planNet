import { useState } from "react"

import AddCountryCity from "./2.13-AddCountryCity"

export default function SpecificCountryCities({
    universalCountryImports,
    countryCities,
    allCities,
    setAllCities,
    specificCountry,
    handleNewLocation,
    handleNewLocationInputs
}){
    const [hoveredCity, setHoveredCity] = useState("")
    const [cityId, setCityId] = useState()
    const [cityInfo, setCityInfo] = useState(false)
    const [addCity, setAddCity] = useState(false)

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

    const countryId = specificCountry.id 
    const countryStates = specificCountry.states 
    console.log(addCity)

    return(
        addCity ?
            <AddCountryCity 
                universalCountryImports={universalCountryImports}
                countryCities={countryCities}
                addCity={addCity}
                setAddCity={setAddCity}
                allCities={allCities}
                setAllCities={setAllCities}
                countryId={countryId}
                handleNewLocation={handleNewLocation}
                handleNewLocationInputs={handleNewLocationInputs}
                countryStates={countryStates}
            />
        :
            locationInfoContainer(
                setCountryId, setCountryInfo,
                countryImg, passportStamp,
                countryName, countryOptions,
                selectedOption, setSelectedOption,
                setCountryInfo, countryCities,
                null, hoveredCity,
                setHoveredCity, setCityId,
                setCityInfo, setAddCity,
                addCity, null
            )
    )
}