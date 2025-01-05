
import { useOutletContext } from "react-router-dom"
import "./1.5-InitialSignIn.css"

import TravelerSignIn from "./Components/1.51-TravelerSignIn"

export default function InitialSignIn({
    loggedUser
}){
    console.log(loggedUser)
    const appData = useOutletContext()

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
                />
                :
                null
            }
        </div>
    )
}