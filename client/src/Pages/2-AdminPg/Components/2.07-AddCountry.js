
import { useState } from "react";
import "./2.07-AddCountry.css";

export default function AddCountry({
    allCountries,
    setAllCountries,
    setAddCountry,
    allContinents,
    appData,
    setAddCountryPg,
    addCountryPg
}) {
    const [countryName, setCountryName] = useState();
    const [countryImg, setCountryImg] = useState();
    const [countrySafety, setCountrySafety] = useState("");
    const [countryInfo, setCountryInfo] = useState();
    const [countryFlag, setCountryFlag] = useState();
    const [countryPassport, setCountryPassport] = useState();

    
    const renderCountryInput = (info, setVariable) => {
        return (
            <input
                placeholder={info}
                onChange={(e) => setVariable(e.target.value)}
                className="newCountryInput"
            />
        );
    };

    const safetyOptions = ["Safe", "Use Caution", "Not Safe"];

    const handleNewCountry = (e) => {
        e.preventDefault();
    
        const jsonData = {
            countryName,
            countryImg,
            countrySafety,
            countryInfo,
            countryFlag,
            countryPassport,
        };
    
        // First POST request: Add new country
        fetch("/countries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        })
            .then((r) => r.json())
            .then((newCountry) => {
                setAllCountries([...allCountries, newCountry]);
                setAddCountryPg(addCountryPg + 1)
            }
        )}        
        
    

    return (
        <div id="popUpBackground">
            <div id="addNewCountry">
                <h1>Add New Country</h1>

                {renderCountryInput("Enter country name", setCountryName)}
                {renderCountryInput("Enter country's image URL", setCountryImg)}
                {renderCountryInput("Enter country's flag URL", setCountryFlag)}
                {renderCountryInput("Enter country's passport stamp URL", setCountryPassport)}

                {/* Safety Level Dropdown */}
                <select
                    value={countrySafety}
                    onChange={(e) => setCountrySafety(e.target.value)}
                    className="newCountrySafety"
                >
                    <option value="" disabled>
                        Please select country's safety level
                    </option>
                    {safetyOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                

                <textarea
                    placeholder="Enter some information on the new country."
                    onChange={(e) => setCountryInfo(e.target.value)}
                    className="newCountryInfo"
                />

                <div>
                    <button
                        onClick={(e) => handleNewCountry(e)}
                    >
                        Next
                    </button>

                    <button
                        onClick={() => setAddCountry(false)}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
}
