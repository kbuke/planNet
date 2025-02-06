import { useEffect, useState } from "react";

import SpecificCountryInfo from "./2.08-SpecificCountryInfo";
import SpecificCountryStates from "./2.09-SpecificCountryStates";
import SpecificCountryCities from "./2.10-SpecificCountryCities";

export default function SpecificCountry({
    countryId,
    setCountryId,
    countryInfo,
    setCountryInfo,
    locationInfoContainer,
    handleNewLocation,
    handleNewLocationInputs,
    allStates,
    setAllStates
}){
    const [specificCountry, setSpecificCountry] = useState()
    const [selectedOption, setSelectedOption] = useState("Info")

    console.log(`The specific country chosens id is ${countryId}`)

    //Fetch specific country details
    useEffect(() => {
        fetch(`/countries/${countryId}`)
        .then(r => {
            if(r.ok){
                return r.json()
                .then(country => {
                    setSpecificCountry(country)
                })
            }
        })
    }, [countryId, countryInfo, allStates])

    console.log(specificCountry)

    const countryImg = specificCountry?.image
    const counrtyName = specificCountry?.name 
    const passportStamp = specificCountry?.passport_stamp 
    const countrySafety = specificCountry?.safety_level
    const countryFlag = specificCountry?.flag

    const countryContinents = specificCountry?.continents 
    const countryStates = specificCountry?.states 
    const countryCities = specificCountry?.cities

    const countryOptions = ["Info", "States", "Cities"]

    const universalCountryImports = {
        locationInfoContainer: locationInfoContainer,
        countryImg: countryImg,
        countryName: counrtyName,
        passportStamp: passportStamp,
        countryFlag: countryFlag,
        selectedOption: selectedOption,
        setSelectedOption: setSelectedOption,
        setCountryInfo: setCountryInfo,
        setCountryId: setCountryId,
        countryOptions: countryOptions,
        countryId: countryId
    }

    return(
        <div
            id="popUpBackground"
        >
            {
                selectedOption==="Info"?
                    <SpecificCountryInfo 
                        countrySafety={countrySafety}
                        countryContinents={countryContinents}
                        universalCountryImports={universalCountryImports}
                    />
                :
                selectedOption==="States"?
                    <SpecificCountryStates 
                        universalCountryImports={universalCountryImports}
                        countryStates={countryStates}
                        handleNewLocation={handleNewLocation}
                        handleNewLocationInputs={handleNewLocationInputs}
                        allStates={allStates}
                        setAllStates={setAllStates}
                    />
                :
                selectedOption==="Cities"?
                    <SpecificCountryCities 
                        universalCountryImports={universalCountryImports}
                        countryCities={countryCities}
                    />
                :
                null
            }
        </div>
    )
}