import { useState } from "react"

import IntroPg from "./Components/1.01-IntroPg"
import SignUpContainers from "./Components/1.02-SignUpContainers"
import SignUpForm from "./Components/1.03-SignUpContainer"

import { useOutletContext } from "react-router-dom"

import "./1-SignUpPg.css"

import { FaArrowCircleDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { IoLogInSharp } from "react-icons/io5";

export default function SignUpPg(){
    const [pgCount, setPgCount] = useState(0)

    const appData = useOutletContext()

    //get logo
    const planNetLogo = appData.logo

    //render logo
    const renderLogo = () => {
        return(
            <img 
                src={planNetLogo}
                alt="planNetLogo"
                className="signUpLogo"
            />
        )
    }

    //get sign up containers
    const signUpContainers = appData.signUpContainer

    //find out how many containers
    const numberContainers = signUpContainers.length

    console.log(`there are ${numberContainers}`)

    //Set up login and sign up containers
    const logInSignUp = () => {
        return(
            <div
                id="signUpLogInContainer"
            >
                {pgCount !== numberContainers + 1 ?
                    <div>
                        <GiArchiveRegister 
                            className="signUpPgIcons"
                            onClick={() => setPgCount(numberContainers + 1)}
                        />
                        <p
                            className="signUpPgIconText"
                        >
                            Sign up
                        </p>
                    </div>
                    :
                    null 
                }

                <div>
                    <IoLogInSharp 
                        className="signUpPgIcons"
                    />
                    <p
                        className="signUpPgIconText"
                    >
                        Log In
                    </p>
                </div>
            </div>
        )
    }

    //Set up toggle arrows
    const toggleArrows = () => {
        return(
            <div
                id="toggleSignUpArrowsContainer"
            >
                {pgCount === 0?
                    null
                    :
                    <FaArrowCircleUp 
                        className="signUpPgIcons"
                        onClick={() => setPgCount(pgCount - 1)}
                        style={{backgroundColor: "white", borderRadius: "50%"}}
                    />
                }

                {pgCount === numberContainers + 1 ?
                    null 
                    :
                    <FaArrowCircleDown 
                        className="signUpPgIcons"
                        onClick={() => setPgCount(pgCount + 1)}
                        style={{backgroundColor: "white", borderRadius: "50%"}}
                    />
                }
            </div>
        )
    }

    console.log(`the number of containers is ${numberContainers + 2}, and i am currently on page ${pgCount}`)

    return(
        <div
            id="signUpPage"
        >
            {pgCount === 0 ?
                <IntroPg 
                    planNetLogo={planNetLogo}
                    logInSignUp={logInSignUp}
                    toggleArrows={toggleArrows}
                    renderLogo={renderLogo}
                />
                :
                pgCount !== 0 && pgCount < numberContainers + 1 ?
                    <SignUpContainers 
                        signUpContainers={signUpContainers}
                        logInSignUp={logInSignUp}
                        toggleArrows={toggleArrows}
                        renderLogo={renderLogo}
                        pgCount={pgCount}
                    />
                :
                pgCount === numberContainers + 1 ?
                    <SignUpForm 
                        toggleArrows={toggleArrows}
                        renderLogo={renderLogo}
                        logInSignUp={logInSignUp}
                        appData={appData}
                    />
                :
                null
            }
        </div>
    )
}