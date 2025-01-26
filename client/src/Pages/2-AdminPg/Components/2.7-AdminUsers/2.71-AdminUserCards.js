
import { useReducer, useState } from "react"
import "./2.71-AdminUserCards.css"

import { RiAdminLine } from "react-icons/ri";

import EditAdminStatus from "./2.72-EditAdminStatus";

export default function AdminUserCards({
    allUsers,
    setAllUsers,
    filteredTravelers,
}){
    const [userId, setUserId] = useState()
    const [userPosition, setUserPosition] = useState()
    const [editPosition, setEditPosition] = useState(false)
    console.log(filteredTravelers)

    console.log(`I am hovering user ${userId} who is a ${userPosition}`)

    const renderUserCard = filteredTravelers.map((user, index) => {
        console.log(`I am hovering on user ${userId}`)
        return(
            <div
                key={index}
                style={{backgroundImage: `url(${user.profile_picture.picture_route})`}}
                id="adminUserCard"
                onMouseEnter={() => setUserId(user.id)}
                onMouseLeave={() => {editPosition ? setUserId(user.id) : setUserId(null)}}
            >
                {
                    userId === user.id ?
                        <div
                            id="adminHoveredUserCard"
                        >
                            <h2>
                                {user.first_name} {user.last_name}
                            </h2>

                            <RiAdminLine 
                                className="adminUserAdminIcon"
                                id={user.account_type === "Admin" ? "adminIcon" : "noAdminIcon"}
                                onClick={() => {
                                    setEditPosition(true);
                                    setUserPosition(user.account_type);
                                    setUserId(user.id)
                                }}
                            />
                        </div>
                        :
                        null
                }
            </div>
        )
    })

    return(
        <div
            id="adminLocationReel"
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
                    />
                    :
                    null
            }
        </div>
    )
}