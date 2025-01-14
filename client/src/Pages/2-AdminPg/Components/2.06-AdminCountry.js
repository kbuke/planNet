import { useEffect, useState } from "react"

import { CiCirclePlus } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiCircleChevDown } from "react-icons/ci";

import AddCountry from "./2.07-AddCountry";
import AddCountryContinent from "./2.08-AddCountryContinent";

export default function AdminCountry({
    appData,
    allContinents
}){
    const [sortCountries, setSortCountries] = useState()
    const [hoverCountryId, setHoverCountryId] = useState()
    const [addCountry, setAddCountry] = useState(false)

    const [addCountryPg, setAddCountryPg] = useState(1)

    const allCountries = appData.allCountries
    const setAllCountries = appData.setAllCountries

    console.log(allCountries)

    useEffect(() => {
        setSortCountries(allCountries.sort((a, b) => a.name.localeCompare(b.name)))
    }, [allCountries])

    console.log(sortCountries)

    const renderCountries = sortCountries?.map((country, index) => (
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
            id="continentsContainer"
        >
            <CiCirclePlus 
                id="addNewContinent"
                style={{
                    height: "150px",
                    width: "1050px",
                    cursor: "pointer",
                }}
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
    )
}