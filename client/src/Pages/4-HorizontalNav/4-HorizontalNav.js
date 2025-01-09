
import "./4-HorizontalNav.css"

import LogOut from "./Components/4.01-LogOut";

import logo from "../../assets/planNetLogo.png"

import { GiWorld } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

import { useState } from "react";

export default function HorizontalNav({
    loggedUser,
    setLoggedUser
}){

    //Set state conditions
    const [searching, setSearching] = useState(false)
    const [hoverMenu, setHoverMenu] = useState("")
    const [loggingOut, setLoggingOut] = useState(false)

    const planNetLogo = () => {
        return(
            <img 
                src={logo}
                className="signedLogo"
                alt="planNet Logo"
            />
        )
    }

    console.log(`I am searching? ${searching}`)

    const navIcons = (icon, containerText, search, loggingOut) => {
        return (
            search ? (
                <div
                    className= {hoverMenu === containerText ?
                        "hoveredMenu"
                        :
                        "navIconContainer"
                    }
                    // "navIconContainer"
                    onClick={() => setSearching(true)}
                    id={searching ? "activeSearch" : ""}
                    onMouseEnter={() => setHoverMenu(containerText)}
                    onMouseLeave={() => setHoverMenu("")}
                >
                    {searching ? (
                        <>
                            <div
                                style={{ marginLeft: "5px", color: "red" }}
                                onClick={(event) => {
                                    event.stopPropagation(); // Prevent bubbling
                                    setSearching(false);
                                }}
                            >
                                {icon}
                            </div>
                            <input 
                                className="navSearchBar"
                                placeholder="Please search"
                            />
                        </>
                    ) : (
                        <>
                            {icon}
                            <p>{containerText}</p>
                        </>
                    )}
                </div>
            ) : (
                loggingOut ?
                    <div
                        className={hoverMenu === containerText ?
                            "hoveredMenu"
                            :
                            "navIconContainer"
                        }
                        onMouseEnter={() => setHoverMenu(containerText)}
                        onMouseLeave={() => setHoverMenu("")}
                        onClick={() => setLoggingOut(true)}
                    >
                        {icon}
                        <p>{containerText}</p>
                    </div>
                :
                <div 
                    className= {hoverMenu === containerText ?
                        "hoveredMenu"
                        :
                        "navIconContainer"
                    }
                    onMouseEnter={() => setHoverMenu(containerText)}
                    onMouseLeave={() => setHoverMenu("")}
                >
                    {icon}
                    <p>{containerText}</p>
                </div>
            )
        );
    };
    

    return(
        <div
            id="horizontalNavBar"
        >
            {planNetLogo()}

            {navIcons(<IoHomeOutline/>, "Home", false)}

            {navIcons(<GiWorld />, "World", false)}

            {navIcons(<FaUsers />, "Users", false)}

            {loggedUser.account_type === "Admin"? 
                navIcons(<GrUserAdmin />, "Admin", false)
                :
                null
            }

            {navIcons(<FaSearch />, "Search", true)}

            {navIcons(<CiLogout />, "LogOut", false, true)}

            {loggingOut ?
                <LogOut 
                    loggedUser={loggedUser}
                    setLoggedUser={setLoggedUser}
                    setLoggingOut={setLoggingOut}
                />
                :
                null
            }
        </div>
    )
}