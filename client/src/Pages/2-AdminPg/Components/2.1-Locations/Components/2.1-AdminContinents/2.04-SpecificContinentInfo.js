import { useState } from "react"

import EditContinentInfo from "./2.06-EditContinentInfo"

export default function SpecificContinentInfo({
    locationInfoContainer,
    continentImg,
    continentName,
    selectedOption,
    setSelectedOption,
    setContinentInfo,
    setContinentId,
    handleEditLocation,
    handleNewLocationInputs,
    countinentIntro,
    continentId,
    allContinents,
    setAllContinents
}){

    const [editContinent, setEditContinent] = useState(false)

    return(
        editContinent ?
            <EditContinentInfo 
                locationInfoContainer={locationInfoContainer}
                continentImg={continentImg}
                continentName={continentName}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                setContinentInfo={setContinentInfo}
                setContinentId={setContinentId}
                handleEditLocation={handleEditLocation}
                setEditContinent={setEditContinent}
                handleNewLocationInputs={handleNewLocationInputs}
                countinentIntro={countinentIntro}
                continentId={continentId}
                allContinents={allContinents}
                setAllContinents={setAllContinents}
                editContinent={editContinent}
            />
        :
            locationInfoContainer(
                setContinentId, setContinentInfo,
                continentImg, null,
                continentName, ["Info", "Countries"],
                selectedOption, setSelectedOption,
                countinentIntro, null,
                null, null,
                null, null,
                null, null,
                null, null,
                [setContinentId, setContinentInfo], setEditContinent
        )
    )
}