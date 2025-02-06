
import { useEffect, useState } from "react"
import "./1.51-TravelerSignIn.css"

import TravelerVisitedCountries from "./1.52-TravelerVisitedCountries"
import TravelerWishlistCountries from "./1.53-TravelerWishlistCountries";
import TravelerInfoPicture from "./1.54-TravelerIntroPicture";

import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";


export default function TravelerSignIn({
    appData,
    loggedUser,
    travelerButtons,
    travelerPg, 
    setTravelerPg,
    specificLoggedUser
}){
    // const [travelerPg, setTravelerPg] = useState(0)
    const [sortCountries, setSortCountries] = useState([])
    const [allVisitedCountries, setAllVisitedCountries] = useState([])
    const [hoverCountryId, setHoverCountryId] = useState()

    //Get userId
    const userId = loggedUser.id
    // const userId = specificLoggedUser.id

    return(
        <div
            id="userInitialInfoContainer"
        >
            {travelerPg === 0 ?
                <TravelerVisitedCountries 
                    appData={appData}
                    loggedUser={loggedUser}
                    travelerButtons={travelerButtons}
                    sortCountries={sortCountries}
                    setSortCountries={setSortCountries}
                    allVisitedCountries={allVisitedCountries}
                    setAllVisitedCountries={setAllVisitedCountries}
                    userId={userId}
                    hoverCountryId={hoverCountryId}
                    setHoverCountryId={setHoverCountryId}
                    specificLoggedUser={specificLoggedUser}
                />
            :
            travelerPg === 1 ?
                <TravelerWishlistCountries 
                    sortCountries={sortCountries}
                    loggedUser={loggedUser}
                    allVisitedCountries={allVisitedCountries}
                    travelerButtons={travelerButtons}
                    hoverCountryId={hoverCountryId}
                    setHoverCountryId={setHoverCountryId}
                    appData={appData}
                    userId={userId}
                />
            :
            travelerPg === 2 ?
                <TravelerInfoPicture 
                    travelerButtons={travelerButtons}
                    loggedUser={loggedUser}
                    appData={appData}
                />
            :null}
        </div>
    )
}