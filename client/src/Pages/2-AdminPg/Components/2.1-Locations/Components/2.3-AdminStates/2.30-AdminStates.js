import { useEffect, useState } from "react"

import { CiCirclePlus } from "react-icons/ci";

import "./2.30-AdminStates.css"
import AdminAddState from "./2.31-AdminAddState";
import AdminStateInfo from "./2.32-AdminStateInfo";

export default function AdminStates({
    appData,
    countryId,
    locationReelContainer,
    renderLocationContainers,
    stateId,
    setStateId,
    stateInfo,
    setStateInfo,
    citiesId,
    setCitiesId,
    addStateBoroughNeighbourhood,
    infoContainer,
    filterStates
}){
    const [sortStates, setSortStates] = useState([])
    const [hoverStateId, setHoverStateId] = useState()
    const [addState, setAddState] = useState(false)
    const [searchStates, setSearchStates] = useState("")
    const [countryName, setCountryName] = useState("")

    console.log(filterStates)


    const allStates = appData.allStates
    const setAllStates = appData.setAllStates

    console.log(allStates)

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
                    setSearchStates, renderLocationContainers, 
                    sortStates, setHoverStateId, 
                    hoverStateId, setStateId, 
                    stateId, setStateInfo,
                    stateInfo, setAddState, 
                    setCitiesId, filterStates,
                    "States", countryName
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

            {
                stateInfo ?
                    <AdminStateInfo 
                        setStateInfo={setStateInfo}
                        infoContainer={infoContainer}
                        sortStates={sortStates}
                        stateId={stateId}
                        setStateId={setStateId}
                        allStates={allStates}
                        setAllStates={setAllStates}
                    />
                    :
                    null
            }
        </div>
    )
}