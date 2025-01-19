import { useEffect, useState } from "react";


export default function AdminNeighbourhoods({
    appData,
    boroughId,
    locationReelContainer,
    renderLocationContainers,
    neighbourhoodId,
    setNeighbourhoodId,
    neighbourhoodInfo,
    setNeighbourhoodInfo
}){
    const [sortNeighbourhoods, setSortNeighbourhoods] = useState()
    const [hoveredNeighbourhoodId, setHoveredNeighbourhoodId] = useState()
    const [addNeighbourhood, setAddNeighbourhood] = useState(false)
    const [neighbourhoodName, setNeighbourhoodName] = useState("")
    const [filterNeighbourhood, setFilterNeighbourhood] = useState()
    const [searchNeighbourhood, setSearchNeighbourhood] = useState("")
    const [boroughName, setBoroughName] = useState("")

    const allNeighbourhoods = appData.allNeighbourhoods
    const setAllNeighbourhoods = appData.setAllNeighbourhoods

    console.log(allNeighbourhoods)

    useEffect(() => {
        const filterBoroughNeighbourhood = allNeighbourhoods.filter(neighbourhood => neighbourhood.boroughs_id === boroughId)
        const sortNeighbourhood = filterBoroughNeighbourhood.sort((a, b) => a.name.localeCompare(b.name))
        setSortNeighbourhoods(sortNeighbourhood)
    }, [boroughId, allNeighbourhoods])

    //Get name of borough
    const allBoroughs = appData.allBoroughs

    useEffect(() => {
        const borough = allBoroughs.filter(specificBorough => specificBorough.id === boroughId)
        console.log(borough)
        setBoroughName(borough[0].name)
    }, [boroughId])

    console.log(`I am looking at the boroug of ${boroughName}`)

    return(
        <div>
            {
                locationReelContainer(
                    `Neighbourhoods in ${boroughName}`, `Search Neighbourhoods in ${boroughName}`,
                    setSearchNeighbourhood, renderLocationContainers, sortNeighbourhoods,
                    setHoveredNeighbourhoodId, hoveredNeighbourhoodId, setNeighbourhoodId, neighbourhoodId, 
                    neighbourhoodInfo, setAddNeighbourhood
                )
            }
        </div>
    )
}