import React from 'react';
import Header from '../components/Header'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


function AddLaucherPage() {
    // variables
    const [newLauncher, setNewLancher] = React.useState({laucherName: "", rocketType: "", latitude: 0, longitude: 0, city: ""})
    const navigate = useNavigate()

    // function
    const addLauncherFetch = async () => { 
        try{
            const token = localStorage.getItem("token")
            const res = await fetch("http://localhost:3300/api/lauchers",{
                method: "POST",
                headers : {"Content-Type": "application/json", "Authorization": `Barer ${token}`},
                body: JSON.stringify(newLauncher)
            })
            const result = await res.json()
            alert(result.message)
            setNewLancher({laucherName: "", rocketType: "", latitude: 0, longitude: 0, city: ""})
        }
        catch(err){
            alert(err.message)
        }
    }

  // return 
  return (
    <div className='add-launcher-page'>
        <Header title="Add Laucher" />
        <Navbar />
        <form className='add-launcher-form' >
            <input type="text" placeholder='name...' value={newLauncher.laucherName} onChange={(e) => setNewLancher({...newLauncher, laucherName: e.target.value})} />
            <select  name="" id="" value={newLauncher.rocketType} onChange={(e) => setNewLancher({...newLauncher, rocketType: e.target.value})}>
                <option value="">choose a Rocket Type</option>
                <option value="Shahab3">Shahab3</option>
                <option value="Fetah110">Fetah110</option>
                <option value="Radwan">Radwan</option>
                <option value="Kheibar">Kheibar</option>
            </select>
            <div className='add-launcher-form-coordinates'>
                <label htmlFor="latitude">Latitude:</label>
                <input type="number" id="latitude" placeholder='latitude...' value={newLauncher.latitude} onChange={(e) => setNewLancher({...newLauncher, latitude: e.target.value})} />
            </div>
            <div className='add-launcher-form-coordinates'>
                <label htmlFor="longitude">Longitude:</label>
                <input type="number" id="longitude" placeholder='longitude...' value={newLauncher.longitude} onChange={(e) => setNewLancher({...newLauncher, longitude: e.target.value})} />
            </div>
            <input type="text" id="city" placeholder='city...' value={newLauncher.city} onChange={(e) => setNewLancher({...newLauncher, city: e.target.value})} />
            <button type='button' onClick={addLauncherFetch}>Submit</button>        
        </form>
        <button onClick={() => navigate("/home")}>Home page</button>
    </div>
  )
}

export default AddLaucherPage