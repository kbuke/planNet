import { useOutletContext } from "react-router-dom"
import SignUpPg from "../1-SignUp/1-SignUpPg"
import InitialSignIn from "../1.5-InitialSignIn/1.5-InitialSignIn"
import Feed from "../3-Feed/Feed"
import { useEffect, useState } from "react"

export default function Route(){
    const appData = useOutletContext()

    const allUsers = appData.allUsers

    const [specificUser, setSpecificUser] = useState([])

    //See if there is a logged in user
    const loggedUser = appData.loggedUser

    useEffect(() => {
        setSpecificUser(allUsers.filter(user => user.id === loggedUser.id))
    }, [allUsers])

    const handleLogUser = specificUser[0]

    console.log(handleLogUser)

    return(
        <>
            {!handleLogUser ?
                <SignUpPg />
                :
                handleLogUser && !handleLogUser.initial_signin ?
                <InitialSignIn 
                    loggedUser={handleLogUser}
                />
                :
                <Feed />
            }
        </>
    )
}