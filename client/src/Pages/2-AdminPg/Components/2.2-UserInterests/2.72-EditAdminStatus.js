import { useNavigate } from "react-router-dom";

export default function EditAdminStatus({
    userId,
    setUserId,
    userPosition,
    setUserPosition,
    allUsers,
    setAllUsers,
    setEditPosition,
    userName,
    loggedUser,
    setLoggedUser, // State setter for loggedUser
}) {
    const navigate = useNavigate();

    const handleEditAdminStatus = async (e) => {
        e.preventDefault();

        const newPosition = userPosition !== "Admin" ? "Admin" : "Traveler";

        try {
            const response = await fetch(`/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    account_type: newPosition,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update user");
            }

            const updatedUser = await response.json();

            // Update allUsers state
            setAllUsers(
                allUsers.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                )
            );

            // Update userPosition
            setUserPosition(updatedUser.account_type);

            // Check if the logged user is being updated
            if (loggedUser.id === updatedUser.id) {
                setLoggedUser((prev) => ({
                    ...prev,
                    account_type: updatedUser.account_type,
                }));

                // If loggedUser's account type becomes "Traveler", navigate to home page
                if (updatedUser.account_type === "Traveler") {
                    navigate("/");
                }
            }

            // Close the edit modal and clear userId
            setEditPosition(false);
            setUserId(null);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div id="popUpBackground">
            <form id="editUserAdminStatus" onSubmit={handleEditAdminStatus}>
                <h1>
                    Edit {userName}'s Status to{" "}
                    {userPosition === "Admin" ? "Traveler" : "Admin"}
                </h1>
                <div>
                    <button type="submit">Make Changes</button>
                    <button
                        type="button"
                        onClick={() => {
                            setEditPosition(false);
                            setUserId(null);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}


