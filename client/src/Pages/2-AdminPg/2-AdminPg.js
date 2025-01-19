import { useOutletContext } from "react-router-dom"

import "./2-AdminPg.css"

import AdminContinents from "./Components/2.01-AdminContinents"
import AdminCountry from "./Components/2.06-AdminCountry"
import AdminStates from "./Components/2.3-AdminStates/2.30-AdminStates"
import AdminCities from "./Components/2.4-AdminCities/2.4-AdminCities"
import AdminBoroughs from "./Components/2.5-AdminBoroughs/2.5-AdminBoroughs"
import AdminNeighbourhoods from "./Components/2.6-AdminNeighbourhoods/2.6-AdminNeighbourhoods"

import { useState } from "react"

import { MdDeleteOutline } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiCircleChevDown } from "react-icons/ci";
import { CiCircleChevUp } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";

export default function AdminPg(){
    const appData = useOutletContext()

    const allContinents = appData.allContinents
    const setAllContinents = appData.setAllContinents

    const [continentId, setContinentId] = useState()

    const [countryId, setCountryId] = useState()
    const [countryInfo, setCountryInfo] = useState(false)

    const [stateId, setStateId] = useState()
    const [stateInfo, setStateInfo] = useState(false)

    const [citiesId, setCitiesId] = useState()
    const [cityInfo, setCityInfo] = useState(false)

    const [boroughId, setBoroughId] = useState()
    const [boroughInfo, setBoroughInfo] = useState(false)

    const [neighbourhoodId, setNeighbourhoodId] = useState()
    const [neighbourhoodInfo, setNeighbourhoodInfo] = useState(false)

    const wallpaper = "https://i.ibb.co/pn8Vz09/Untitled-design-2.png"

    console.log(`I have selected state ${stateId}`)

    

    //Set up location reel container
    const locationReelContainer = (
        locationTitle, placeholderText, 
        setLocationText, renderLocationFunction, 
        locations, setHoverLocation, 
        hoverLocation, setLocationId, 
        locationId, setLocationInfo,
        locationInfo, setAddLocation,
        setStateId
    ) => {
        return(
            <div
                id="adminLocationReelContainer"
            >
                <div
                    id="adminLocationHeader"
                >
                    <h2
                        id="adminLocationTitle"
                    >
                        {locationTitle}
                    </h2>

                    <CiCirclePlus 
                        id="addLocationButton"
                        onClick={() => setAddLocation(true)}
                    />

                    <input 
                        placeholder={placeholderText}
                        onChange={(e) => setLocationText(e.target.value)}
                        id="adminLocationSearchBar"
                    />
                </div>

                <div
                    id="adminLocationReel"
                >
                    {renderLocationFunction(locations, setHoverLocation, hoverLocation, setLocationId, locationId, setLocationInfo, locationInfo, setStateId)}
                </div>
            </div>
        )
    }

    //Set up location containers
    const renderLocationContainers = (locations, setHoverLocation, hoverLocation, setLocationId, locationId, setLocationInfo, locationInfo, setStateId) => {
        return(
            locations? locations.map((location, index) => (
                <div
                    key={index}
                    id="specificLocationContainer"
                    onMouseEnter={() => setHoverLocation(location.id)}
                    onMouseLeave={() => setHoverLocation()}
                >
                    <div
                        style={{
                            backgroundImage: `url(${location.image})`
                        }}
                        id="adminLocationImg"
                    >
                        {location.id === hoverLocation ?
                            <div
                                className="locationNameContainer"
                            >
                                <h2>
                                    {location.name}
                                </h2>
                            </div>
                            :
                            null
                        }
                    </div>

                    <div
                        id="editDeleteInfoLocationContainer"
                    >
                        <MdDeleteOutline 
                            className="editDeleteInfoLocationButtons"
                        />

                        <IoIosInformationCircleOutline 
                            className="editDeleteInfoLocationButtons"
                            onClick={() => {setLocationId(location.id); setLocationInfo(true)}}
                        />

                        {locationInfo !== neighbourhoodInfo ?
                            null 
                            :
                        
                            !locationInfo && location.id === locationId ?
                                <CiCircleChevUp 
                                    className="editDeleteInfoLocationButtons"
                                    onClick={() => {
                                        setLocationId(); setStateId(null)
                                    }}
                                    style={{backgroundColor: "red", color: "white"}}
                                />
                                :
                                <CiCircleChevDown 
                                    className="editDeleteInfoLocationButtons"
                                    onClick={() => {setLocationId(location.id); setStateId(null)}}
                                    style={{backgroundColor: "green", color: "white"}}
                                />
                            }
                        </div>
                    </div>
                ))
                :
                null
            )
    }

    //Set up container to add states, neighbourhoods and boroughs
    const addStateBoroughNeighbourhood = (
        locationType, relationName,
        locationName, setLocationName,
        locationImg, setLocationImg,
        locationIntro, setLocationIntro,
        relationId, setAddLocationType,
        link, setAllLocation, allLocation
    ) => {
        //Set up inputs
        const newLocationInput = (inputPlaceholder, setInputVariable) => {
            return(
                <div>
                    <input 
                        placeholder={inputPlaceholder}
                        onChange={(e) => setInputVariable(e.target.value)}
                        className="adminAddStateBoroughNeigbourhoodInput"
                    />
                </div>
            )
        }

        //Handle POST Request
        const handlePost = (e) => {
            e.preventDefault()

            const jsonData = {
                locationName,
                locationImg,
                locationIntro,
                relationId
            }

            fetch(link, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jsonData)
            })
                .then((r) => r.json())
                .then((newLocation) => {
                    setAllLocation([...allLocation, newLocation])
                })
                .then(setAddLocationType(false))
        }
        return(
            <form
                id="adminAddLocationContainer"
                onSubmit={(e) => handlePost(e)}
            >
                <h1>Add {locationType} to {relationName}</h1>
                {newLocationInput(`Enter name of new ${locationType}`, setLocationName)}
                {locationName ?
                    <div>
                        {newLocationInput(`Enter the image of ${locationName}`, setLocationImg)}
                        <textarea 
                            placeholder={`Enter an introduction for ${locationName}`}
                            onChange={(e) => setLocationIntro(e.target.value)}
                            className="adminLocationTextArea"
                        />
                    </div>
                    :
                    <p
                        style={{color: "red"}}
                    >
                        {`Please enter the name of your new ${locationType}`}
                    </p>
                }

                <div
                    className="adminAddLocationButtonContainer"
                >
                    <button
                        className="adminAddLocationButtons"
                    >
                        Create New {locationType}
                    </button>

                    <button
                        onClick={() => setAddLocationType(false)} 
                        className="adminAddLocationButtons"
                        style={{backgroundColor: "red"}}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        )
    }
    
    return(
        <div
            style={{
                marginTop: "100px",
                backgroundImage: `url(${wallpaper})`
            }}
        >
            <h1>Admin Page</h1>

            <AdminContinents 
                appData={appData}
                continentId={continentId} setContinentId={setContinentId}
                allContinents={allContinents} setAllContinents={setAllContinents}
                renderLocationContainers={renderLocationContainers}
                locationReelContainer={locationReelContainer}
            />

            <AdminCountry 
                appData={appData}
                allContinents={allContinents}
                continentId={continentId}
                countryId={countryId} setCountryId={setCountryId}
                countryInfo={countryInfo} setCountryInfo={setCountryInfo}
                renderLocationContainers={renderLocationContainers}
                locationReelContainer={locationReelContainer}
                setStateId={setStateId}
                setCitiesId={setCitiesId}
            />

            {countryId && !countryInfo ?
                <AdminStates 
                    appData={appData}
                    countryId={countryId}
                    locationReelContainer={locationReelContainer}
                    renderLocationContainers={renderLocationContainers}
                    stateId={stateId}
                    setStateId={setStateId}
                    stateInfo={stateInfo}
                    setStateInfo={setStateInfo}
                    setCitiesId={setCitiesId}
                    addStateBoroughNeighbourhood={addStateBoroughNeighbourhood}
                />
                :
                null
            }

            {stateId && countryId && !stateInfo ? 
                <AdminCities 
                    appData={appData}
                    stateId={stateId}
                    locationReelContainer={locationReelContainer}
                    renderLocationContainers={renderLocationContainers}
                    citiesId={citiesId}
                    setCitiesId={setCitiesId}
                    cityInfo={cityInfo}
                    setCityInfo={setCityInfo}
                    countryId={countryId}
                    setBoroughId={setBoroughId}
                />
                :
                null
            }

            {citiesId && stateId && countryId && !cityInfo ?
                <AdminBoroughs 
                    appData={appData}
                    citiesId={citiesId}
                    locationReelContainer={locationReelContainer}
                    renderLocationContainers={renderLocationContainers}
                    boroughId={boroughId}
                    setBoroughId={setBoroughId}
                    boroughInfo={boroughInfo}
                    setBoroughInfo={setBoroughInfo}
                    setNeighbourhoodId={setNeighbourhoodId}
                    addStateBoroughNeighbourhood={addStateBoroughNeighbourhood}
                />
                :
                null
            }

            {boroughId && citiesId && stateId && countryId && !boroughInfo ?
                <AdminNeighbourhoods 
                    appData={appData}
                    boroughId={boroughId}
                    locationReelContainer={locationReelContainer}
                    renderLocationContainers={renderLocationContainers}
                    neighbourhoodId={neighbourhoodId}
                    setNeighbourhoodId={setNeighbourhoodId}
                    neighbourhoodInfo={neighbourhoodInfo}
                    setNeighbourhoodInfo={setNeighbourhoodInfo}
                    addStateBoroughNeighbourhood={addStateBoroughNeighbourhood}
                />
                :
                null
            }
        </div>
    )
}