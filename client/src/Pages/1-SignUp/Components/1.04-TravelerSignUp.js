import { useEffect, useState } from "react";

import "./1.04-TravelerSignUp.css"

export default function TravelerSignUp({
    email,
    setEmail,
    password,
    setPassword,
    accountType,
    countryId,
    setCountryId,
    newUserInputs, 
    locationInputs,
    sortCountries,
    filteredStates,
    stateId,
    setStateId, 
    filteredCities,
    cityId,
    setCityId,
    filteredBoroughs,
    boroughId,
    setBoroughId,
    filteredNeighbourhoods,
    neighbourhoodId,
    setNeighbourhoodId,
    appData,
    setAccountType,
    setNewSignUp
}) {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [dob, setDob] = useState()
    const [intro, setIntro] = useState("")

    const allTravelers = appData.allTravelers
    const setAllTravelers = appData.setAllTravelers

    const handleNewTraveler = (e) => {
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
            firstName,
            lastName,
            dob,
            intro
        }
        fetch("/travelers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newTraveler => {
                setAllTravelers([...allTravelers, newTraveler])
            })
            .then(setNewSignUp(true))
            .catch(error => console.error("Error adding new traveler"))
    }

    useEffect(() => {
        // Reset stateId and cityId when countryId changes
        setStateId(""); // Reset to placeholder
        setCityId("");  // Reset to placeholder
        setBoroughId("")
        setNeighbourhoodId("")
    }, [countryId]);

    useEffect(() => {
        // Reset cityId when stateId changes
        setCityId(""); // Reset to placeholder
        setBoroughId("")
        setNeighbourhoodId("")
        setBoroughId("")
    }, [stateId, countryId]);

    useEffect(() => {
        setBoroughId("")
        setNeighbourhoodId("")
    }, [cityId, stateId, countryId])



    console.log(`I have chosen country ${countryId}, state ${stateId}, and city ${cityId}`);
    console.log(filteredCities);

    return (
        <form
            onSubmit={(e) => handleNewTraveler(e)}
        >
            <p>Hey!!! fellow Traveler, please enter your information</p>
            {newUserInputs("Please enter your email address", setEmail)}
            {newUserInputs("Please enter your password", setPassword)}
            {newUserInputs("Please enter your first name", setFirstName)}
            {newUserInputs("Please enter your last name", setLastName)}
            <p
                style={{color: "white", textAlign: "left", marginLeft: "20px", marginBottom: "0px"}}
            >
                Please enter your location
            </p>

            <div
                id="signUpLocationContainer"
            >
                {locationInputs(sortCountries, countryId, setCountryId, "COUNTRY")}
                {locationInputs(filteredStates, stateId, setStateId, "STATE/PREFECTURE/COUNTY")}
                {locationInputs(filteredCities, cityId, setCityId, "CITY")}
                {locationInputs(filteredBoroughs, boroughId, setBoroughId, "BOROUGH")}
                {locationInputs(filteredNeighbourhoods, neighbourhoodId, setNeighbourhoodId, "NEIGHBOURHOOD")}
            </div>

            <div
                id="signUpButtonContainer"
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
    );
}

