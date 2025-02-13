import { useState } from "react"

import EditStateInfo from "./2.34-EditStateInfo"

export default function SpecificStateInfo({
    stateIntro,
    universalStateImports,
    stateCountryName,
    stateCountryImg,
    stateCountryId,
    handleNewLocation,
    handleNewLocationInputs,
    allStates,
    setAllStates,
    allCountries,
    setAllCountries,
    handleEditLocation,
}){
    const [editState, setEditState] = useState(false)

    const setStateId = universalStateImports.setStateId
    const setStateInfo = universalStateImports.setStateInfo
    const stateName = universalStateImports.stateName 
    const stateImg = universalStateImports.stateImg
    const stateOptions = universalStateImports.stateOptions
    const selectedStateOption = universalStateImports.selectedStateOption
    const setSelectedStateOption = universalStateImports.setSelectedStateOption
    const locationInfoContainer = universalStateImports.locationInfoContainer

    return(
        editState ?
            <EditStateInfo 
                locationInfoContainer={locationInfoContainer}
                universalStateImports={universalStateImports}
                setEditState={setEditState}
                editState={editState}
                handleEditLocation={handleEditLocation}
                handleNewLocationInputs={handleNewLocationInputs}
                allStates={allStates}
                setAllStates={setAllStates}
                stateIntro={stateIntro}
            />
        :
            locationInfoContainer(
                setStateId, setStateInfo,
                stateImg, null,
                stateName, stateOptions,
                selectedStateOption, setSelectedStateOption,
                stateIntro, null,
                null, null, 
                null, null,
                null, null,
                null, null,
                [setStateId, setStateInfo], setEditState
            )
    )
}