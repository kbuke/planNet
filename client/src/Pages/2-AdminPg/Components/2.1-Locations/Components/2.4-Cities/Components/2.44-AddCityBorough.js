import { use, useState } from "react"

export default function AddCityBorough({
    universalCityInfo,
    cityBoroughs,
    addBorough,
    setAddBorough,
    allBoroughs,
    setAllBoroughs,
    cityId,
    handleNewLocation,
    handleNewLocationInputs
}){
    
    const [boroughName, setBoroughName] = useState("")
    const [boroughImg, setBoroughImg] = useState("")
    const [boroughIntro, setBoroughIntro] = useState("")

    const setCityId = universalCityInfo.setCityId
    const setCityInfo = universalCityInfo.setCityInfo
    const cityName = universalCityInfo.cityName
    const cityImg = universalCityInfo.cityImg
    const cityOptions = universalCityInfo.cityOptions
    const selectedCityOption = universalCityInfo.selectedCityOption
    const setSelectedCityOption = universalCityInfo.setSelectedCityOption
    const locationInfoContainer = universalCityInfo.locationInfoContainer

    const jsonData = {
        locationName: boroughName,
        locationImg: boroughImg,
        locationIntro: boroughIntro,
        relationId: cityId
    }

    const newBoroughInput = () => {
        return(
            <form
                onSubmit={(e) => handleNewLocation(
                    e, jsonData,
                    "/boroughs", setAllBoroughs,
                    allBoroughs, setAddBorough
                )}
            >
                <h1>Add new Borough to {cityName}</h1>

                {
                    handleNewLocationInputs(
                        "Enter new borough name",
                        setBoroughName
                    )
                }

                {
                    handleNewLocationInputs(
                        "Enter new borough image",
                        setBoroughImg
                    )
                }

                <div
                    id="adminAddLocationsInputContainer"
                >
                    <label>Enter new borough intro</label>

                    <textarea 
                        onChange={(e) => setBoroughIntro(e.target.value)}
                        id="addLocationIntroInput"
                    />
                </div>

                <div
                    id="adminAddLocationsButtonContainer"
                >
                    <button
                        className="adminAddLocationsButton"
                        type="submit"
                    >
                        Create New Borough
                    </button>

                    <button
                        onClick={() => setAddBorough(false)}
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
            setCityId, setCityInfo,
            cityImg, null, 
            cityName, cityOptions, 
            selectedCityOption, setSelectedCityOption,
            null, null,
            null, null, 
            null, null,
            null, setAddBorough, 
            addBorough, newBoroughInput
        )
    )
}