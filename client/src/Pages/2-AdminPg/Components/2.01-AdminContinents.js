import { useEffect, useState } from "react"

import "./2.01-AdminContinents.css"

import AddContinent from "./2.02-AddContinent";

import { CiCirclePlus } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function AdminContinents({
    appData
}){
    const [sortContinents, setSortContinents] = useState([])
    const [hoveredContinent, setHoveredContinent] = useState()
    const [addContinent, setAddContinent] = useState(false)

    const allContinents = appData.allContinents
    const setAllContinents = appData.setAllContinents

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
                />

                <MdDeleteOutline 
                    className="editDeleteContinent"
                />

                <IoIosInformationCircleOutline 
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
        </div>
    )
}