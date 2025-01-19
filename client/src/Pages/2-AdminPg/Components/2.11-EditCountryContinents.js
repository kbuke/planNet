

export default function EditCountryContinents({
    appData,
    countryId,
    setEditCountry,
    countryContinents
}){
    console.log(countryContinents)

    const continentsCountries = appData.continentsCountries
    const setContinentsCountries = appData.setContinentsCountries

    const handleClose = () => (
        setEditCountry(false)
    ) 

    return(
        <div>
            <h2>Edit Continents</h2>

            <div
                id="adminEditLocationButtonContainer"
            >
                <button
                    className="adminEditLocationButton"
                >
                    Edit Continents
                </button>

                <button
                    className="adminEditLocationButton"
                    style={{backgroundColor: "red"}}
                    onClick={() => handleClose(false)}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}