import logo from "./assets/planNetLogo.png"
import './App.css';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from "react";

 import HorizontalNav from "./Pages/4-HorizontalNav/4-HorizontalNav";

function App() {
  const [loggedUser, setLoggedUser] = useState(null)
  const [allUsers, setAllUsers] = useState([])

  const [signUpContainer, setSignUpContainer] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [allStates, setAllStates] = useState([])
  const [allCities, setAllCities] = useState([])
  const [allBoroughs, setAllBoroughs] = useState([])
  const [allNeighbourhoods, setAllNeighbourhoods] = useState([])

  const [allTravelers, setAllTravelers] = useState([])
  const [allBusinesses, setAllBusinesses] = useState([])

  const [allIndustries, setAllIndustries] = useState([])

  const [visitedCountries, setVisitedCountries] = useState([])
  const [countriesWishlist, setCountriesWishlist] = useState([])

  const [allProfilePictures, setAllProfilePictures] = useState([])

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
  }, [allUsers])

  //Fetch all users 
  useEffect(() => {
    fetch("/users")
    .then(r => {
      if(r.ok){
        return r.json()
        .then(users => {
          setAllUsers(users)
        })
      }
    })
  }, [])

  //Fetch all sign up containers
  useEffect(() => {
    fetch("/containers")
    .then(r => {
      if(r.ok){
        return r.json()
        .then(containers => {
          setSignUpContainer(containers)
        })
      }
    })
  }, [])

  //Fetch all countries
  useEffect(() => {
    fetch("/countries")
    .then(r => {
      if(r.ok){
        return r.json()
        .then(countries => {
          setAllCountries(countries)
        })
      }
    })
  }, [])

  //Fetch all states
  useEffect(() => {
    fetch("/states")
    .then(r => {
      if(r.ok){
        return r.json()
        .then(states => {
          setAllStates(states)
        })
      }
    })
  }, [])

  //Fetch all cities
  useEffect(() => {
    fetch("/cities")
    .then(r => {
      if(r.ok){
        return r.json()
        .then(cities => {
          setAllCities(cities)
        })
      }
    })
  }, [])

  //Fetch all boroughs
  useEffect(() => {
    fetch("/boroughs")
    .then(r => {
      if(r.ok){
        return r.json()
        .then(boroughs => {
          setAllBoroughs(boroughs)
        })
      }
    })
  }, [])

  //Fetch all neighbourhoods
  useEffect(() => {
    fetch("/neighbourhoods")
    .then(r => {
      if(r.ok){
        return r.json()
        .then(neighbourhoods => {
          setAllNeighbourhoods(neighbourhoods)
        })
      }
    })
  }, [])

  //Fetch all travelers
  useEffect(() => {
    fetch("/travelers")
    .then(r => {
      if(r.ok){
        return r.json()
        .then(travelers => {
          setAllTravelers(travelers)
        })
      }
    })
  }, [])

  //Fetch all businesses 
  useEffect(() => {
    fetch("/businesses")
    .then(r => {
      if(r.ok){
        return r.json()
        .then(businesses => {
          setAllBusinesses(businesses)
        })
      }
    })
  }, [])

  //Fetch all industries
  useEffect(() => {
    fetch("/industries")
    .then(r => {
      if(r.ok){
        return r.json()
        .then(industries => {
          setAllIndustries(industries)
        })
      }
    })
  }, [])

  //Fetch all visited countries
  useEffect(() => {
    fetch("/visitedcountries")
    .then(r => {
      if(r.ok){
        return r.json()
        .then(visitedCountry => {
          setVisitedCountries(visitedCountry)
        })
      }
    })
  }, [])

  //Fetch all countries wishlist
  useEffect(() => {
    fetch("/countrieswishlist")
    .then(r => {
      if(r.ok){
        return r.json()
        .then(wishlistCountry => {
          setCountriesWishlist(wishlistCountry)
        })
      }
    })
  }, [])

  console.log(loggedUser)

  //Fetch all profile pics
  useEffect(() => {
    fetch("/profilepics")
    .then(r => {
      if(r.ok){
        return r.json()
        .then(profilePic => {
          setAllProfilePictures(profilePic)
        })
      }
    })
  }, [])


  return (
    <div className="App">

      {loggedUser?.initial_signin?
        <HorizontalNav 
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
        />
        :
        null
      }

      <Outlet 
        context={{
          logo: logo,

          loggedUser: loggedUser,
          setLoggedUser: setLoggedUser,

          allUsers: allUsers,
          setAllUsers: setAllUsers,

          signUpContainer: signUpContainer,

          allCountries: allCountries,

          allStates: allStates,

          allCities: allCities,

          allBoroughs: allBoroughs,

          allNeighbourhoods: allNeighbourhoods,

          allTravelers: allTravelers,
          setAllTravelers: setAllTravelers,

          allBusinesses: allBusinesses,
          setAllBusinesses: setAllBusinesses,

          allIndustries: allIndustries,

          visitedCountries: visitedCountries,
          setVisitedCountries: setVisitedCountries,

          countriesWishlist: countriesWishlist,
          setCountriesWishlist: setCountriesWishlist,

          allProfilePictures: allProfilePictures,
          setAllProfilePictures: setAllProfilePictures
        }}
      />
    </div>
  );
}

export default App;
