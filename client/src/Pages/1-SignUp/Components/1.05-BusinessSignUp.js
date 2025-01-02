
import "./1.05-BusinessSignUp.css"

import { useState, useEffect } from "react"

export default function BusinessSignUp({
    email,
    setEmail,
    password,
    setPassword,
    accountType,
    setAccountType,
    countryId,
    setCountryId,
    stateId,
    setStateId,
    cityId,
    setCityId,
    boroughId,
    setBoroughId,
    neighbourhoodId,
    setNeighbourhoodId,
    setNewSignUp,
    sortCountries,
    filteredStates,
    filteredCities, 
    filteredBoroughs,
    filteredNeighbourhoods,
    locationInputs,
    newUserInputs,
    appData
}){
    const [businessName, setBusinessName] = useState()
    const [openingTime, setOpeningTime] = useState()
    const [closingTime, setClosingTime] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [buildingNumber, setBuildingNumber] = useState()
    const [streetName, setStreetName] = useState()
    const [postCode, setPostCode] = useState()
    const [intro, setIntro] = useState("")

    const allBusinesses = appData.allBusinesses
    const setAllBusinesses = appData.setAllBusinesses

    const handleNewBusiness = (e) => {
        e.preventDefault()
        const jsonData = {
            email, 
            password,
            accountType,
            countryId,
            stateId,
            cityId,
            boroughId,
            neighbourhoodId,
            businessName,
            openingTime,
            closingTime,
            phoneNumber,
            buildingNumber,
            streetName,
            postCode,
            intro
        }
        fetch("/businesses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newBusiness => {
                setAllBusinesses([...allBusinesses, newBusiness])
            })
            .then(setNewSignUp(true))
            .catch(error => console.error("Error adding new business"))
    }

    //Reset stateId and cityId when countryId changes
    useEffect(() => {
        setStateId("")
        setCityId("")
        setBoroughId("")
        setNeighbourhoodId("")
    }, [countryId])

    const operatingTimeContainer = (text, setTimeVariable, time) => {
        return(
            <div>
                <p
                    style={{color: "white"}}
                >
                    {text}
                </p>

                <input 
                    type="time"
                    onChange={(e) => setTimeVariable(e.target.value)}
                    value={time}
                    required
                    className="operatingTimeInput"
                />
            </div>
        )
    }

    return(
        <form
            onSubmit={(e) => handleNewBusiness(e)}
        >
            <p
                style={{marginTop: "0px", color: "white"}}
            >
                Hey!!! Please enter your businesses info below
            </p>

            {newUserInputs("Please enter your businesses name", setBusinessName)}
            {newUserInputs("Please enter your email address", setEmail)}
            {newUserInputs("Please enter your password", setPassword)}
            {newUserInputs("Please enter your businesses number", setPhoneNumber)}

            <div
                id="businessOperatingTimeContainer"
            >
                {operatingTimeContainer("Please enter your businesses opening time", setOpeningTime, openingTime)}
                {operatingTimeContainer("Please enter your businesses closing time", setClosingTime, closingTime)}
            </div>

            <div
                id="signUpLocationContainer"
            >
                {newUserInputs("Please enter your building number", setBuildingNumber)}
                {newUserInputs("Please enter your street name", setStreetName)}
                {newUserInputs("Please enter your businesses Post Code", setPostCode)}
                {locationInputs(sortCountries, countryId, setCountryId, "COUNTRY")}
                {locationInputs(filteredStates, stateId, setStateId, "STATE/PREFECTURE/COUNTY")}
                {locationInputs(filteredCities, cityId, setCityId, "CITY")}
                {locationInputs(filteredBoroughs, boroughId, setBoroughId, "BOROUGH")}
                {locationInputs(filteredNeighbourhoods, neighbourhoodId, setNeighbourhoodId, "NEIGHBOURHOOD")}
            </div>

            <div
                id="signUpButtonContainer"
                style={{marginBottom: "20px"}}
            >
                <button
                    onClick={() => setAccountType()}
                    id="signUpButtons"
                    className="cancelSignUp"
                >
                    Back
                </button>

                <button
                    id="signUpButtons"
                    className="signUp"
                    type="submit"
                >
                    Sign Up
                </button>
            </div>
        </form>
    )
}