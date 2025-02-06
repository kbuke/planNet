import { useOutletContext } from "react-router-dom"

import "./2-AdminPg.css"

import AdminUsers from "./Components/2.7-AdminUsers/2.7-AdminUsers"
import Locations from "./Components/2.1-Locations/2.01-Locations"
import UserInterests from "./Components/2.2-UserInterests/2.2-UserInterests"

import { useState } from "react"

export default function AdminPg(){
    const appData = useOutletContext()

    const wallpaper = "https://i.ibb.co/pn8Vz09/Untitled-design-2.png"

    const [chosenAdminSection, setChosenAdminSection] = useState("Users")

    const adminSection = ["Users", "User Interestes", "Businesses", "Industries", "Locations"]

    const renderAdminSections = adminSection.map((option, index) => (
        <button
            key={index}
            onClick={() => setChosenAdminSection(option)}
            id={option === chosenAdminSection ? "selectedAdminOption" : "unselectedAdminOption"}
        >
            {option}
        </button>
    ))
    
    return(
        <div
            // style={{
            //     backgroundImage: `url(${wallpaper})`
            // }}
            id="adminPgOverallContainer"
        >
            <h1>Admin Page</h1>

            <div
                id="adminOptionConainers"
            >
                {renderAdminSections}
            </div>

            {
                chosenAdminSection === "Users" ?
                    <AdminUsers 
                        appData={appData}
                    />
                :
                chosenAdminSection === "Locations" ? 
                    <Locations 
                        appData={appData}
                    />
                :
                chosenAdminSection === "User Interestes" ?
                    <UserInterests 
                        appData={appData}
                    />
                :
                null
            }
        </div>
    )
}