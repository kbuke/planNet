import { useState } from "react"



export default function AddCities({
    setAddCity,
    stateId,
    allCities,
    setAllCities
}){

    const [cityName, setCityName] = useState("")
    const [cityImg, setCityImg] = useState("")
    const [cityIntro, setCityIntro] = useState("")
    const [countryCapital, setCountryCapital] = useState("")
    const [stateCapital, setStateCapital] = useState("")

    console.log(`I am adding city ${cityName}`)

    const newCityInput = (inputTitle, setInputVariable) => {
        return(
            <div>
                <p>
                    {inputTitle}
                </p>

                <input 
                    onChange={(e) => setInputVariable(e.target.value)}
                    className="adminAddStateBoroughNeigbourhoodInput"
                />
            </div>
        )
    }

    const dropDownOptions = ["Yes", "No"]

    const newCityOptions = (labelHeading, variable, setVariable) => {
        return(
            <div>
                <p>{labelHeading}</p>

                <select
                    value={variable}
                    onChange={(e) => setVariable(e.target.value)}
                >
                    <option
                        value="" disabled
                    >
                        {labelHeading}
                    </option>

                    {dropDownOptions.map((option, index) => (
                        <option
                            key={index}
                        >
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        )
    }

    const handleNewCity = (e) => {
        e.preventDefault()
        const jsonData = {
            cityName, 
            cityImg,
            cityIntro,
            stateCapital: stateCapital==="Yes" ? true : false,
            countryCapital: countryCapital==="Yes" ? true : false,
            stateId
        }

        fetch("/cities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
        .then((r) => r.json())
        .then((newCity) => {
            setAllCities([...allCities, newCity])
        })
        .then(setAddCity(false))
    }
    return(
        <div
            id="popUpBackground"
        >
            <form
                id="adminAddLocationContainer"
                onSubmit={(e) => handleNewCity(e)}
            >
                <h1>Add City</h1>

                {newCityInput("Enter City Name", setCityName)}
                {newCityInput("Enter City Image", setCityImg)}

                <div>
                    <p>Enter intro about city</p>
                    <textarea 
                        onChange={(e) => setCityIntro(e.target.value)}
                        className="adminLocationTextArea"
                    />
                </div>

                {newCityOptions("Is this the capital of the country?", countryCapital, setCountryCapital)}

                {newCityOptions("Is this the state capital", stateCapital, setStateCapital)}

                <div
                    className="adminAddLocationButtonContainer"
                >
                    <button
                        className="adminAddLocationButtons"
                        type="submit"
                    >
                        Create City
                    </button>

                    <button
                        className="adminAddLocationButtons"
                        style={{backgroundColor: "red"}}
                        onClick={() => setAddCity(false)}
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    )
}