
import { useEffect, useState } from "react"
import "./2.09-AdminCountryInfo.css"

import EditCountry from "./2.10-EditCountry"
import EditCountryContinents from "./2.11-EditCountryContinents"

export default function AdminCountryInfo({
    countryId,
    allCountries,
    setAllCountries,
    setCountryId,
    appData,
    countryInfo,
    setCountryInfo,
    infoContainer
}){
    const [editCountry, setEditCountry] = useState(false)
    const [filterCountry, setFilterCountry] = useState()
    const [countryName, setCountryName] = useState("")
    const [countryImg, setCountryImg] = useState("")
    const [countryIntro, setCountryIntro] = useState("")
    const [countryFlag, setCountryFlag] = useState("")
    const [countryPassportStamp, setCountryPassportStamp] = useState("")
    const [countrySafety, setCountrySafety] = useState("")
    const [countryContinents, setCountryContinents] = useState([])
    const [editCountryPg, setEditCountryPg] = useState(1)
    

    console.log(allCountries)

    useEffect(() => {
        const selectedCountry = allCountries.find(country => country.id === countryId);
        setFilterCountry(selectedCountry);
        setCountryName(selectedCountry?.name || "");
        setCountryImg(selectedCountry?.image || "");
        setCountryIntro(selectedCountry?.intro || ""); // Ensure intro defaults to an empty string
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
            {
                editCountryPg === 1 ?
                    infoContainer
                        (
                            countryName, setCountryName, countryImg, setCountryImg,
                            countryIntro, setCountryIntro, editCountry, 
                            setEditCountry, setCountryInfo, `countries/${countryId}`, allCountries, setAllCountries, 
                            setCountryId, countryPassportStamp, setCountryPassportStamp, countrySafety,
                            setCountrySafety, null, null, countryContinents,
                            editCountryPg, setEditCountryPg
                        )
                    :
                    <EditCountryContinents />
            }
        </div>
    )
}