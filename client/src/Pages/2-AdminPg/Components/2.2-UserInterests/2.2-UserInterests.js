import { useEffect, useState } from "react";

import "./2.2-UserInterests.css"

import { CiCirclePlus } from "react-icons/ci";
import AddInterests from "./2.73-AddInterests";

export default function UserInterests({
    appData
}){
    const [selectInterests, setSelectInterests] = useState([])
    const [addInterest, setAddInterest] = useState(false)

    const allInterests = appData.allInterests
    const setAllInterests = appData.setAllInterests

    useEffect(() => {
        const sortInterestNames = allInterests.sort((a, b) => a.interest.localeCompare(b.interest))
        setSelectInterests(sortInterestNames)
    }, [allInterests])

    console.log(selectInterests)

    const renderInterests = selectInterests.map((interest, index) => (
        <div
            id="interestContainer"
            key={index}
        >
            <img 
                src={interest.image}
                className="interestImg"
            />

            <div>
                <h2>{interest.interest}</h2>
            </div>
        </div>
    ))

    return(
        <div>
            <div
                id="adminAddInterestsOption"
            >
                <h1>Available User Interests</h1>

                <CiCirclePlus 
                    className="adminAddInterestButton"
                    onClick={() => setAddInterest(true)}
                />
            </div>

            <div
                id="adminInterestGrid"
            >
                {renderInterests}
            </div>

            {
                addInterest ?
                    <AddInterests 
                        allInterests={allInterests}
                        setAllInterests={setAllInterests}
                        setAddInterest={setAddInterest}
                    />
                :
                    null
            }
        </div>
    )
}