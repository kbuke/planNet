import { useState } from "react";

export default function EditSpecificCountry({
    locationInfoContainer,
    universalCountryImports,
    setEditCountry,
    editCountry,
    handleEditLocation,
    handleNewLocationInputs,
    allCountries,
    setAllCountries,
    countryIntro,
    countrySafety,
}){

    console.log(allCountries)
    
    const countryId = universalCountryImports.countryId
    const setCountryId = universalCountryImports.setCountryId
    const countryName = universalCountryImports.countryName
    const countryOptions = universalCountryImports.countryOptions
    const setCountryInfo = universalCountryImports.setCountryInfo
    const countryImg = universalCountryImports.countryImg
    const selectedOption = universalCountryImports.selectedOption
    const setSelectedOption = universalCountryImports.setSelectedOption
    const countryFlag = universalCountryImports.countryFlag
    const passportStamp = universalCountryImports.passportStamp

    const [editedCountryName, setEditedCountryName] = useState(countryName)
    const [editedCountryImg, setEditedCountryImg] = useState(countryImg)
    const [editedCountryFlag, setEditedCountryFlag] = useState(countryFlag)
    const [editedCountryIntro, setEditedCountryIntro] = useState(countryIntro)
    const [editedPassportStamp, setEditedPassportStamp] = useState(passportStamp)
    const [editedSafetyLevel, setEditedSafetyLevel] = useState(countrySafety)

    const safetyOptions = ["Safe", "Use Caution", "Not Safe"]

    const editedInfoObj = {
        name: editedCountryName,
        image: editedCountryImg,
        safety_level: editedSafetyLevel,
        intro: editedCountryIntro,
        flag: editedCountryFlag,
        passport_stamp: editedPassportStamp
    }

    console.log(allCountries)

    const editCountryForm = () => {
        return(
            <form
                onSubmit={(e) => handleEditLocation(
                    e, editedInfoObj,
                    `/countries/${countryId}`, setAllCountries,
                    allCountries, setEditCountry
                )}
            >
                <h1>Edit {countryName} Info</h1>

                {
                    handleNewLocationInputs(
                        "Edit Country Name",
                        setEditedCountryName,
                        editedCountryName
                    )
                }

                {
                    handleNewLocationInputs(
                        "Edit Country Image",
                        setEditedCountryImg, 
                        editedCountryImg
                    )
                }

                {
                    handleNewLocationInputs(
                        "Edit Country Flag",
                        setEditedCountryFlag,
                        editedCountryFlag
                    )
                }

                {
                    handleNewLocationInputs(
                        "Edit Country's Passport Stamp",
                        setEditedPassportStamp,
                        editedPassportStamp
                    )
                }

                <div
                    id="adminAddLocationsInputContainer"
                >
                    <label>
                        Select Country's Safety Level
                    </label>

                    <select
                        value={editedSafetyLevel}
                        onChange={(e) => setEditedSafetyLevel(e.target.value)}
                        id="addLocationIntroSelect"
                        style={{marginLeft: "10px", marginRight: "10px"}}
                    >
                        <option
                            value="" disabled
                        >
                            Please Select Safety Level
                        </option>

                        {safetyOptions.map((level, index) => (
                            <option
                                key={index}
                                value={level}
                            >
                                {level}
                            </option>
                        ))}
                    </select>
                </div>

                <div
                    id="adminAddLocationsInputContainer"
                >
                    <label>Enter new country intro</label>

                    <textarea 
                        onChange={(e) => setEditedCountryIntro(e.target.value)}
                        id="addLocationIntroInput"
                        value={editedCountryIntro}
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
                        onClick={() => setEditCountry(false)}
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
            setCountryId, setCountryInfo,
            countryImg, null,
            countryName, countryOptions,
            selectedOption, setSelectedOption,
            null, null,
            null, null, 
            null, null,
            null, setEditCountry,
            editCountry, editCountryForm
        )
    )
}