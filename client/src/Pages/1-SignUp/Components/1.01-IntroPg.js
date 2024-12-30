import coverPhoto from "../../../assets/planNet.png"

import "./1.01-IntroPg.css"

export default function IntroPg({
    planNetLogo
}){
    return(
        <div
            className="signUpContainers"
            style={{
                backgroundImage: `url(${coverPhoto})`
            }}
        >
            <img 
                src={planNetLogo}
                alt="planNetLogo"
                className="signUpLogo"
            />
        </div>
    )
}