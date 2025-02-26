
import { useEffect, useState } from "react";
import "./2.03-ContinentInfo.css";

import EditContinent from "./2.04-EditContinent";
import SpecificContinentInfo from "./2.04-SpecificContinentInfo";
import AdminContinentCountries from "./2.05-AdminContinentsCountries";


export default function SpecificContinent({
    continentId,
    setContinentId,
    continentInfo,
    setContinentInfo,
    locationInfoContainer,
    handleNewLocation,
    handleNewLocationInputs,
    allStates,
    setAllStates,
    handleEditLocation,
    allContinents,
    setAllContinents,
    allCountries,
    setAllCountries
}) {
    const [specificContinent, setSpecificContinent] = useState()
    const [selectedOption, setSelectedOption] = useState("Info")

    //Fetch specific continent details
    useEffect(() => {
        fetch(`/continents/${continentId}`)
        .then(r => {
            if(r.ok){
                return r.json()
                .then(continent => {
                    setSpecificContinent(continent)
                })
            }
        })
    }, [continentId, continentInfo, allContinents])

    console.log(specificContinent)

    const continentImg = specificContinent?.image
    const continentName = specificContinent?.name
    const continentsCountries = specificContinent?.countries
    console.log(continentsCountries)

    const sortCountries = continentsCountries ? continentsCountries.sort((a, b) => a.country.name.localeCompare(b.country.name)) : []

    const countinentIntro = specificContinent?.intro

    return(
        <div
            id="popUpBackground"
        >
            {
                selectedOption==="Info" ?
                    <SpecificContinentInfo 
                        locationInfoContainer={locationInfoContainer}
                        continentImg={continentImg}
                        continentName={continentName}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        setContinentInfo={setContinentInfo}
                        setContinentId={setContinentId}
                        handleEditLocation={handleEditLocation}
                        handleNewLocationInputs={handleNewLocationInputs}
                        countinentIntro={countinentIntro}
                        continentId={continentId}
                        setAllContinents={setAllContinents}
                        allContinents={allContinents}
                    />
                :
                selectedOption==="Countries" ?
                    <AdminContinentCountries 
                        locationInfoContainer={locationInfoContainer}
                        continentImg={continentImg}
                        continentName={continentName}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        continentsCountries={continentsCountries}
                        setContinentInfo={setContinentInfo}
                        setContinentId={setContinentId}
                        handleNewLocation={handleNewLocation}
                        handleNewLocationInputs={handleNewLocationInputs}
                        allStates={allStates}
                        setAllStates={setAllStates}
                        handleEditLocation={handleEditLocation}
                        allCountries={allCountries}
                        setAllCountries={setAllCountries}
                    />
                :
                null
            }
        </div>
    )
}
