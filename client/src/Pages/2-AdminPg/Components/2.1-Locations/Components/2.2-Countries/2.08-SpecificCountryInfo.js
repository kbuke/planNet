


export default function SpecificCountryInfo({
    countrySafety,
    countryContinents,
    universalCountryImports
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

    return(
        locationInfoContainer(
            setCountryId, setCountryInfo,
            countryImg, passportStamp,
            countryName, countryOptions,
            selectedOption, setSelectedOption,
            null, null,
            null, null, 
            null
        )
    )
}