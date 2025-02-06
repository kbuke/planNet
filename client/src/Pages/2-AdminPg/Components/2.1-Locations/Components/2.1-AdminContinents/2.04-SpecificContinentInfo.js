

export default function SpecificContinentInfo({
    locationInfoContainer,
    continentImg,
    continentName,
    selectedOption,
    setSelectedOption,
    setContinentInfo,
    setContinentId
}){
    return(
        locationInfoContainer(
            setContinentId, setContinentInfo,
            continentImg, null,
            continentName, ["Info", "Countries"],
            selectedOption, setSelectedOption,
            null
        )
    )
}