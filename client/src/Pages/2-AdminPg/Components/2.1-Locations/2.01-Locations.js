
import { useState, useEffect } from "react"

import "./2.01-Locations.css"

import { MdDeleteOutline } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiCircleChevDown } from "react-icons/ci";
import { CiCircleChevUp } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";

import AdminContinents from "./Components/2.1-AdminContinents/2.01-AdminContinents";
import AdminCountry from "./Components/2.2-Countries/2.06-AdminCountry";
import AdminStates from "./Components/2.3-AdminStates/2.30-AdminStates";
import AdminCities from "./Components/2.4-AdminCities/2.4-AdminCities";
import AdminBoroughs from "./Components/2.5-AdminBoroughs/2.5-AdminBoroughs";
import AdminNeighbourhoods from "./Components/2.6-AdminNeighbourhoods/2.6-AdminNeighbourhoods";

export default function Locations({
    appData
}){
    const [filterLocations, setFilterLocations] = useState("")

    const allContinents = appData.allContinents
    const setAllContinents = appData.setAllContinents

    const allCountries = appData.allCountries
    const setAllCountries = appData.setAllCountries

    const allStates = appData.allStates
    const setAllStates = appData.setAllStates

    //Set up rendered polaroids for CONTINENTS and COUNTRIES
    const countinentAndCountryPolaroid = (
        locationArray, setLocationId,
        setLocationInfo
    ) => {
        const renderLocation = locationArray.map((location, index) => {
            return(
                <div
                    id="locationPolaroid"
                    key={index}
                >
                    <img 
                        src={location.image}
                        alt={`${location.name} Img`}
                        id="polaroidLocationPic"
                    />

                    <div>
                        <h2>
                            {location.name}
                        </h2>

                        <div>
                            <IoIosInformationCircleOutline 
                                className="polaroidLocationButtons"
                                onClick={() => {setLocationId(location.id); setLocationInfo(true)}}
                            />

                            <MdDeleteOutline 
                                className="polaroidLocationButtons"
                            />
                        </div>
                    </div>
                </div>
            )
        })

        return renderLocation
    }

    //Set up info container for all locations
    const locationInfoContainer = (
        setLocationId, setLocationInfo,
        locationImg, passportStamp,
        locationName, locationOptionsArray,
        selectedOption, setSelectedOption,
        locationInfo, dependantLocationArray,
        dependancyType, hoveredDependancy,
        setHoveredDependancy, setDependancyId,
        setDependancyInfo, setAddDependantLocation,
        addDependantLocation, newDependantLocationInputs,
        setLocationIdInfoArray, setEditLocation
    ) => {

        const renderOptions = locationOptionsArray.map((options, index) => (
            <button
                key={index}
                className={options === selectedOption ? "adminSelectedLocationOption" : "adminLocationOptionButtons"}
                onClick={() => setSelectedOption(options)}
            >
                {options}
            </button>
        ))

        const sortDependantArray = dependancyType ? dependantLocationArray?.sort((a,b) => a[dependancyType].name.localeCompare(b[dependancyType].name)) : dependantLocationArray?.sort((a, b) => a.name.localeCompare(b.name))

        const filterSpecificLocations = sortDependantArray?.filter(location => {
            const locationName = dependancyType ? location[dependancyType].name : location.name
            return locationName?.toLowerCase().includes(filterLocations.toLowerCase())
        })

        //Create a link to specific country page
        const renderDependantLocations = filterSpecificLocations?.map((location, index) => (
            <div
                id={
                    dependancyType ?
                        hoveredDependancy === location[dependancyType].name ? 
                            "hoveredAdminLocationDependantLocations"
                        :
                            "adminLocationDependantLocations"
                    :
                        hoveredDependancy === location.name ?
                            "hoveredAdminLocationDependantLocations"
                        :
                            "adminLocationDependantLocations"
                }
                onMouseEnter={() =>
                    dependancyType ? 
                        setHoveredDependancy(location[dependancyType].name) 
                    : 
                        setHoveredDependancy(location.name)}

                onMouseLeave={() => setHoveredDependancy("")}
                key={index}

                onClick={() => {
                    if (dependancyType) {
                        setDependancyId(location[dependancyType].id);
                        setDependancyInfo(true);
                    } else {
                        setDependancyId(location.id);
                        setDependancyInfo(true);
                    }
                }}
                
            >
                <img 
                    src={dependancyType ? location[dependancyType].image : location?.image}
                    className="adminDependantLocationImg"
                />

                <h3>
                    {dependancyType ? location[dependancyType].name : location?.name}
                </h3>
            </div>
        ))

        return(
            <div
                id="adminAllLocationInfoContainer"
            >
                <div
                    style={{backgroundImage: `url(${locationImg})`}}
                    id="adminLocationInfoImg"
                >
                    {
                        passportStamp ?
                            <img 
                                src={passportStamp}
                                id="adminCountryStamp"
                            />
                        :
                            null
                    }
                </div>

                {/*Am I adding a state */}
                {addDependantLocation ?
                    <div>
                        {newDependantLocationInputs()}
                    </div>
                    :
                    <div>
                        <h1>{locationName}</h1>

                        <div
                            id="adminLocationOptionButtonContainer"
                        >
                            {renderOptions}
                        </div>

                        {dependantLocationArray ?
                            <div
                                style={{display: "flex", flexDirection: "column"}}
                            >
                                <div
                                    id="adminAddLocationButtonContainer"
                                    onClick={() => setAddDependantLocation(true)}
                                >
                                    <CiCirclePlus 
                                        id="createLocationButton"
                                    />
                                    <h4>Add {selectedOption}</h4>
                                </div>

                                {dependantLocationArray.length > 0 ?
                                    <div
                                        className="filterDependantLocationGrid"
                                    >
                                        <input 
                                            id="filterDependantLocation"
                                            placeholder={`Filter ${selectedOption}`}
                                            onChange={(e) => setFilterLocations(e.target.value)}
                                        />
                                        <div
                                            id="adminLocationDependantLocationsGrid"
                                        >
                                            {renderDependantLocations}
                                        </div>
                                    </div>
                                    :
                                        <div>
                                            <h1>No {selectedOption} Registered in {locationName}</h1>
                                        </div>
                                }
                            </div>
                        :
                            <div id="adminSpecificLocationInfoContainer">
                                {locationInfo?.split("\n").map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}

                                <CiEdit 
                                    style={{backgroundColor: "white", height: "50px", width: "50px", borderRadius: "50%", color: "black", cursor: "pointer"}}
                                    onClick={() => setEditLocation(true)}
                                />
                            </div>
                        }

                        <button
                            // onClick={() => {setLocationId(); setLocationInfo(false)}}
                            onClick={() => (
                                setLocationIdInfoArray.map(setSpecificInfoId => setSpecificInfoId())
                            )}
                            className="adminAddLocationsButton"
                            style={{backgroundColor: "red"}}
                        >
                            Close
                        </button>
                    </div>
                }
            </div>
        )
    }


    //Handle adding locations
    const handleNewLocation = (
        e, locationObjectInfo,
        locationEndpoint, setAllLocations,
        allLocations, setAddLocation
    ) => {
        e.preventDefault()
        const jsonData = locationObjectInfo
        fetch(locationEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
        .then(r => r.json())
        .then(newLocation => {
            setAllLocations([...allLocations, newLocation])
        })
        .then(setAddLocation(false))
    } 

    //Handle editing locations
    const handleEditLocation = (
        e, locationObjectInfo,
        locationEndpoint, setAllLocations,
        allLocations, setEditLocation
    ) => {
        e.preventDefault()
        fetch(locationEndpoint, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(locationObjectInfo)
        })
        .then((r) => {
            if(r.ok){
                return r.json()
            } else {
                console.error("Failed to update location")
                return null
            }
        })
        .then((editedInfo) => {
            if(editedInfo){
                setAllLocations(allLocations.map(oldLocation => 
                    oldLocation.id === editedInfo.id ? editedInfo : oldLocation
                ))
            }
        })
        .then(setEditLocation(false))
    }

    //Handle adding new location inout
    const handleNewLocationInputs = (
        labelHeader, 
        setLocationText,
        textVariable
    ) => {
        return(
            <div
                id="adminAddLocationsInputContainer"
            >
                <label>
                    {labelHeader}
                </label>

                <input 
                    onChange={(e) => setLocationText(e.target.value)}
                    id="adminAddLocationInputs"
                    value={textVariable ? textVariable : null}
                />
            </div>
        )
    }

    return(
        <div>
            <AdminContinents 
                appData={appData}
                allContinents={allContinents}
                setAllContinents={setAllContinents}
                countinentAndCountryPolaroid={countinentAndCountryPolaroid}
                locationInfoContainer={locationInfoContainer}
                handleNewLocation={handleNewLocation}
                handleNewLocationInputs={handleNewLocationInputs}
                allStates={allStates}
                setAllStates={setAllStates}
                handleEditLocation={handleEditLocation}
                allCountries={allCountries}
                setAllCountries={setAllCountries}
            />

            <AdminCountry 
                appData={appData}
                allCountries={allCountries}
                setAllCountries={setAllCountries}
                countinentAndCountryPolaroid={countinentAndCountryPolaroid}
                locationInfoContainer={locationInfoContainer}
                handleNewLocation={handleNewLocation}
                handleNewLocationInputs={handleNewLocationInputs}
                allStates={allStates}
                setAllStates={setAllStates}
                handleEditLocation={handleEditLocation}
            />
        </div>
    )
}