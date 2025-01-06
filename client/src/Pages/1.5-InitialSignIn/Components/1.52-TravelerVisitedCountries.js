
import { useState, useEffect } from "react"

export default function TravelerVisitedCountries({
    appData,
    travelerButtons,
    sortCountries,
    setSortCountries,
    allVisitedCountries,
    setAllVisitedCountries,
    userId,
    hoverCountryId,
    setHoverCountryId
}){
    

    //Get all countries
    const allCountries = appData.allCountries

    //Get all visited countries 
    const visitedCountries = appData.visitedCountries
    const setVisitedCountries = appData.setVisitedCountries

    useEffect(() => {
        setSortCountries(allCountries.sort((a, b) => a.name.localeCompare(b.name)))
    }, [allCountries])

    useEffect(() => {
        setAllVisitedCountries(visitedCountries.filter(visit => userId === visit.user_id))
    }, [visitedCountries])

    //Handle logic for adding a new country to users visited list 
    const handleNewVisit = (e, countryId) => {
        e.preventDefault()
        console.log("I did visit this country")
        const jsonData = {
            countryId, 
            userId
        }
        fetch("/visitedcountries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
        .then(r => r.json())
        .then(newVisit => {
            setVisitedCountries([...visitedCountries, newVisit])
        })
    }

    //Handle deleted visit
    const handleDeleteVisit = (e, countryId) => {
        e.preventDefault()
        console.log("I did not actually visit this country")
        const userCountryRelation = allVisitedCountries.find(
            relation => relation.country_id === countryId && relation.user_id === userId
        )

        console.log(userCountryRelation)

        if (userCountryRelation){
            const relationId = userCountryRelation.id 
            fetch(`/visitedcountries/${relationId}`, {
                method: "DELETE"
            })
            .then(r => {
                if(r.ok){
                    setVisitedCountries(countries => countries.filter(country => country.id !== relationId))
                }
            })
        }
    }

    const renderCountries = sortCountries.map((country, index) => {
        // Check if the country is visited
        const isVisited = allVisitedCountries.some(
            (visit) => visit.country_id === country.id
        );
    
        return (
            <div
                key={index}
                id="countryVisitContainer"
                style={{
                    backgroundImage: `url(${country.image})`
                }}
                onMouseEnter={() => setHoverCountryId(country.id)}
                onMouseLeave={() => setHoverCountryId()}
                onClick={!isVisited ? 
                    (e) => handleNewVisit(e, country.id)
                    :
                    (e) => handleDeleteVisit(e, country.id)
                }
            >
                {hoverCountryId === country.id && !isVisited ? (
                    <div className="initialCountryNameCover">
                        <h1>{country.name}</h1>
                    </div>
                ) : isVisited ? (
                    <div>
                        <img
                            src={country.passport_stamp}
                            id="countryContainerPassportStamp"
                            alt={`${country.name} Passport Stamp`}
                        />
                    </div>
                ) : null}
            </div>
        );
    });
    
    return(
        <div>
            <h1>Please Select Countries You Have Visited</h1>

            <div
                id="initialCountryVisitContainer"
            >
                {renderCountries}
            </div>

            {travelerButtons()}
        </div>
    )
}