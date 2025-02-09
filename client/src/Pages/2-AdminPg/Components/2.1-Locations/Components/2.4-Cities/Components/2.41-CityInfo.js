


export default function CityInfo({
    cityIntro,
    universalCityInfo,
    allBoroughs,
    setAllBoroughs,
    cityId
}){
    
    const setCityId = universalCityInfo.setCityId
    const setCityInfo = universalCityInfo.setCityInfo
    const cityName = universalCityInfo.cityName
    const cityImg = universalCityInfo.cityImg
    const cityOptions = universalCityInfo.cityOptions
    const selectedCityOption = universalCityInfo.selectedCityOption
    const setSelectedCityOption = universalCityInfo.setSelectedCityOption
    const locationInfoContainer = universalCityInfo.locationInfoContainer

    console.log(setCityId)

    return(
        locationInfoContainer(
            setCityId, setCityInfo,
            cityImg, null,
            cityName, cityOptions,
            selectedCityOption, setSelectedCityOption,
            cityIntro, null, 
            null, null, 
            null, null, 
            null, null, 
            null, null
        )
    )
}