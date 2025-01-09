
import "./4.01-LogOut.css"

export default function LogOut({
    loggedUser,
    setLoggedUser,
    setLoggingOut
}){
    const logOut = () => {
        console.log("Signing Out")
        fetch("/logout", {
            method: "DELETE"
        })
        .then(r => {
            if(r.ok){
                setLoggedUser(null)
            }
        })
    }

    return(
        <div
            id="popUpBackground"
        >
            <div
                id="signOutContainer"
            >
                <h2>Are You Sure You Want To Sign Out?</h2>

                <div
                    id="signOutButtonContainer"
                >
                    <button
                        className="signOutButton"
                        onClick={logOut}
                    >
                        Sign Out
                    </button>

                    <button
                        onClick={() => setLoggingOut(false)}
                        className="signOutButton"
                        style={{backgroundColor: "red"}}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}