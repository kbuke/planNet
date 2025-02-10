


export default function SpecificCountryInfo({
    countrySafety,
    countryContinents,
    universalCountryImports,
    setContinentInfo,
    setContinentId,
}){
    const locationInfoContainer = universalCountryImports.locationInfoContainer
    const countryImg = universalCountryImports.countryImg
    const countryName = universalCountryImports.countryName
    const passportStamp = universalCountryImports.passportStamp
    const countryFlag = universalCountryImports.countryFlag
    const selectedOption = universalCountryImports.selectedOption
    const setSelectedOption = universalCountryImports.setSelectedOption
    const setCountryInfo = universalCountryImports.setCountryInfo
    const setCountryId = universalCountryImports.setCountryId
    const countryOptions = universalCountryImports.countryOptions

    // Filter out null values from the function array
    const functionArray = [
        setCountryId, 
        setCountryInfo, 
        setContinentId || null, 
        setContinentInfo || null
    ].filter(func => func !== null);  // This will remove nulls

return (
    locationInfoContainer(
        setCountryId, setCountryInfo,
        countryImg, passportStamp,
        countryName, countryOptions,
        selectedOption, setSelectedOption,
        null, null,
        null, null, 
        null, null,
        null, null,
        null, null,
        functionArray // Pass the valid function array
    )
);

}