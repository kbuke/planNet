
import { useEffect, useState } from "react";
import "./2.03-ContinentInfo.css";

import EditContinent from "./2.04-EditContinent";

export default function ContinentInfo({
    selectContinentId,
    setSelectContinentId,
    allContinents,
    setAllContinents
}) {
    const [selectedContinent, setSelectedContinent] = useState();
    const [continentName, setContinentName] = useState("")
    const [continentImg, setContinentImg] = useState("")
    const [continentIntro, setContinentIntro] = useState("")
    const [editContinent, setEditContinent] = useState(false)

    // Update selected continent and its properties
    useEffect(() => {
        setSelectedContinent(allContinents.find(continent => continent.id === selectContinentId))
        setContinentName(selectedContinent?.name)
        setContinentImg(selectedContinent?.image)
        setContinentIntro(selectedContinent?.intro)
    }, [selectContinentId, selectedContinent])

    console.log(continentName)

    return (
        <div id="popUpBackground">
            {selectedContinent ? (
                <div id="adminEditLocationContainer">
                    {editContinent ?
                        <h1>Edit the Continent of {continentName}</h1>
                        :
                        <h1>{continentName}</h1>
                    }

                    {editContinent ?
                        <EditContinent 
                            continentName={continentName}
                            setContinentName={setContinentName}
                            continentImg={continentImg}
                            setContinentImg={setContinentImg}
                            continentIntro={continentIntro}
                            setContinentIntro={setContinentIntro}
                            setEditContinent={setEditContinent}
                            selectContinentId={selectContinentId}
                            allContinents={allContinents}
                            setAllContinents={setAllContinents}
                        />
                        :
                        <div id="editLocationInfoGrid">
                            <div
                                className="editedLocationImgContainer"
                            >
                                <img 
                                    className="editedLocationImg"
                                    src={continentImg}
                                />
                            </div>

                            <div>
                                {continentIntro ? (
                                    continentIntro.split("\n").map((line, index) => (
                                        <p key={index}>{line}</p>
                                    ))
                                ) : (
                                    <p>Loading intro...</p>
                                )}

                                <div
                                    id="adminEditLocationButtonContainer"
                                >
                                    <button
                                        className="adminEditLocationButton"
                                        onClick={() => setEditContinent(true)}
                                    >
                                        Edit Info on {continentName}
                                    </button>

                                    <button
                                        onClick={() => setSelectContinentId()}
                                        className="adminEditLocationButton"
                                        style={{backgroundColor: "red"}}
                                    >
                                        Close {continentName} Page
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            ) : (
                <p>Loading continent details...</p>
            )}
        </div>
    );
}
