import { useEffect, useState } from "react";



export default function EditNeighbourhoodInfo({
    setNeighbourhoodInfo,
    infoContainer,
    sortNeighbourhoods,
    neighbourhoodId,
    setNeighbourhoodId,
    allNeighbourhoods,
    setAllNeighbourhoods
}){
    const [neighbourhoodName, setNeighbourhoodName] = useState()
    const [neighbourhoodImg, setNeighbourhoodImg] = useState()
    const [neighbourhoodIntro, setNeighbourhoodIntro] = useState()
    const [editNeighbourhoodInfo, setEditNeighbourhoodInfo] = useState(false)

    console.log(sortNeighbourhoods)

    useEffect(() => {
        const filterNeighbourhood = sortNeighbourhoods.filter(
            (hood) => hood.id === neighbourhoodId
        );
        console.log(filterNeighbourhood);
    
        if (filterNeighbourhood.length > 0) {
            setNeighbourhoodName(filterNeighbourhood[0].name);
            setNeighbourhoodImg(filterNeighbourhood[0].image);
            setNeighbourhoodIntro(filterNeighbourhood[0].intro);
        } else {
            setNeighbourhoodName("");
            setNeighbourhoodImg("");
            setNeighbourhoodIntro("");
        }
    }, [neighbourhoodId, sortNeighbourhoods]);    

    console.log(`I am looking at the neighbourhood of ${neighbourhoodName}`)

    return (
        <div
            id="popUpBackground"
        >
            {
                infoContainer(
                    neighbourhoodName, setNeighbourhoodName, neighbourhoodImg, setNeighbourhoodImg,
                    neighbourhoodIntro, setNeighbourhoodIntro, editNeighbourhoodInfo,
                    setEditNeighbourhoodInfo, setNeighbourhoodInfo, `neighbourhoods/${neighbourhoodId}`,
                    allNeighbourhoods, setAllNeighbourhoods, setNeighbourhoodId
                )
            }
        </div>
    )
}