import { useEffect, useState } from "react"

import { CiCirclePlus } from "react-icons/ci";

import AddCountry from "./2.07-AddCountry";
import AddCountryContinent from "./2.08-AddCountryContinent";
import SpecificCountry from "./2.07-SpecificContry";

import "./2.06-AdminCountry.css"
import AdminCountryInfo from "./2.09-AdminCountryInfo";

export default function AdminCountry({
    appData,
    allCountries,
    setAllCountries,
    countinentAndCountryPolaroid,
    locationInfoContainer,
    handleNewLocation,
    handleNewLocationInputs,
    allStates,
    setAllStates
}){
    const [countryId, setCountryId] = useState()
    const [countryInfo, setCountryInfo] = useState(false)

    const sortCountries = allCountries.sort((a, b) => a.name.localeCompare(b.name))

    return(
        <div>
            <div
                id="adminLocationTitleContainer"
            >
                <h1
                    id="adminLocationTypeTitle"
                >
                    Countries
                </h1>
            </div>

            <div
                id="adminLocationGrid"
            >
                {
                    countinentAndCountryPolaroid
                        (
                            allCountries, setCountryId, 
                            setCountryInfo
                        )
                }
            </div>

            {
                countryId && countryInfo ?
                    <SpecificCountry 
                        countryId={countryId}
                        setCountryId={setCountryId}
                        countryInfo={countryInfo}
                        setCountryInfo={setCountryInfo}
                        locationInfoContainer={locationInfoContainer}
                        handleNewLocation={handleNewLocation}
                        handleNewLocationInputs={handleNewLocationInputs}
                        allStates={allStates}
                        setAllStates={setAllStates}
                    />
                :
                    null
            }
        </div>
    )
}