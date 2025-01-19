import { useEffect, useState } from "react"

import { CiCirclePlus } from "react-icons/ci";

import AddCountry from "./2.07-AddCountry";
import AddCountryContinent from "./2.08-AddCountryContinent";

import "./2.06-AdminCountry.css"
import AdminCountryInfo from "./2.09-AdminCountryInfo";

export default function AdminCountry({
    appData,
    allContinents,
    continentId,
    countryId,
    setCountryId,
    countryInfo,
    setCountryInfo,
    renderLocationContainers, 
    locationReelContainer,
    setStateId
}){
    const [sortCountries, setSortCountries] = useState()
    const [hoverCountryId, setHoverCountryId] = useState()
    const [addCountry, setAddCountry] = useState(false)
    const [addCountryPg, setAddCountryPg] = useState(1)
    const [countinentName, setContinentName] = useState()
    const [filterCountries, setFilterCountries] = useState()
    const [searchCountries, setSearchCountries] = useState("")

    const allCountries = appData.allCountries
    const setAllCountries = appData.setAllCountries
    const continentsCountries = appData.continentsCountries

    useEffect(() => {
        setSortCountries(allCountries.sort((a, b) => a.name.localeCompare(b.name)))
    }, [allCountries, continentsCountries])

    useEffect(() => {
        if (continentId) {
            setFilterCountries(
                sortCountries?.filter(country =>
                    country.continents.some(continent => continent.continent_id === continentId)
                )
            );
        } else {
            setFilterCountries(sortCountries);
        }
    }, [continentId, sortCountries]);
    

    //Get name of selected continent
    useEffect(() => {
        const selectedContinent = allContinents.filter(continent => continent.id === continentId);
        if (selectedContinent.length > 0) {
            setContinentName(selectedContinent[0].name);
        } else {
            setContinentName(""); // Or handle this case appropriately
        }
    }, [continentId, allContinents]); // Include allContinents in the dependency array

    return(
        <div>
            {
                locationReelContainer(
                    continentId ? `Countries in ${countinentName}` : `All Countries`,
                    "Search Countries", setSearchCountries, renderLocationContainers, filterCountries,
                    setHoverCountryId, hoverCountryId, setCountryId, countryId, setCountryInfo, countryInfo, setAddCountry, setStateId
                )
            }

            {addCountry && addCountryPg===1 ?
                <AddCountry 
                    allCountries={allCountries}
                    setAllCountries={setAllCountries}
                    setAddCountry={setAddCountry}
                    allContinents={allContinents}
                    appData={appData}
                    setAddCountryPg={setAddCountryPg}
                    addCountryPg={addCountryPg}
                />
                :
                null
            }

            {addCountry && addCountryPg===2 ?
                <AddCountryContinent 
                    appData={appData}
                    setAddCountryPg={setAddCountryPg}
                />
                :
                null
            }

            {countryId && countryInfo ?
                <AdminCountryInfo 
                    countryId={countryId}
                    setCountryId={setCountryId}
                    allCountries={allCountries}
                    setAllCountries={setAllCountries}
                    appData={appData}
                    countryInfo={countryInfo}
                    setCountryInfo={setCountryInfo}
                />
                :
                null
            }
        </div>
    )
}