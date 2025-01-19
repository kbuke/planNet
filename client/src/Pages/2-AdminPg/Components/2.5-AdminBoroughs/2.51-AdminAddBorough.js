import { useState } from "react"


export default function AdminAddBorough({
    addStateBoroughNeighbourhood,
    citiesId,
    cityName,
    setAddBorough,
    setAllBoroughs,
    allBoroughs
}){
    const [boroughName, setBoroughName] = useState("")
    const [boroughImg, setBoroughImg] = useState("")
    const [boroughInfo, setBoroughInfo] = useState("")
    return(
        <div
            id="popUpBackground"
        >
            {addStateBoroughNeighbourhood(
                "Borough", cityName, boroughName, setBoroughName,
                boroughImg, setBoroughImg, boroughInfo, setBoroughInfo,
                citiesId, setAddBorough, "/boroughs", setAllBoroughs, allBoroughs
            )}
        </div>
    )
}