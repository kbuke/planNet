
import { useState } from "react"
import "./2.71-AdminUserCards.css"

import { RiAdminLine } from "react-icons/ri";

import EditAdminStatus from "../2.2-UserInterests/2.72-EditAdminStatus";

export default function AdminUserCards({
    allUsers,
    setAllUsers,
    filteredTravelers,
    loggedUser,
    setLoggedUser
}){
    const [userId, setUserId] = useState()
    const [userPosition, setUserPosition] = useState()
    const [editPosition, setEditPosition] = useState(false)
    const [userName, setUserName] = useState("")

    const renderUserCard = filteredTravelers.map((user, index) => {
        return(
            <div
                key={index}
                style={{backgroundImage: `url(${user.profile_picture.picture_route})`}}
                id="adminUserCard"
            >
                <RiAdminLine 
                    className="adminUserAdminIcon"
                    id={user.account_type === "Admin" ? "adminIcon" : "noAdminIcon"}
                    onClick={() => {
                        setEditPosition(true);
                        setUserPosition(user.account_type);
                        setUserId(user.id)
                        setUserName(`${user.first_name} ${user.last_name}`)
                    }}
                />

                <div
                    id="adminUserCardNameContainer"
                >
                    <h2>
                        {user.first_name} {user.last_name}
                    </h2>
                </div>
            </div>
        )
    })

    return(
        <div
            id="adminUserPgContainer"
        >
            {filteredTravelers.length === 0 ?
                <h1>No Users Found</h1>
                :
                renderUserCard
            }

            {
                editPosition ?
                    <EditAdminStatus 
                        userId={userId}
                        setUserId={setUserId}
                        userPosition={userPosition}
                        setUserPosition={setUserPosition}
                        allUsers={allUsers}
                        setAllUsers={setAllUsers}
                        setEditPosition={setEditPosition}
                        userName={userName}
                        loggedUser={loggedUser}
                        setLoggedUser={setLoggedUser}
                    />
                    :
                    null
            }
        </div>
    )
}