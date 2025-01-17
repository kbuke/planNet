
import { useEffect, useState } from "react"
import "./2.09-AdminCountryInfo.css"

import EditCountry from "./2.10-EditCountry"

export default function AdminCountryInfo({
    countryId,
    allCountries,
    setAllCountries,
    setCountryId
}){
    const [editCountry, setEditCountry] = useState(false)
    const [filterCountry, setFilterCountry] = useState()
    const [countryName, setCountryName] = useState("")
    const [countryImg, setCountryImg] = useState("")
    const [countryInfo, setCountryInfo] = useState("")
    const [countryFlag, setCountryFlag] = useState("")
    const [countryPassportStamp, setCountryPassportStamp] = useState("")
    const [countrySafety, setCountrySafety] = useState("")

    console.log(allCountries)

    useEffect(() => {
        setFilterCountry(allCountries.find(country => country.id === countryId))
        setCountryName(filterCountry?.name)
        setCountryImg(filterCountry?.image)
        setCountryInfo(filterCountry?.intro)
        setCountryFlag(filterCountry?.flag)
        setCountryPassportStamp(filterCountry?.passport_stamp)
        setCountrySafety(filterCountry?.safety_level)
    }, [countryId, filterCountry])

    console.log(countryName)

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

                        {countryInfo ? (
                            countryInfo.split("\n").map((line, index) => (
                                <p
                                    key={index}
                                >
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
                                onClick={() => setCountryId()}
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