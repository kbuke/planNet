import logo from "./assets/planNetLogo.png"
import './App.css';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from "react";

function App() {
  const [loggedUser, setLoggedUser] = useState(null)

  //Fetch logged user
  useEffect(() => {
    fetch("/check_session")
    .then(r => {
      if(r.ok) {
        return r.json()
        .then(loggedUser => {
          setLoggedUser(loggedUser)
        })
      }
    })
  }, [])
  console.log(loggedUser)

  return (
    <div className="App">
      <Outlet 
        context={{
          logo: logo
        }}
      />
    </div>
  );
}

export default App;
