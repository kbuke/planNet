import { useEffect, useState } from "react"

import { CiCirclePlus } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiCircleChevDown } from "react-icons/ci";

import AddCountry from "./2.07-AddCountry";
import AddCountryContinent from "./2.08-AddCountryContinent";

import "./2.06-AdminCountry.css"

export default function AdminCountry({
    appData,
    allContinents,
    continentId
}){
    const [sortCountries, setSortCountries] = useState()
    const [hoverCountryId, setHoverCountryId] = useState()
    const [addCountry, setAddCountry] = useState(false)
    const [addCountryPg, setAddCountryPg] = useState(1)
    const [countinentName, setContinentName] = useState()
    const [filterCountries, setFilterCountries] = useState()

    const allCountries = appData.allCountries
    const setAllCountries = appData.setAllCountries

    console.log(`I have selected continent ${continentId}`)

    useEffect(() => {
        setSortCountries(allCountries.sort((a, b) => a.name.localeCompare(b.name)))
    }, [allCountries])

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
    

    console.log(filterCountries)

    //Get name of selected continent
    useEffect(() => {
        const selectedContinent = allContinents.filter(continent => continent.id === continentId);
        if (selectedContinent.length > 0) {
            setContinentName(selectedContinent[0].name);
        } else {
            // console.error("Continent not found for the given ID:", continentId);
            setContinentName(""); // Or handle this case appropriately
        }
    }, [continentId, allContinents]); // Include allContinents in the dependency array
    

    const renderCountries = filterCountries?.map((country, index) => (
        <div
            key={index}
            id="specificAdminContinentContainer"
        >
            <div
                style={{
                    backgroundImage: `url(${country.image})`
                }}
                id="adminContinentImg"
                onMouseEnter={() => setHoverCountryId(country.id)}
                onMouseLeave={() => setHoverCountryId()}
            >
                {country.id === hoverCountryId ?
                    <div
                        className="continentNameContainer"
                    >
                        <h2>
                            {country.name}
                        </h2>
                    </div>
                    :
                    null
                }
            </div>

            <div
                id="editDeleteContinentContainer"
            >
                <CiEdit 
                    className="editDeleteContinent"
                />

                <MdDeleteOutline 
                    className="editDeleteContinent"
                />

                <IoIosInformationCircleOutline 
                    className="editDeleteContinent"
                />

                <CiCircleChevDown 
                    className="editDeleteContinent"
                />
            </div>
        </div>
    ))

    return(
        <div
            id="adminCountriesOverallContainer"
        >
            <h2
                className="adminCountryTitle"
            >
                {continentId ?
                    `Countries in ${countinentName}`
                    :
                    `All Countries`
                }
            </h2>
            <div
                id="countryContainer"
            >
                <CiCirclePlus 
                    id="adminAddNewCountry"
                    onClick={() => setAddCountry(true)}
                />

                <div
                    id="adminContinentContainer"
                >
                    {renderCountries}
                </div>

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
        </div>
        </div>
    )
}