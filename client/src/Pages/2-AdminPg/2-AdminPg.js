import { useOutletContext } from "react-router-dom"

import "./2-AdminPg.css"

import AdminContinents from "./Components/2.01-AdminContinents"

export default function AdminPg(){
    const appData = useOutletContext()

    
    return(
        <div>
            <h1>Admin Page</h1>

            <AdminContinents 
                appData={appData}
            />
        </div>
    )
}