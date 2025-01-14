import { useEffect, useState } from "react"

import "./2.01-AdminContinents.css"

import AddContinent from "./2.02-AddContinent";
import EditContinent from "./2.03-EditContinent";
import AdminCountry from "./2.06-AdminCountry";

import { CiCirclePlus } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiCircleChevDown } from "react-icons/ci";

export default function AdminContinents({
    appData,
    setContinentId,
    allContinents,
    setAllContinents
}){
    const [sortContinents, setSortContinents] = useState([])
    const [hoveredContinent, setHoveredContinent] = useState()
    const [addContinent, setAddContinent] = useState(false)
    const [editContinent, setEditContinent] = useState(false)
    const [continentsCountries, setContinentsCountries] = useState()

    console.log(allContinents)

    useEffect(() => {
        setSortContinents(allContinents.sort((a, b) => a.name.localeCompare(b.name)))
    }, [allContinents])

    console.log(sortContinents)

    const renderContinents = sortContinents.map((continent, index) => (
        <div
            key={index}
            id="specificAdminContinentContainer"
            onMouseEnter={() => setHoveredContinent(continent.id)}
            onMouseLeave={() => setHoveredContinent()}
        >
            <div
                style={{
                    backgroundImage: `url(${continent.image})`
                }}
                id="adminContinentImg"
                onMouseEnter={() => setHoveredContinent(continent.id)}
                onMouseLeave={() => setHoveredContinent()}
            >
                {continent.id === hoveredContinent ?
                    <div
                        className="continentNameContainer"
                    >
                        <h2>
                            {continent.name}
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
                    onClick={() => setEditContinent(true)}
                />

                <MdDeleteOutline 
                    className="editDeleteContinent"
                />

                <IoIosInformationCircleOutline 
                    className="editDeleteContinent"
                />

                <CiCircleChevDown 
                    className="editDeleteContinent"
                    onClick={() => setContinentsCountries(continent.id)}
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
                onClick={() => setAddContinent(true)}
            />
            <div
                id="adminContinentContainer"
            >
                {renderContinents}
            </div>

            {addContinent ? 
                <AddContinent 
                    allContinents={allContinents}
                    setAllContinents={setAllContinents}
                    setAddContinent={setAddContinent}
                />
                :
                null
            }

            {editContinent ?
                <EditContinent 
                    setEditContinent={setEditContinent}
                />
                :
                null
            }
        </div>
    )
}