import { useState } from "react";
import IntroPg from "./Components/1.01-IntroPg";
import SignUpContainers from "./Components/1.02-SignUpContainers";
import SignUpForm from "./Components/1.03-SignUpContainer";
import SignIn from "./Components/1.02-SignIn/1.02-SignIn";
import { useOutletContext } from "react-router-dom";
import "./1-SignUpPg.css";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { IoLogInSharp } from "react-icons/io5";

export default function SignUpPg() {
    const [pgCount, setPgCount] = useState(0);
    const [signInVisible, setSignInVisible] = useState(false);

    const appData = useOutletContext();

    // Get logo
    const planNetLogo = appData.logo;

    // Render logo
    const renderLogo = () => {
        return <img src={planNetLogo} alt="planNetLogo" className="signUpLogo" />;
    };

    // Get sign up containers
    const signUpContainers = appData.signUpContainer;

    // Find out how many containers
    const numberContainers = signUpContainers.length;

    // Set up login and sign up containers
    const logInSignUp = () => {
        return (
            <div id="signUpLogInContainer">
                {pgCount !== numberContainers + 1 ? (
                    <div>
                        <GiArchiveRegister
                            className="signUpPgIcons"
                            onClick={() => setPgCount(numberContainers + 1)}
                        />
                        <p className="signUpPgIconText">Sign up</p>
                    </div>
                ) : null}

                <div>
                    <IoLogInSharp
                        className="signUpPgIcons"
                        onClick={() => setSignInVisible(true)} // Show the SignIn pop-up
                    />
                    <p className="signUpPgIconText">Log In</p>
                </div>
            </div>
        );
    };

    // Set up toggle arrows
    const toggleArrows = () => {
        return (
            <div id="toggleSignUpArrowsContainer">
                {pgCount === 0 ? null : (
                    <FaArrowCircleUp
                        className="signUpPgIcons"
                        onClick={() => setPgCount(pgCount - 1)}
                        style={{ backgroundColor: "white", borderRadius: "50%" }}
                    />
                )}

                {pgCount === numberContainers + 1 ? null : (
                    <FaArrowCircleDown
                        className="signUpPgIcons"
                        onClick={() => setPgCount(pgCount + 1)}
                        style={{ backgroundColor: "white", borderRadius: "50%" }}
                    />
                )}
            </div>
        );
    };

    return (
        <div id="signUpPage">
            {pgCount === 0 ? (
                <IntroPg
                    planNetLogo={planNetLogo}
                    logInSignUp={logInSignUp}
                    toggleArrows={toggleArrows}
                    renderLogo={renderLogo}
                />
            ) : pgCount !== 0 && pgCount < numberContainers + 1 ? (
                <SignUpContainers
                    signUpContainers={signUpContainers}
                    logInSignUp={logInSignUp}
                    toggleArrows={toggleArrows}
                    renderLogo={renderLogo}
                    pgCount={pgCount}
                />
            ) : pgCount === numberContainers + 1 ? (
                <SignUpForm
                    toggleArrows={toggleArrows}
                    renderLogo={renderLogo}
                    logInSignUp={logInSignUp}
                    appData={appData}
                />
            ) : null}

            {/* SignIn pop-up */}
            {signInVisible && (
                <div
                    id="signInOverlay"
                    // onClick={() => setSignInVisible(false)} // Close the pop-up on overlay click
                >
                    <SignIn 
                        setSignInVisible={setSignInVisible}
                        appData={appData}
                    />
                </div>
            )}
        </div>
    );
}
