import { useEffect, useState } from "react"
import "./1.03-SignUpContainer.css"

import TravelerSignUp from "./1.04-TravelerSignUp"
import BusinessSignUp from "./1.05-BusinessSignUp"

export default function SignUpForm({
    toggleArrows,
    renderLogo,
    logInSignUp,
    appData
}){
    //States for both
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [accountType, setAccountType] = useState()
    const [countryId, setCountryId] = useState("")
    const [stateId, setStateId] = useState()
    const [cityId, setCityId] = useState()
    const [boroughId, setBoroughId] = useState()
    const [neighbourhoodId, setNeighbourhoodId] = useState()

    //Other states
    const [sortCountries, setSortCountries] = useState([])
    const [filteredStates, setFilteredStates] = useState([])
    const [filteredCities, setFilteredCities] = useState([])
    const [filteredBoroughs, setFilteredBoroughs] = useState([])
    const [filteredNeighbourhoods, setFilteredNeighbourhoods] = useState([])
    const [newSignUp, setNewSignUp] = useState(false)

    //Set available account types
    const accountTypes = ["Traveler", "Business"]

    //Render Account types
    const renderTypes = accountTypes.map((type, index) => (
        <button
            key={index}
            className={type==="Business" ? "businessType" : "travelerType"}
            onClick={() => setAccountType(type)}
        >
            {type}
        </button>
    ))

    //Show all countries
    const allCountries = appData.allCountries

    useEffect(() => (
        setSortCountries(allCountries.sort((a, b) => b.name - a.name))
    ), [allCountries])

    //Show all states
    const allStates = appData.allStates

    useEffect(() => (
        setFilteredStates(countryId ? allStates.filter(state => state.country_id == countryId) : [])
    ), [allStates, countryId, stateId])

    //Show all cities
    const allCities = appData.allCities 

    useEffect(() => (
        setFilteredCities(stateId ? allCities.filter(city => city.states_id == stateId) : [])
    ), [allCities, stateId, countryId])

    console.log(filteredStates)

    //Show all boroughs
    const allBoroughs = appData.allBoroughs

    useEffect(() => (
        setFilteredBoroughs(cityId ? allBoroughs.filter(borough => borough.cities_id == cityId) : [])
    ), [allBoroughs, boroughId, stateId, countryId, cityId])

    //Show all neighbourhoods
    const allNeighbourhoods = appData.allNeighbourhoods

    useEffect(() => (
        setFilteredNeighbourhoods(boroughId ? allNeighbourhoods.filter(neighbourhood => neighbourhood.boroughs_id == boroughId) : [])
    ), [allNeighbourhoods, neighbourhoodId, boroughId, stateId, countryId, cityId])

    console.log(filteredNeighbourhoods)

    //Create input options for countries, states, boroughs, and neighbourhoods
    const locationInputs = (locations, variable, setVariable, locationText) => {
        const renderLocations = locations.map((location, index) => (
            <option
                key={index}
                value={location.id} 
            >
                {location.name} 
            </option>
        ));
        return (
            <div>
                <select
                    value={variable} 
                    onChange={(e) => setVariable(e.target.value)} 
                    className="signUpLocationSelectBox"
                >
                    <option value="" disabled>
                        {accountType === "Traveler" 
                            ? `Please select the ${locationText} you are from.`
                            : `Please select the ${locationText} your business is from`}
                    </option>
                    {renderLocations}
                </select>
            </div>
        );
    };
    
    

    //Create input function
    const newUserInputs = (labelText, setVariable) => {
        return(
            <div
                id="newUserSignUpContainer"
            >
                <label
                    id="newUserSignUpLabel"
                >
                    {labelText}
                </label>

                <input 
                    onChange={(e) => setVariable(e.target.value)}
                    className="signUpInput"
                />
            </div>
        )
    }

    return(
        <div
            id="signUpContainer"
            style={{ backgroundImage: `url('https://i.ibb.co/wRHgyt3/KDB7456-min.jpg')` }}

        >
            {renderLogo()}
            {toggleArrows()}
            {logInSignUp()}

            {newSignUp ?
                <div
                    id="signUpConfirmedContainer"
                >
                    <h2>You have signed up</h2>
                </div>
                :

                <div
                    id={accountType ? "signUpForm" : "unChosenSignUpForm"}
                >
                    <h2
                        style={{color: "white", marginBottom: "0px"}}
                    >Sign Up to Plan-Net</h2>

                    {!accountType ?
                        <>
                            <p>Please choose the type of account you wish to create</p>

                            <div
                                className="accountTypeContainer"
                            >
                                {renderTypes}
                            </div>
                        </>
                        :
                        accountType === "Traveler"?
                            <TravelerSignUp 
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                accountType={accountType}
                                countryId={countryId}
                                setCountryId={setCountryId}
                                newUserInputs={newUserInputs}
                                locationInputs={locationInputs}
                                sortCountries={sortCountries}
                                filteredStates={filteredStates}
                                stateId={stateId}
                                setStateId={setStateId}
                                filteredCities={filteredCities}
                                cityId={cityId}
                                setCityId={setCityId}
                                filteredBoroughs={filteredBoroughs}
                                boroughId={boroughId}
                                setBoroughId={setBoroughId}
                                filteredNeighbourhoods={filteredNeighbourhoods}
                                neighbourhoodId={neighbourhoodId}
                                setNeighbourhoodId={setNeighbourhoodId}
                                appData={appData}
                                setAccountType={setAccountType}
                                setNewSignUp={setNewSignUp}
                            />
                        :
                            <BusinessSignUp 
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                accountType={accountType}
                                setAccountType={setAccountType}
                                countryId={countryId}
                                setCountryId={setCountryId}
                                stateId={stateId}
                                setStateId={setStateId}
                                cityId={cityId}
                                setCityId={setCityId}
                                boroughId={boroughId}
                                setBoroughId={setBoroughId}
                                neighbourhoodId={neighbourhoodId}
                                setNeighbourhoodId={setNeighbourhoodId}
                                setNewSignUp={setNewSignUp}
                                sortCountries={sortCountries}
                                filteredStates={filteredStates}
                                filteredCities={filteredCities}
                                filteredBoroughs={filteredBoroughs}
                                filteredNeighbourhoods={filteredNeighbourhoods}
                                locationInputs={locationInputs}
                                newUserInputs={newUserInputs}
                                appData={appData}
                            /> 
                    }
                </div>
            }
        </div>
    )
}