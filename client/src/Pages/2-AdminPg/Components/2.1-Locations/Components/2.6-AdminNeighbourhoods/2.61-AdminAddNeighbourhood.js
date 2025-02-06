import { useState } from "react";



export default function AdminAddNeighbourhood({
    addStateBoroughNeighbourhood,
    boroughId,
    boroughName,
    setAddNeighbourhood,
    setAllNeighbourhoods,
    allNeighbourhoods
}){
    const [neighbourhoodName, setNeighbourhoodName] = useState("")
    const [neighbourhoodImg, setNeighbourhoodImg] = useState("")
    const [neighbourhoodInfo, setNeighbourhoodInfo] = useState("")

    console.log(setAddNeighbourhood)
    
    return(
        <div
            id="popUpBackground"
        >
            {addStateBoroughNeighbourhood(
                "Neighbourhood", boroughName, neighbourhoodName, setNeighbourhoodName,
                neighbourhoodImg, setNeighbourhoodImg, neighbourhoodInfo, setNeighbourhoodInfo,
                boroughId, setAddNeighbourhood, "/neighbourhoods", setAllNeighbourhoods, allNeighbourhoods
            )}
        </div>
    )
}