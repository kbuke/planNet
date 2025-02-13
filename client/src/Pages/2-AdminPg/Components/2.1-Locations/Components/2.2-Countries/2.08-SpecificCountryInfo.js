import { useState } from "react"

import EditSpecificCountry from "./2.14-EditSpecificCountry"

export default function SpecificCountryInfo({
    countrySafety,
    countryContinents,
    universalCountryImports,
    setContinentInfo,
    setContinentId,
    handleEditLocation,
    handleNewLocationInputs,
    allCountries,
    setAllCountries,
    countryIntro,
}){
    const [editCountry, setEditCountry] = useState(false)

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

    console.log(countryIntro)

    console.log(handleNewLocationInputs)

    // Filter out null values from the function array
    const functionArray = [
        setCountryId, 
        setCountryInfo, 
        setContinentId || null, 
        setContinentInfo || null
    ].filter(func => func !== null);  // This will remove nulls

    return (
        editCountry ?
            <EditSpecificCountry 
                locationInfoContainer={locationInfoContainer}
                universalCountryImports={universalCountryImports}
                setEditCountry={setEditCountry} 
                editCountry={editCountry} 
                handleEditLocation={handleEditLocation}
                handleNewLocationInputs={handleNewLocationInputs}
                allCountries={allCountries}
                setAllCountries={setAllCountries}
                countryIntro={countryIntro}
                countrySafety={countrySafety}
            />
        :
            locationInfoContainer(
                setCountryId, setCountryInfo,
                countryImg, passportStamp,
                countryName, countryOptions,
                selectedOption, setSelectedOption,
                countryIntro, null,
                null, null, 
                null, null,
                null, null,
                null, null,
                functionArray, setEditCountry
            )
    );

}