import { useEffect, useState } from "react"

import "./2.01-AdminContinents.css"

import AddContinent from "./2.02-AddContinent";
import SpecificContinent from "./2.03-SpecificContinent";

export default function AdminContinents({
    allContinents,
    setAllContinents,
    countinentAndCountryPolaroid,
    locationInfoContainer,
    handleNewLocation,
    handleNewLocationInputs,
    allStates,
    setAllStates,
    handleEditLocation
}){
    console.log(allContinents)

    const [continentId, setContinentId] = useState()
    const [continentInfo, setContinentInfo] = useState(false)

    const sortContinents = allContinents.sort((a, b) => a.name.localeCompare(b.name))

    return(
        <div>
            <div
                id="adminLocationTitleContainer"
            >
                <h1
                    id="adminLocationTypeTitle"
                >
                    Continents
                </h1>
            </div>
            
            <div
                id="adminLocationGrid"
            >
                {countinentAndCountryPolaroid
                    (
                        allContinents, setContinentId,
                        setContinentInfo
                    )
                }
            </div>

            {continentId && continentInfo ?
                <SpecificContinent 
                    continentId={continentId}
                    setContinentId={setContinentId}
                    continentInfo={continentInfo}
                    setContinentInfo={setContinentInfo}
                    locationInfoContainer={locationInfoContainer}
                    handleNewLocation={handleNewLocation}
                    handleNewLocationInputs={handleNewLocationInputs}
                    allStates={allStates}
                    setAllStates={setAllStates}
                    handleEditLocation={handleEditLocation}
                    setAllContinents={setAllContinents}
                    allContinents={allContinents}
                />
                :
                null
            }
        </div>
    )
}