
import { useEffect, useState } from "react";
import "./2.03-ContinentInfo.css";

import EditContinent from "./2.04-EditContinent";

export default function ContinentInfo({
    continentId,
    setContinentId,
    allContinents,
    setAllContinents,
    setContinentInfo,
    infoContainer
}) {
    const [selectedContinent, setSelectedContinent] = useState();
    const [continentName, setContinentName] = useState("")
    const [continentImg, setContinentImg] = useState("")
    const [continentIntro, setContinentIntro] = useState("")
    const [editContinent, setEditContinent] = useState(false)

    // Update selected continent and its properties
    useEffect(() => {
        setSelectedContinent(allContinents.find(continent => continent.id === continentId))
        setContinentName(selectedContinent?.name)
        setContinentImg(selectedContinent?.image)
        setContinentIntro(selectedContinent?.intro)
    }, [continentId, selectedContinent])

    console.log(continentName)

    return (
        <div id="popUpBackground">
            {
                infoContainer(
                    continentName, setContinentName, continentImg, setContinentImg,
                    continentIntro, setContinentIntro, editContinent,
                    setEditContinent, setContinentInfo, `/continents/${continentId}`,
                    allContinents, setAllContinents, setContinentId
                )
            }
        </div>
    );
}
