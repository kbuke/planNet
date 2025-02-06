import { useEffect, useState } from "react";

import AddCities from "./2.41-AddCities";
import AdminCityInfo from "./2.42-AdminCityInfo";

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
    setBoroughId,
    filterStates,
    filterCountries,
    infoContainer
}){
    const [sortCities, setSortCities] = useState([])
    const [hoveredCityId, setHoveredCityId] = useState()
    const [addCity, setAddCity] = useState(false)
    const [cityName, setCityName] = useState()
    const [filterCities, setFilterCities] = useState()
    const [searchCities, setSearchCities] = useState("")
    const [stateName, setStateName] = useState("")
    const [countryName, setCountryName] = useState("")

    const allCities = appData.allCities
    const setAllCities = appData.setAllCities

    useEffect(() => {
        const filteredCities = allCities.filter(city => 
            stateId ? 
                city.states_id === stateId 
                :
                city.countries_id === countryId
        )
        // const filterStatesCities = allCities.filter(city => city.states_id === stateId)
        const sortedCities = filteredCities.sort((a, b) => a.name.localeCompare(b.name))
        setSortCities(sortedCities)
    }, [allCities, stateId, countryId])

    console.log(filterCountries)

    //Get name of state
    const allStates = appData.allStates

    useEffect(() => {
        const state = allStates.filter(specificState => specificState.id === stateId)
        setStateName(state[0]?.name)
        setCountryName(filterCountries[0]? filterCountries[0].name : null)
    }, [stateId, countryId, filterCountries])

    console.log(`Trying to create a city in country ${countryId} and state ${stateId}`)

    return(
        <div>
            {
                locationReelContainer(
                    `Cities in ${filterStates && filterStates.length === 0 ? countryName : stateName}`, `Search Cities`,
                    setSearchCities, renderLocationContainers, 
                    sortCities, setHoveredCityId, 
                    hoveredCityId, setCitiesId, 
                    citiesId, setCityInfo,
                    cityInfo, setAddCity, 
                    setBoroughId
                )
            }

            {addCity ?
                <AddCities 
                    setAddCity={setAddCity}
                    stateId={stateId}
                    allCities={allCities}
                    setAllCities={setAllCities}
                    countryId={countryId}
                />
                :
                null
            }

            {
                cityInfo ?
                    <AdminCityInfo 
                        infoContainer={infoContainer}
                    />
                    :
                    null
            }
        </div>
    )
}