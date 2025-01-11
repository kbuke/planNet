
import { useState } from "react"
import "./2.02-AddContinent.css"

export default function AddContinent({
    allContinents,
    setAllContinents, 
    setAddContinent
}){
    const [newContinent, setNewContinent] = useState("")
    const [newContinentImg, setNewContinentImg] = useState("")
    const [newContinentInfo, setNewContinentInfo] = useState("")

    const handleNewContinent = (e) => {
        e.preventDefault()
        const jsonData = {
            newContinent,
            newContinentImg,
            newContinentInfo
        }
        fetch("/continents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newContinent => {
                setAllContinents([...allContinents, newContinent])
            })
            .then(setAddContinent(false))
    }

    const newContinentInputs = (title, stateVariable) => {
        return(
            <div
                id="newContinentInputContainers"
            >
                <label
                    style={{fontWeight: "600", color: "green"}}
                >
                    {title}
                </label>

                {stateVariable === setNewContinentInfo ?
                    <textarea 
                        placeholder="Please Type Here"
                        style={{height: "80px"}}
                        type="text"
                        onChange={(e) => stateVariable(e.target.value)}
                    />
                    :
                    <input 
                        placeholder="Please Type Here"
                        className="newContinentInput"
                        type="text"
                        onChange={(e) => stateVariable(e.target.value)}
                    />
                }
            </div>
        )
    }
    return(
        <div
            id="popUpBackground"
        >
            <div
                id="addNewContinentContainer"
            >
                <h2
                    style={{marginBottom: "20px"}}
                >
                    Add New Continent
                </h2>

                {newContinentInputs("Enter Continents Name", setNewContinent)}
                {newContinentInputs("Enter an image for your continent", setNewContinentImg)}
                {newContinentInputs("Enter info about your continent", setNewContinentInfo)}

                <div
                    id="newContinentButtonContainer"
                >
                    <button
                        className="newContinentButtons"
                        onClick={(e) => handleNewContinent(e)}
                    >
                        Create New Continent
                    </button>

                    <button
                        className="newContinentButtons"
                        style={{backgroundColor: "red"}}
                        onClick={() => setAddContinent(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}