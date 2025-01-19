
import { useEffect, useState } from "react"
import "./2.09-AdminCountryInfo.css"

import EditCountry from "./2.10-EditCountry"

export default function AdminCountryInfo({
    countryId,
    allCountries,
    setAllCountries,
    setCountryId,
    appData,
    countryInfo,
    setCountryInfo
}){
    const [editCountry, setEditCountry] = useState(false)
    const [filterCountry, setFilterCountry] = useState()
    const [countryName, setCountryName] = useState("")
    const [countryImg, setCountryImg] = useState("")
    // const [countryInfo, setCountryInfo] = useState("")
    const [countryFlag, setCountryFlag] = useState("")
    const [countryPassportStamp, setCountryPassportStamp] = useState("")
    const [countrySafety, setCountrySafety] = useState("")
    const [countryContinents, setCountryContinents] = useState([])

    console.log(allCountries)

    useEffect(() => {
        const selectedCountry = allCountries.find(country => country.id === countryId);
        setFilterCountry(selectedCountry);
        setCountryName(selectedCountry?.name || "");
        setCountryImg(selectedCountry?.image || "");
        setCountryInfo(selectedCountry?.intro || ""); // Ensure intro defaults to an empty string
        setCountryFlag(selectedCountry?.flag || "");
        setCountryPassportStamp(selectedCountry?.passport_stamp || "");
        setCountrySafety(selectedCountry?.safety_level || "");
        setCountryContinents(selectedCountry?.continents || []);
    }, [countryId, allCountries]);
    

    console.log(countryContinents)

    return(
        <div
            id="popUpBackground"
        >
            <div
                id="adminEditCountryContainer"
            >
                <div
                    id="adminCountryImgContainer"
                    style={{backgroundImage: `url(${countryImg})`}}
                >
                    <img 
                        src={countryPassportStamp}
                        className="adminCountryPassportStamp"
                    />
                </div>

                {editCountry ?
                    <EditCountry 
                        countryId={countryId}
                        allCountries={allCountries}
                        setAllCountries={setAllCountries}
                        setEditCountry={setEditCountry}
                        countryName={countryName}
                        setCountryName={setCountryName}
                        countryImg={countryImg}
                        setCountryImg={setCountryImg}
                        countryInfo={countryInfo}
                        setCountryInfo={setCountryInfo}
                        countryFlag={countryFlag}
                        setCountryFlag={setCountryFlag}
                        countryPassportStamp={countryPassportStamp}
                        setCountryPassportStamp={setCountryPassportStamp}
                        countrySafety={countrySafety}
                        setCountrySafety={setCountrySafety}
                        countryContinents={countryContinents}
                        setCountryContinents={setCountryContinents}
                        appData={appData}
                    />
                    :
                    <div
                        id="adminSpecificCountryInfo"
                    >
                        <div
                            id="adminCountryFlag"
                        >
                            <h2>{countryName}</h2>
                            <img 
                                src={countryFlag}
                                className="adminCountryFlag"
                            />
                        </div>

                        <div
                            id="adminCountrySafetyContainer"
                        >
                            <label
                                id="adminCountrySafetyHeader"
                            >
                                Safety Level:
                            </label>
                            <p>{countrySafety}</p>
                        </div>

                        <div id="adminCountryContinents">
                            <label id="adminCountryContinentsHeader">
                                Continents:
                            </label>
                            <p>
                                {countryContinents && countryContinents.length > 0? 
                                    countryContinents.map(country => country.continent.name).join(" and ")
                                    : 
                                    "No continents available"
                                }
                            </p>
                        </div>


                        {typeof countryInfo === "string" && countryInfo ? (
                            countryInfo.split("\n").map((line, index) => (
                                <p key={index}>
                                    {line}
                                </p>
                            ))
                        ) : (
                            <p>Loading Intro...</p>
                        )}


                        <div
                            id="adminEditLocationButtonContainer"
                        >
                            <button
                                className="adminEditLocationButton"
                                onClick={() => setEditCountry(true)}
                            >
                                Edit {countryName} Info
                            </button>

                            <button
                                className="adminEditLocationButton"
                                style={{backgroundColor: "red"}}
                                onClick={() => {setCountryId(); setCountryInfo(false)}}
                            >
                                Close {countryName} Page
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}