import { useEffect, useState } from "react";


export default function TravelerWishlistCountries({
    sortCountries,
    allVisitedCountries,
    travelerButtons,
    hoverCountryId, 
    setHoverCountryId,
    appData,
    userId
}) {
    const [allCountriesWishList, setAllCountriesWishList] = useState([])
    //Show all wishlist countries
    const countriesWishlist = appData.countriesWishlist
    const setCountriesWishlist = appData.setCountriesWishlist

    useEffect(() => {
        setAllCountriesWishList(countriesWishlist.filter(wishList => wishList.user_id === userId))
    }, [countriesWishlist])

    // Extract all visited country IDs for easy lookup
    const visitedCountryIds = new Set(allVisitedCountries.map(visit => visit.country_id));

    // Filter out visited countries
    const unvisitedCountries = sortCountries.filter(
        country => !visitedCountryIds.has(country.id)
    );

    console.log(unvisitedCountries)

    //Handle adding a country to wishlist
    const handleNewCountryWishlist = (e, countryId) => {
        e.preventDefault()
        console.log("I am adding this to my wishlist")
        const jsonData = {
            countryId, 
            userId
        }
        fetch("/countrieswishlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
        .then(r => r.json())
        .then(newWishlist => {
            setCountriesWishlist([...countriesWishlist, newWishlist])
        })
    }

    const handleDeleteCountryWishList = (e, countryId) => {
        e.preventDefault()
        const userCountryWishlist = allCountriesWishList.find(
            relation => relation.country_id === countryId && relation.user_id === userId
        )

        if(userCountryWishlist){
            const relationId = userCountryWishlist.id
            fetch(`/countrieswishlist/${relationId}`, {
                method: "DELETE"
            })
            .then(r => {
                if(r.ok){
                    setCountriesWishlist(countries => countries.filter(country => country.id !== relationId))
                }
            })
        }
    }

    const renderCountries = unvisitedCountries.map((country, index) => {
        const inWishlist = countriesWishlist.some(
            (wishlist) => wishlist.country_id === country.id
        );
        return(
            <div
                key={index}
                id="countryVisitContainer"
                style={{
                    backgroundImage: `url(${country.image})`
                }}
                onMouseEnter={() => setHoverCountryId(country.id)}
                onMouseLeave={() => setHoverCountryId()}
                onClick={!inWishlist ?
                    (e) => handleNewCountryWishlist(e, country.id)
                    :
                    (e) => handleDeleteCountryWishList(e, country.id)
                }
            >
                {hoverCountryId === country.id && !inWishlist ? (
                    <div
                        className="initialCountryNameCover"
                    >
                        <h1>{country.name}</h1>
                    </div>
                ) : inWishlist ? (
                    <div>
                        <img 
                            id="countryContainerPassportStamp"
                            src={country.passport_stamp}
                        />
                    </div>
                ) : null}
            </div>
        )
    })

    return (
        <div>
            <h1>Please Select Countries You Wish to Visit</h1>

            <div
                id="initialCountryVisitContainer"
            >
                {renderCountries}
            </div>
          
            {travelerButtons(3)}
        </div>
    );
}
