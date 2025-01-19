import { useState } from "react"

export default function AdminAddState({
    addStateBoroughNeighbourhood,
    countryId,
    countryName,
    setAddState,
    setAllStates,
    allStates
}){
    console.log(allStates)
    const [stateName, setStateName] = useState("")
    const [stateImg, setStateImg] = useState("")
    const [stateInfo, setStateInfo] = useState("")

    console.log(`I AM CREATING THE STATE OF ${stateName} IMG: ${stateImg}, and who ${stateInfo}`)

    return(
        <div
            id="popUpBackground"
        >
            {addStateBoroughNeighbourhood(
                "State", countryName, stateName, setStateName,
                stateImg, setStateImg, stateInfo, setStateInfo,
                countryId, setAddState, "/states", setAllStates, allStates
            )}
        </div>
    )
}