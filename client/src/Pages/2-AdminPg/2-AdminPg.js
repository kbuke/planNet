import { useOutletContext } from "react-router-dom"

import "./2-AdminPg.css"

import AdminContinents from "./Components/2.01-AdminContinents"
import AdminCountry from "./Components/2.06-AdminCountry"

import { useState } from "react"

export default function AdminPg(){
    const appData = useOutletContext()

    const allContinents = appData.allContinents
    const setAllContinents = appData.setAllContinents

    const [continentId, setContinentId] = useState()
    
    return(
        <div>
            <h1>Admin Page</h1>

            <AdminContinents 
                appData={appData}
                setContinentId={setContinentId}
                allContinents={allContinents}
                setAllContinents={setAllContinents}
            />

            <AdminCountry 
                appData={appData}
                allContinents={allContinents}
            />
        </div>
    )
}