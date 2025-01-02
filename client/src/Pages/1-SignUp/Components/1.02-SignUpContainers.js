
import { useEffect, useState } from "react"
import "./1.02-SignUpContainers.css"

export default function SignUpContainers({
    signUpContainers, 
    logInSignUp,
    toggleArrows,
    renderLogo,
    pgCount
}){
    console.log(`remainder is ${2 % 2}`)
    console.log(`I am on page ${pgCount}`)

    const [allContainers, setAllContainers] = useState([])

    useEffect(() => (
        setAllContainers(signUpContainers.map(container => container))
    ), [signUpContainers])

    const renderContainers = allContainers.map((container, index) => (
        pgCount === container.id ?
            <div
                id="specificSignUpContainer"
                style={{
                    backgroundImage: `url(${container.background_image})`
                }}
            >
                <div
                    id="containerText"
                >
                    <h1>{container.title}</h1>

                    {container.text.split("\n").map((line, index) => (
                        <p key={index}>
                            {line}
                        </p>
                    ))}
                </div>
            </div>
        :
            null
    ))

    return(
        <>
            {renderContainers}
            {logInSignUp()}
            {toggleArrows()}
            {renderLogo()}
        </>
    )
}