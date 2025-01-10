
import BusinessTypes from "./1.61-BusinessTypes"
import TravelerInfoPicture from "../1.54-TravelerIntroPicture"

export default function BusinessSignIn({
    loggedUser,
    appData,
}){
    const allUsers = appData.allUsers
    return(
        <div
            id="userInitialInfoContainer"
        >
            <BusinessTypes 
                appData={appData}
                loggedUser={loggedUser}
            /> 

            <TravelerInfoPicture 
                loggedUser={loggedUser}
                appData={appData}
            /> 
        </div>
    )
}