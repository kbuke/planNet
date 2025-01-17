import { useEffect, useState } from "react"

import { CiCirclePlus } from "react-icons/ci";

import "./2.30-AdminStates.css"
import AdminAddState from "./2.31-AdminAddState";

export default function AdminStates({
    appData,
    countryId,
    locationReelContainer,
    renderLocationContainers,
    stateId,
    setStateId,
    stateInfo,
    setStateInfo,
    setCitiesId,
    addStateBoroughNeighbourhood
}){
    const [sortStates, setSortStates] = useState([])
    const [hoverStateId, setHoverStateId] = useState()
    const [addState, setAddState] = useState(false)
    const [stateName, setStateName] = useState()
    const [filterStates, setFilterStates] = useState()
    const [searchStates, setSearchStates] = useState("")
    const [countryName, setCountryName] = useState("")


    const allStates = appData.allStates
    const setAllStates = appData.setAllStates

    console.log(setAllStates)

    useEffect(() => {
        const filterCountryStates = allStates.filter(state => state.country_id === countryId)
        const sortStates = filterCountryStates.sort((a, b) => a.name.localeCompare(b.name))
        setSortStates(sortStates)
    }, [allStates, countryId])

    //Get name of the country
    const allCountries = appData.allCountries

    useEffect(() => {
        const country = allCountries.filter(specificCountry => specificCountry.id === countryId)
        setCountryName(country[0].name)
    }, [countryId])

    return(
        <div>
            {
                locationReelContainer(
                    `States in ${countryName}`, "Search States",
                    setSearchStates, renderLocationContainers, sortStates,
                    setHoverStateId, hoverStateId, setStateId, stateId, setStateInfo,
                    stateInfo, setAddState, setCitiesId
                )
            }

            {
                addState ?
                    <AdminAddState 
                        addStateBoroughNeighbourhood={addStateBoroughNeighbourhood}
                        countryId={countryId}
                        countryName={countryName}
                        setAddState={setAddState}
                        setAllStates={setAllStates}
                        allStates={allStates}
                    />
                    :
                    null
            }
        </div>
    )
}