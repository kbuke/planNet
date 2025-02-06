
import { useEffect, useState } from "react";

import AdminUserCards from "./2.71-AdminUserCards";
import EditAdminStatus from "../2.2-UserInterests/2.72-EditAdminStatus";

export default function AdminUsers({ appData }) {
    const [travelers, setTravelers] = useState([]); // Stores the original list of travelers
    const [filteredTravelers, setFilteredTravelers] = useState([]); // Stores the filtered list of travelers

    const allUsers = appData.allUsers;
    const setAllUsers = appData.setAllUsers

    const loggedUser = appData.loggedUser
    const setLoggedUser = appData.setLoggedUser

    useEffect(() => {
        // Initialize travelers with the data from appData when the component mounts
        const allTravelers = allUsers.filter(user => user.account_type === "Admin" || user.account_type === "Traveler")
        setTravelers(allTravelers);
        setFilteredTravelers(allTravelers);
    }, [allUsers]);

    const handleFilterChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();

        // Filter the travelers based on the input value
        const filtered = travelers.filter((traveler) => {
            const travelerName = `${traveler.first_name} ${traveler.last_name}`.toLowerCase();
            return travelerName.includes(searchTerm);
        });

        setFilteredTravelers(filtered);
    };

    return (
        <div id="adminLocationReelContainer">
            <div id="adminLocationHeader">
                <h1 id="adminLocationTitle">Registered Users</h1>

                <input
                    onChange={handleFilterChange}
                    placeholder="Filter users"
                    id="adminLocationSearchBar"
                />
            </div>

            <AdminUserCards 
                allUsers={allUsers}
                setAllUsers={setAllUsers}
                filteredTravelers={filteredTravelers}
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}
            />
            
        </div>
    );
}
