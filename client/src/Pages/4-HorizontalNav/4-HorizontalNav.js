
import "./4-HorizontalNav.css"

import LogOut from "./Components/4.01-LogOut";

import logo from "../../assets/planNetLogo.png"

import { GiWorld } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FaPlaneCircleCheck } from "react-icons/fa6";

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

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

    const navIcons = (icon, containerText, search, loggingOut, linkAddress) => {
        return (
            search ? (
                <Link
                    className= {hoverMenu === containerText ?
                        "hoveredMenu"
                        :
                        "navIconContainer"
                    }
                    to={linkAddress}
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
                </Link>
            ) : (
                loggingOut ?
                    <Link
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
                    </Link>
                :
                <NavLink
                    className= {hoverMenu === containerText ?
                        "hoveredMenu"
                        :
                        "navIconContainer"
                    }
                    to={linkAddress}
                    onMouseEnter={() => setHoverMenu(containerText)}
                    onMouseLeave={() => setHoverMenu("")}
                >
                    {icon}
                    <p>{containerText}</p>
                </NavLink>
            )
        );
    };
    

    return(
        <div
            id="horizontalNavBar"
        >
            {planNetLogo()}

            {navIcons(<IoHomeOutline/>, "Home", false, false)}

            {navIcons(<GiWorld />, "World", false, false)}

            {navIcons(<FaUsers />, "Users", false, false)}

            {navIcons(<FaPlaneCircleCheck />, "Itineraries", false, false)}

            {loggedUser.account_type === "Admin"? 
                navIcons(<GrUserAdmin />, "Admin", false, false, "admin")
                :
                null
            }

            {navIcons(<FaSearch />, "Search", true, false)}

            <img 
                src={loggedUser.profile_picture.picture_route}
                id="navProfilePic"
            />

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