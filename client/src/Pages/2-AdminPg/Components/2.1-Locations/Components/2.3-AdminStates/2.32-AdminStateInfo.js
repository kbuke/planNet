
import { useEffect, useState } from "react"

export default function AdminStateInfo({
    setStateInfo,
    infoContainer,
    sortStates,
    stateId,
    setStateId,
    allStates,
    setAllStates
}){
    const [specificState, setSpecificState] = useState([])
    const [stateName, setStateName] = useState()
    const [stateImg, setStateImg] = useState()
    const [stateIntro, setStateIntro] = useState()
    const [editStateInfo, setEditStateInfo] = useState(false)

    useEffect(() => {
        const filteredState = sortStates.filter(state => state.id === stateId);
        if (filteredState.length > 0) {
            setSpecificState(filteredState);
            setStateName(filteredState[0].name);
            setStateImg(filteredState[0].image);
            setStateIntro(filteredState[0].intro);
        } else {
            setSpecificState([]);
            setStateName(null);
            setStateImg(null);
            setStateIntro(null);
        }
    }, [stateId, sortStates]); // Add sortStates as a dependency if it can change
    

    console.log(`I have selected state ${stateId} called ${stateName}`)
    console.log(`i am editing state ${editStateInfo}`)

    return(
        <div
            id="popUpBackground"
        >
            {
                infoContainer(
                    stateName, setStateName, stateImg, setStateImg,
                    stateIntro, setStateIntro, editStateInfo,
                    setEditStateInfo, setStateInfo, `states/${stateId}`,
                    allStates, setAllStates, setStateId
                )
            }
        </div>
    )
}