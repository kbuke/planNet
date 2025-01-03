
import { useState } from "react"
import "./1.02-SignIn.css"

export default function SignIn({
    setSignInVisible, 
    appData
}){
    const [userEmail, setUserEmail] = useState()
    const [userPassword, setUserPassword] = useState()
    const [signInError, setSignInError] = useState(false)

    const setLoggedUser = appData.setLoggedUser

    //Create a sign in container 
    const signInInputs = (category, identity, setVariable) => {
        return(
            <div
                id="signUpInputContainer"
            >
                <label>{category}</label>
                <input 
                    type={identity}
                    onChange={(e) => setVariable(e.target.value)}
                />
            </div>
        )
    }

    //Handle login 
    const handleLogin = (e) => {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userEmail, userPassword})
        }).then(r => {
            if(r.ok){
                return r.json()
            } else {
                setSignInError(true)
            }
        })
        .then(user => {
            if(user) {
                setLoggedUser(user)
            }
        })
    }

    return(
        <form
            id="popUpBackground"
            onSubmit={(e) => handleLogin(e)}
        >
            <div
                id="popUpContainer"
            >
                <h1>Sign In</h1>
                {signInInputs("Enter your UserName", "text", setUserEmail)}
                {signInInputs("Enter your Password", "password", setUserPassword)}

                {signInError ?
                    <p
                        style={{color: "red"}}
                    >
                        Error! Please ensure you entered the correct email and password
                    </p>
                    :
                    null
                }

                <div
                    id="signInButtonContainer"
                >
                    <button
                        onClick={() => setSignInVisible(false)}
                        style={{backgroundColor: "red"}}
                        className="signInButtons"
                    >
                        Back
                    </button>

                    <button
                        className="signInButtons"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </div>
        </form>
    )
}