import { useEffect, useState } from "react";


export default function AdminBoroughs({
    appData,
    citiesId,
    locationReelContainer,
    renderLocationContainers,
    boroughId,
    setBoroughId,
    boroughInfo,
    setBoroughInfo,
    setNeighbourhoodId
}){
    const [sortBoroughs, setSortBoroughs] = useState()
    const [hoveredBoroughId, setHoveredBoroughId] = useState()
    const [addBorough, setAddBorough] = useState(false)
    const [boroughName, setBoroughName] = useState()
    const [filterBoroughs, setFilterBoroughs] = useState()
    const [searchBoroughs, setSearchBoroughs] = useState("")
    const [cityName, setCityName] = useState("")

    const allBoroughs = appData.allBoroughs
    const setAllBoroughs = appData.setAllBoroughs 
    
    console.log(allBoroughs)

    useEffect(() => {
        const filterCityBoroughs = allBoroughs.filter(borough => borough.cities_id === citiesId)
        const sortBoroughs = filterCityBoroughs.sort((a, b) => a.name.localeCompare(b.name))
        setSortBoroughs(sortBoroughs)
    }, [allBoroughs, citiesId])

    console.log(sortBoroughs)

    //Get name of city
    const allCities = appData.allCities

    useEffect(() => {
        const city = allCities.filter(specificCity => specificCity.id === citiesId)
        setCityName(city[0].name)
    }, [citiesId])

    return(
        <div>
            {
                locationReelContainer(
                    `Boroughs in ${cityName}`, `Search Boroughs in ${cityName}`,
                    setSearchBoroughs, renderLocationContainers, sortBoroughs,
                    setHoveredBoroughId, hoveredBoroughId, setBoroughId, boroughId, setBoroughInfo,
                    boroughInfo, setAddBorough, setNeighbourhoodId
                )
            }
        </div>
    )
}