
import "./1.55-TravelerInfo.css"

export default function TravelerInfo({
    setNewIntro
}){
    return(
        <div
            style={{height: "50%"}}
        >
            <h2>Please Write an Introduction About Yourself.</h2>
            <textarea
                className="signUpUserInfo"
                onChange={(e) => setNewIntro(e.target.value)}
                placeholder="Please enter your intro"
            />
        </div>
    )
}