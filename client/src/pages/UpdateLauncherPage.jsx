import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'


function UpdateLauncherPage() {
    // variable
    const { id } = useParams()
    const [newLauncher, setNewLauncher] = React.useState({})
    const [laucherUpdated, setLauncherUpdated] = React.useState(0)
    const navigate = useNavigate()

    // useEffect and function
    React.useEffect(() => {
        const launcherFetch = async () => {
            const res = await fetch(`http://localhost:3300/lauchers/${id}`)
            const launcher = await res.json()
            setNewLauncher(launcher)
        }
        launcherFetch()
    },[laucherUpdated])

    async function UpdateLauncher(){
        try{
            const res = await fetch(`http://localhost:3300/lauchers/${id}`,{
                method: "PUT",
                headers : {"Content-Type": "application/json"},
                body: JSON.stringify(newLauncher)
            })
            const result = await res.json()
            setLauncherUpdated(laucherUpdated+1)
            alert(result.message)
        }
        catch(err){
            alert(err)
        }
    }

  // return
  return (
    <div className='update-launcher-page'>
        <Header title="Update Laucher" />
        <form className='update-launcher-form' >
            <input type="text" placeholder='name...' value={newLauncher.laucherName} onChange={(e) => setNewLauncher({...newLauncher, laucherName: e.target.value})} />
            <select  name="" id="" value={newLauncher.rocketType} onChange={(e) => setNewLauncher({...newLauncher, rocketType: e.target.value})}>
                <option value="">choose a Rocket Type</option>
                <option value="Shahab3">Shahab3</option>
                <option value="Fetah110">Fetah110</option>
                <option value="Radwan">Radwan</option>
                <option value="Kheibar">Kheibar</option>
            </select>
            <div className='update-launcher-form-coordinates'>
                <label htmlFor="latitude">Latitude:</label>
                <input type="number" id="latitude" placeholder='latitude...' value={newLauncher.latitude} onChange={(e) => setNewLauncher({...newLauncher, latitude: e.target.value})} />
            </div>
            <div className='update-launcher-form-coordinates'>
                <label htmlFor="longitude">Longitude:</label>
                <input type="number" id="longitude" placeholder='longitude...' value={newLauncher.longitude} onChange={(e) => setNewLauncher({...newLauncher, longitude: e.target.value})} />
            </div>
            <input type="text" id="city" placeholder='city...' value={newLauncher.city} onChange={(e) => setNewLauncher({...newLauncher, city: e.target.value})} />
            <button type='button' onClick={UpdateLauncher}>Update</button>        
        </form>
        <button onClick={() => navigate("/")}>Home page</button>
    </div>
  )
}

export default UpdateLauncherPage