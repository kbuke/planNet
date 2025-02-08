


export default function SpecificStateInfo({
    stateIntro,
    universalStateImports
}){
    const setStateId = universalStateImports.setStateId
    const setStateInfo = universalStateImports.setStateInfo
    const stateName = universalStateImports.stateName 
    const stateImg = universalStateImports.stateImg
    const stateOptions = universalStateImports.stateOptions
    const selectedStateOption = universalStateImports.selectedStateOption
    const setSelectedStateOption = universalStateImports.setSelectedStateOption
    const locationInfoContainer = universalStateImports.locationInfoContainer

    return(
        locationInfoContainer(
            setStateId, setStateInfo,
            stateImg, null,
            stateName, stateOptions,
            selectedStateOption, setSelectedStateOption,
            stateIntro, null,
            null, null, 
            null, null,
            null, null,
            null, null
        )
    )
}