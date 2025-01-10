
import { useOutletContext } from "react-router-dom"
import "./1.5-InitialSignIn.css"

import TravelerSignIn from "./Components/1.51-TravelerSignIn"
import BusinessSignIn from "./Components/BusinessSignIn/1.6-BusinessSignIn"

import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";

import { useState } from "react";

export default function InitialSignIn({
    loggedUser
}){
    console.log(loggedUser)
    const appData = useOutletContext()

    const [travelerPg, setTravelerPg] = useState(0)

    const travelerButtons = (maxDepth) => {
        return(
            <div
                id="travelButtonContainer"
            >
                {travelerPg !== 0 ?
                    <FaArrowCircleLeft 
                        onClick={() => setTravelerPg(travelerPg - 1)}
                        className="travelerArrow"
                    />
                    :
                    null 
                }

                {travelerPg === maxDepth ?
                    null
                    :
                    <FaArrowCircleRight 
                        onClick={() => setTravelerPg(travelerPg + 1)}
                        className="travelerArrow"
                    />}
            </div>
        )
    }

    return(
        <div
            id="initialSignInContainer"
            style={{
                backgroundImage: "url(https://newsroom.aaa.com/wp-content/uploads/2023/10/iStock-816320512-2048x907.jpg)"
            }}
        >
            {loggedUser.account_type === "Admin" || loggedUser.account_type === "Traveler" ?
                <TravelerSignIn 
                    appData={appData}
                    loggedUser={loggedUser}
                    travelerButtons={travelerButtons}
                    travelerPg={travelerPg}
                    setTravelerPg={setTravelerPg}
                />
                :
                <BusinessSignIn 
                    appData={appData}
                    loggedUser={loggedUser}
                />
            }
        </div>
    )
}