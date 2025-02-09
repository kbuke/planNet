import { useOutletContext } from "react-router-dom"
import SignUpPg from "../1-SignUp/1-SignUpPg"
import InitialSignIn from "../1.5-InitialSignIn/1.5-InitialSignIn"
import Feed from "../3-Feed/Feed"

export default function Route(){
    const appData = useOutletContext()

    //See if there is a logged in user
    const loggedUser = appData.loggedUser

    return(
        <>
            {!loggedUser ?
                <SignUpPg />
                :
                loggedUser && !loggedUser.initial_signin ?
                <InitialSignIn 
                    loggedUser={loggedUser}
                />
                :
                <Feed />
            }
        </>
    )
}