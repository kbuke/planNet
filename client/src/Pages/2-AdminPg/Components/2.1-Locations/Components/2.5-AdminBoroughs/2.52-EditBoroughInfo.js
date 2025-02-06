import { useEffect, useState } from "react";



export default function EditBoroughInfo({
    setBoroughInfo,
    infoContainer,
    sortBoroughs,
    boroughId,
    setBoroughId,
    allBoroughs,
    setAllBoroughs
}){
    const [specificBorough, setSpecificBorough] = useState([])
    const [boroughName, setBoroughName] = useState()
    const [boroughImg, setBoroughImg] = useState()
    const [boroughIntro, setBoroughIntro] = useState()
    const [editBoroughInfo, setEditBoroughInfo] = useState()

    useEffect(() => {
        const filteredBoroughs = sortBoroughs.filter(borough => borough.id === boroughId)
        if (filteredBoroughs.length > 0) {
            setSpecificBorough(filteredBoroughs)
            setBoroughName(filteredBoroughs[0].name)
            setBoroughImg(filteredBoroughs[0].image)
            setBoroughIntro(filteredBoroughs[0].intro)
        } else {
            setSpecificBorough([])
            setBoroughName([])
            setBoroughImg([])
            setBoroughIntro([])
        }
    }, [boroughId, sortBoroughs])

    return(
        <div
            id="popUpBackground"
        >
            {
                infoContainer(
                    boroughName, setBoroughName, boroughImg, setBoroughImg,
                    boroughIntro, setBoroughIntro, editBoroughInfo, 
                    setEditBoroughInfo, setBoroughInfo, `/boroughs/${boroughId}`,
                    allBoroughs, setAllBoroughs, setBoroughId
                )
            }
        </div>
    )
}