import { useState } from "react"
import IntroPg from "./Components/1.01-IntroPg"
import { useOutletContext } from "react-router-dom"

import { FaArrowCircleDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { IoLogInSharp } from "react-icons/io5";

export default function SignUpPg(){
    const [pgCount, setPgCount] = useState(0)

    const appData = useOutletContext()

    //get logo
    const planNetLogo = appData.logo

    //create icon array
    const signUpIcons = [FaArrowCircleDown, FaArrowCircleUp, GiArchiveRegister, IoLogInSharp]

    //create navigation bar @ bottom of page
    const bottomNav = 
        <div>
            {signUpIcons.map((icon, index) => (
                <div
                    key={index}
                >
                    <icon />
                </div>
            ))}
        </div>

    console.log("hello world")

    return(
        <div
            id="signUpPage"
        >
            <IntroPg 
                planNetLogo={planNetLogo}
            />

            {bottomNav}
        </div>
    )
}