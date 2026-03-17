import React, { useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function LauncherDetailsPage() {
    // variables
    const { id } = useParams()
    const [launcher, setLauncher] = useState({})
    const navigate = useNavigate()

    // useEffect 
    React.useEffect(() => {
        const launcherFetch = async () => {
            const res = await fetch(`http://localhost:3300/api/lauchers/${id}`)
            const launcher = await res.json()
            setLauncher(launcher)
        }
        try{
            launcherFetch()
        }
        catch(err){
            alert(err)
        }
    },[])

  // return
  return (
    <div className='launcher-details-page'>
        <Header title="launcher-details" />
        <div className='launcher-details-info'>
            <div>
            <label htmlFor="details-name">Name: </label>
            <h2 id="details-name">{launcher.laucherName}</h2>
            </div>
            <div>
            <label htmlFor="details-id">ID: </label>
            <h3 id="details-id">{launcher._id}</h3>
            </div>
            <div>
            <label htmlFor="details-rocket-type">Rocket type: </label>
            <h3 id="details-rocket-type">{launcher.rocketType}</h3>
            </div>
            <div>
            <label htmlFor="details-city">City: </label>
            <h3 id="details-city">{launcher.city}</h3>
            </div>
            <div>
            <label htmlFor="details-coordinates">Coordinates: </label>
            <h3>({launcher.latitude},{launcher.longitude})</h3>
            </div>
            <button onClick={() => navigate(`/update-launcher/${launcher._id}`)}>UPDATE</button>
        </div>
        <button onClick={() => navigate("/home")}>Home page</button>
    </div>
  )
}

export default LauncherDetailsPage