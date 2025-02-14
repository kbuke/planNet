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

    const setStateId = universalStateImports.setStateId

    const stateName = universalStateImports.stateName

    const stateOptions = universalStateImports.stateOptions

    const setStateInfo = universalStateImports.setStateInfo

    const stateImg = universalStateImports.stateImg

    const selectedOption = universalStateImports.selectedStateOption

    const setSelectedOption = universalStateImports.setSelectedStateOption

    const [editStateName, setEditStateName] = useState(stateName)
    const [editedStateImg, setEditedStateImg] = useState(stateImg)
    const [editedStateIntro, setEditedStateIntro] = useState(stateIntro)

    const editedStateInfoObj = {
        name: editStateName,
        image: editedStateImg,
        intro: editedStateIntro
    }


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