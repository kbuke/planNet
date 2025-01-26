import { useEffect, useState } from "react"

import "./2.01-AdminContinents.css"

import AddContinent from "./2.02-AddContinent";
import ContinentInfo from "./2.03-ContinentInfo";

export default function AdminContinents({
    continentId,
    setContinentId,
    allContinents,
    setAllContinents,
    renderLocationContainers,
    locationReelContainer,
    infoContainer
}){
    const [sortContinents, setSortContinents] = useState([])
    const [hoveredContinent, setHoveredContinent] = useState()
    const [addContinent, setAddContinent] = useState(false)
    const [continentInfo, setContinentInfo] = useState(false)
    const [searchLocation, setSearchLocation] = useState("")

    useEffect(() => {
        setSortContinents(allContinents.sort((a, b) => a.name.localeCompare(b.name)))
    }, [allContinents])

    return(
        <div>
            {
                locationReelContainer("Continents", "Search continents", setSearchLocation,
                renderLocationContainers, sortContinents, setHoveredContinent, hoveredContinent,
                setContinentId, continentId, setContinentInfo, continentInfo, setAddContinent)
            }

            {addContinent ? 
                <AddContinent 
                    allContinents={allContinents}
                    setAllContinents={setAllContinents}
                    setAddContinent={setAddContinent}
                />
                :
                null
            }

            {continentId && continentInfo ?
                <ContinentInfo 
                    setContinentId={setContinentId}
                    continentId={continentId}
                    allContinents={allContinents}
                    setAllContinents={setAllContinents}
                    setContinentInfo={setContinentInfo}
                    infoContainer={infoContainer}
                />
                :
                null
            }
        </div>
    )
}