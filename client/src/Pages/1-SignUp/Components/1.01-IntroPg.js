import coverPhoto from "../../../assets/planNet.png"

import "./1.01-IntroPg.css"

export default function IntroPg({
    logInSignUp,
    toggleArrows,
    renderLogo
}){
    return(
        <div
            className="signUpContainers"
            style={{
                backgroundImage: `url(${coverPhoto})`
            }}
        >
            {renderLogo()}

            {logInSignUp()}

            {toggleArrows()}
        </div>
    )
}