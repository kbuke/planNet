import { useState } from "react";

export default function EditAdminStatus({
    userId,
    setUserId,
    userPosition,
    setUserPosition,
    allUsers,
    setAllUsers,
    setEditPosition
}) {

    console.log(`I am editing user ${userId} who is an ${userPosition}`)

    const handleEditAdminStatus = (e) => {
        e.preventDefault();

        const newPosition = userPosition !== "Admin" ? "Admin" : "Traveler";

        fetch(`/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                account_type: newPosition, // Use the updated position directly
            }),
        })
            .then((r) => {
                if (r.ok) {
                    return r.json();
                } else {
                    console.error("Failed to update user");
                    return null;
                }
            })
            .then((newAdminPosition) => {
                if (newAdminPosition) {
                    setAllUsers(
                        allUsers.map((oldUserInfo) =>
                            oldUserInfo.id === newAdminPosition.id
                                ? newAdminPosition
                                : oldUserInfo
                        )
                    );
                    setUserPosition(newAdminPosition.account_type); // Update the parent state with the new account type
                }
            })
            .then(() => {setEditPosition(false); setUserId()})
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div id="popUpBackground">
            <form id="editUserAdminStatus" onSubmit={(e) => handleEditAdminStatus(e)}>
                <div>
                    <button type="submit">Make Changes</button>

                    <button
                        type="button"
                        onClick={() => {
                            setEditPosition(false);
                            setUserId()
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
