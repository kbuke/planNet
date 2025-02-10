import { useState } from "react";
import { useAsyncError } from "react-router-dom";



export default function EditContinentInfo({
    locationInfoContainer,
    continentImg,
    continentName,
    countinentIntro,
    selectedOption,
    setSelectedOption,
    setContinentInfo,
    setContinentId,
    handleEditLocation,
    setEditContinent,
    handleNewLocationInputs,
    continentId,
    allContinents,
    editContinent,
    setAllContinents
}){
    const [editedContinentName, setEditedContinentName] = useState(continentName)
    const [editedContinentImg, setEditedContinentImg] = useState(continentImg)
    const [editedContinentIntro, setEditContinentIntro] = useState(countinentIntro)

    const editedInfoObj = {
        name: editedContinentName,
        image: editedContinentImg,
        intro: editedContinentIntro
    }
    
    const editContinentForm = () => {
        return(
            <form
                onSubmit={(e) => handleEditLocation(
                    e, editedInfoObj,
                    `/continents/${continentId}`, setAllContinents,
                    allContinents, setEditContinent
                )}
            >
                <h1>Edit {continentName} Info</h1>

                {
                    handleNewLocationInputs(
                        "Edit Continent Name",
                        setEditedContinentName,
                        editedContinentName
                    )
                }

                {
                    handleNewLocationInputs(
                        "Edit Continent Image",
                        setEditedContinentImg,
                        editedContinentImg
                    )
                }

                <div
                    id="adminAddLocationsInputContainer"
                >
                    <label>Enter new continent intro</label>

                    <textarea 
                        onChange={(e) => setEditContinentIntro(e.target.value)}
                        id="addLocationIntroInput"
                        value={editedContinentIntro}
                    />
                </div>

                <div
                    id="adminAddLocationsButtonContainer"
                >
                    <button
                        className="adminAddLocationsButton"
                        type="submit"
                    >
                        Edit Continent
                    </button>

                    <button
                        onClick={() => setEditContinent(false)}
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
            setContinentId, setContinentInfo,
            continentImg, null, 
            continentName, ["Info", "Countries"],
            selectedOption, setSelectedOption,
            null, null,
            null, null,
            null, null,
            null, setEditContinent,
            editContinent, editContinentForm
        )
    )
}