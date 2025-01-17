
import "./2.04-EditContinent.css"

export default function EditContinent({
    continentName,
    setContinentName,
    continentImg,
    setContinentImg,
    continentIntro,
    setContinentIntro,
    setEditContinent,
    selectContinentId,
    allContinents,
    setAllContinents
}){

    const editContinentInputs = (labelHeading, setVariable, currentState) => {
        return(
            <div
                className="editContinentInputContainers"
            >
                <label
                    className="editContinentLabelHeading"
                >
                    {labelHeading}
                </label>

                <input 
                    className="continentEditInput"
                    onChange={(e) => setVariable(e.target.value)}
                    value={currentState}
                />
            </div>
        )
    }

    const handleEditContinent = (e) => {
        e.preventDefault()
        console.log(`I am trying to edit ${selectContinentId}`)
        fetch(`continents/${selectContinentId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: continentName,
                image: continentImg,
                intro: continentIntro
            })
        })
        .then((r) => {
            if(r.ok){
                return r.json()
            } else {
                console.error("Failed to update continent")
                return null
            }
        })
        .then((newContinentInfo) => {
            if(newContinentInfo){
                setAllContinents(allContinents.map(oldContinents => 
                    oldContinents.id === newContinentInfo.id ? newContinentInfo : oldContinents
                ))
            }
        })
        .then(setEditContinent(false))
    }

    return(
        <div
            id="editSpecificContinentInfoGrid"
        >
            <div
                className="editedSpecificLocationImgContainer"
            >
                <img 
                    className="editContinentImg"
                    src={continentImg}
                />
            </div>

            <div>
                {editContinentInputs("Enter Edited Continent Name", setContinentName, continentName)}
                {editContinentInputs("Enter Edited Continent Image", setContinentImg, continentImg)}
                
                <div
                    className="editContinentInputContainers"
                >
                    <label
                        className="editContinentLabelHeading"
                    >
                        Enter Edited Continent Intro
                    </label>

                    <textarea 
                        className="editContinentIntro"
                        onChange={(e) => setContinentIntro(e.target.value)}
                        value={continentIntro}
                    />
                </div>

                <div
                    className="editContinentButtonsContainer"
                >
                    <button
                        onClick={(e) => handleEditContinent(e)}
                        className="adminEditLocationButton"
                    >
                        Submit Edits
                    </button>

                    <button
                        onClick={() => setEditContinent(false)}
                        className="adminEditLocationButton"
                        style={{backgroundColor: "red"}}
                    >
                        Cancel Edits
                    </button>
                </div>
            </div>
        </div>
    )
}