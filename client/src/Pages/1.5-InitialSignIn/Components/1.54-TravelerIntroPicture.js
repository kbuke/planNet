
import { useEffect, useState } from "react"
import "./1.54-TravelerIntroPicture.css"

import TravelerInfo from "./1.55-TravelerInfo"
import TravelerPicture from "./1.56-TravelerPicture"

export default function TravelerInfoPicture({
    travelerButtons,
    loggedUser,
    appData
}){
    const [newIntro, setNewIntro] = useState()
    const [newPic, setNewPic] = useState(null)
    const [preview, setPreview] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedUser, setSelectedUser] = useState([])

    //show all users 
    const allUsers = appData.allUsers
    const setAllUsers = appData.setAllUsers

    //Set the selected user when allUsers updates
    useEffect(() => {
        const user = allUsers.find(user => user.id === loggedUser.id)
        setSelectedUser(user)
    }, [allUsers, loggedUser.id])

    //Set preview URL when selectedUser or newPic updates
    useEffect(() => {
        if (selectedUser) {
            setPreview(selectedUser.profile_picture?.picture_route)
        }
    }, [selectedUser])

    //Create a preview URL when newpic changes
    useEffect(() => {
        if (newPic) {
            const previewUrl = URL.createObjectURL(newPic)
            setPreview(previewUrl)

            //Clean up preview URL when component unmounts, or newPic changes
            return () => URL.revokeObjectURL(previewUrl)
        }
    }, [newPic])

    console.log(selectedUser)

    const pictureId = selectedUser?.profile_picture?.id
    console.log(`my picture id is ${pictureId}`)

    //Set up profile pics details 
    const allProfilePictures = appData.allProfilePictures
    const setAllProfilePictures = appData.setAllProfilePictures

    console.log(loggedUser)

    const handleUpdatePic = (e) => {
        const file = e.target.files[0]
        setNewPic(file)
    }

    const handleNewProfileInfo = (e) => {
        e.preventDefault();

        if(!newPic) {
            setError("Please select a file to upload")
            return
        }

        const formData = new FormData();
        formData.append("image", newPic)

        fetch(`/profilepics/${pictureId}`, {
            method: "PATCH",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            setLoading(false);
            if (data.error){
                setError("Failed to update profile picture")
            } else {
                //Update preview with the new image URL
                setPreview(data.picture_route)
                setAllProfilePictures(prev => 
                    prev.map(pic => pic.id === pictureId ? data : pic)
                )

                fetch(`/users/${loggedUser.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        initial_signin: true,
                        intro: newIntro
                    })
                })
                .then(response => response.json())
                .then(userData => {
                    if (!userData.error){
                        setAllUsers(prevUsers => {
                            if (Array.isArray(prevUsers)) {
                                return prevUsers.map(user => 
                                    user.id === loggedUser.id ? userData : user
                                )
                            }
                            return prevUsers
                        })
                    } else {
                        setError("Failed to update interests")
                    }
                })
                .catch(() => setError("An error occured while updating initial sign in"))
            }
        })
    }
    return(
        <div
            style={{height: "100%"}}
        >
            <TravelerInfo 
                setNewIntro={setNewIntro}
            />

            <TravelerPicture 
                preview={preview}
                handleUpdatePic={handleUpdatePic}
            />

            <button
                id="completeSignInButton"
                onClick={(e) => handleNewProfileInfo(e)}
            >
                Complete Initial Sign In
            </button>

            {travelerButtons(2)}
        </div>
    )
}