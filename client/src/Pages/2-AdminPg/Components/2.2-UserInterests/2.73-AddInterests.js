import { useState } from "react"

import "./2.73-AddInterests.css"

export default function AddInterests({
    allInterests,
    setAllInterests,
    setAddInterest
}){
    const [newInterest, setNewInterest] = useState("")
    const [newInterestImg, setNewInterestImg] = useState("")

    const newInterestInput = (labelText, setFunction) => {
        return(
            <div
                id="newInterestInputContainer"
            >
                <label>
                    {labelText}
                </label>

                <input 
                    className="newInterestInput"
                    onChange={(e) => setFunction(e.target.value)}
                />
            </div>
        )
    }

    const handleNewInterest = (e) => {
        e.preventDefault()
        const jsonData = {
            newInterest,
            newInterestImg
        }
        fetch('/interests', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
        .then(r => r.json())
        .then(newInterest => {
            setAllInterests([...allInterests, newInterest])
        })
        .then(setAddInterest(false))
    }

    return(
        <div
            id="popUpBackground"
        >
            <form
                id="adminAddInterestContainer"
                onSubmit={(e) => handleNewInterest(e)}
            >
                <h1>Add a New Interest</h1>

                {newInterestInput("Interest Title:", setNewInterest)}
                {newInterestInput("Interest Image:", setNewInterestImg)}

                <div
                    id="addInterestButtonContainer"
                >
                    <button
                        className="addInterestButtons"
                        type="submit"
                    >
                        Add Interest
                    </button>

                    <button
                        className="addInterestButtons"
                        style={{backgroundColor: "red"}}
                        onClick={() => setAddInterest(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}