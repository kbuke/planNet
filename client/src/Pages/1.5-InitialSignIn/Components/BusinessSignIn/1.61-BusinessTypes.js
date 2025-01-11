import { useEffect, useState } from "react"

import "./1.61-BusinessTypes.css"

export default function BusinessTypes({
    appData,
    loggedUser
}){
    const [sortIndustires, setSortIndustries] = useState([])
    const [allBusinessesIndustries, setAllBusinessesIndustries] = useState([])

    const businessId = loggedUser.id

    const allIndustries = appData.allIndustries

    const businessIndustries = appData.businessIndustries
    const setBusinessIndustries = appData.setBusinessIndustries

    useEffect(() => {
        setSortIndustries(allIndustries.sort((a, b) => a.industry.localeCompare(b.industry)))
    }, [allIndustries])

    useEffect(() => {
        setAllBusinessesIndustries(businessIndustries.filter(industry => businessId === industry.business_id))
    }, [businessIndustries])

    const handleNewIndustry = (e, industryId) => {
        e.preventDefault()
        const jsonData = {
            businessId,
            industryId
        }
        fetch("/businessesindustries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
        .then(r => r.json())
        .then(newIndustry => {
            setBusinessIndustries([...businessIndustries, newIndustry])
        })
    }

    const handleDeleteIndustry = (e, industryId) => {
        e.preventDefault()
        const businessIndustryRelation = businessIndustries.find(
            relation => relation.industry_id === industryId && relation.business_id=== businessId
        )

        if(businessIndustryRelation){
            const relationId = businessIndustryRelation.id 
            fetch(`/businessesindustries/${relationId}`, {
                method: "DELETE"
            })
            .then(r => {
                if(r.ok){
                    setBusinessIndustries(industries => industries.filter(industry => industry.id !== relationId))
                }
            })
        }
    }

    const renderIndustries = sortIndustires.map((industry, index) => {
        //Check if business has already registered this industry
        console.log(businessIndustries)
        const isIndustry = allBusinessesIndustries.some(business => business.industry_id === industry.id)
        console.log(industry)

        return(
            <div
                className="industryContainer"
                key={index}
                id={isIndustry ? "relevantIndustry" : ""}
                onClick={isIndustry ? 
                    (e) => handleDeleteIndustry(e, industry.id) 
                    :
                    (e) => handleNewIndustry(e, industry.id)
                }
            >
                {industry.industry}
            </div>
        )
    })

    console.log(loggedUser)

    return (
        <>
            <h1>Please Select The Type of Industries Your Business Falls Under</h1>

            <div
                id="industrySignInWheel"
            >
                {renderIndustries}
            </div>
        </>
    )
}