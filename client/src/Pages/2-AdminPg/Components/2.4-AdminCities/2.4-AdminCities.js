import { useEffect, useState } from "react";


export default function AdminCities({
    appData,
    stateId,
    locationReelContainer,
    renderLocationContainers,
    citiesId,
    setCitiesId,
    cityInfo,
    setCityInfo,
    countryId,
    setBoroughId
}){
    const [sortCities, setSortCities] = useState([])
    const [hoveredCityId, setHoveredCityId] = useState()
    const [addCity, setAddCity] = useState(false)
    const [cityName, setCityName] = useState()
    const [filterCities, setFilterCities] = useState()
    const [searchCities, setSearchCities] = useState("")
    const [stateName, setStateName] = useState("")

    const allCities = appData.allCities
    const setAllCities = appData.setAllCities

    useEffect(() => {
        const filterStatesCities = allCities.filter(city => city.states_id === stateId)
        const sortedCities = filterStatesCities.sort((a, b) => a.name.localeCompaer(b.name))
        setSortCities(sortedCities)
    }, [allCities, stateId, countryId])

    console.log(sortCities)

    //Get name of state
    const allStates = appData.allStates

    useEffect(() => {
        const state = allStates.filter(specificState => specificState.id === stateId)
        setStateName(state[0].name)
    }, [stateId, countryId])

    console.log(sortCities)

    return(
        <div>
            {
                locationReelContainer(
                    `Cities in ${stateName}`, `Search Cities`,
                    setSearchCities, renderLocationContainers, sortCities,
                    setHoveredCityId, hoveredCityId, setCitiesId, citiesId, setCityInfo,
                    cityInfo, setAddCity, setBoroughId
                )
            }
        </div>
    )
}