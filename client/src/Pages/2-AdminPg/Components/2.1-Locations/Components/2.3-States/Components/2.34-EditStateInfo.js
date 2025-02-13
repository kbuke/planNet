import { useState } from "react"



export default function EditStateInfo({
    locationInfoContainer,
    universalStateImports,
    setEditState,
    editState,
    handleEditLocation,
    handleNewLocationInputs,
    allStates,
    setAllStates,
    stateIntro
}){
    const stateId = universalStateImports.stateId
    console.log(`state id: ${stateId}`)

    const setStateId = universalStateImports.setStateId
    console.log(`set state id: ${setStateId}`)

    const stateName = universalStateImports.stateName
    console.log(`state name: ${stateName}`)

    const stateOptions = universalStateImports.stateOptions
    console.log(stateOptions)

    const setStateInfo = universalStateImports.setStateInfo
    console.log(setStateInfo)

    const stateImg = universalStateImports.stateImg
    console.log(stateImg)

    const selectedOption = universalStateImports.selectedStateOption
    console.log(selectedOption)

    const setSelectedOption = universalStateImports.setSelectedStateOption
    console.log(setSelectedOption)

    const [editStateName, setEditStateName] = useState(stateName)
    const [editedStateImg, setEditedStateImg] = useState(stateImg)
    const [editedStateIntro, setEditedStateIntro] = useState(stateIntro)

    const editedStateInfoObj = {
        name: editStateName,
        image: editedStateImg,
        intro: editedStateIntro
    }

    console.log(handleEditLocation)

    const editStateForm = () => {
        return(
            <form
                onSubmit={(e) => handleEditLocation(
                    e, editedStateInfoObj,
                    `/states/${stateId}`, setAllStates,
                    allStates, setEditState
                )}
            >
                <h1>Edit {stateName} Info</h1>

                {
                    handleNewLocationInputs(
                        "Edit State Name",
                        setEditStateName,
                        editStateName
                    )
                }

                {
                    handleNewLocationInputs(
                        "Edit State Image",
                        setEditedStateImg, 
                        editedStateImg
                    )
                }

                <div
                    id="adminAddLocationsInputContainer"
                >
                    <label>Enter new state intro</label>

                    <textarea 
                        onChange={(e) => setEditedStateIntro(e.target.value)}
                        id="addLocationIntroInput"
                        value={editedStateIntro}
                    />
                </div>

                <div
                    id="adminAddLocationsButtonContainer"
                >
                    <button
                        className="adminAddLocationsButton"
                        type="submit"
                    >
                        Edit Country
                    </button>

                    <button
                        onClick={() => setEditState(false)}
                        className="adminAddLocationsButton"
                        style={{backgroundColor: "red"}}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        )
    }

    return(
        locationInfoContainer(
            setStateId, setStateInfo,
            stateImg, null, 
            stateName, stateOptions,
            selectedOption, setSelectedOption,
            null, null,
            null, null,
            null, null,
            null, setEditState,
            editState, editStateForm
        )
    )
}