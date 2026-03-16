import React from 'react';
import Header from '../components/Header'

function AddLaucherPage() {

    const [newLauncher, setNewLancher] = React.useState({laucherName: "", rocketType: "", latitude: null, longitude: null, city: ""})

    const addLauncherFetch = async () => { // try/catch
        const res = await fetch("http://localhost:3300/lauchers",{
            methode: "POST",
            headers : {"Content-Type": "application/json"},
            body: JSON.stringify(newLauncher)
        })
        const result = res.json()
        alert(result.message)
    }

  return (
    <div className='add-laucher-page'>
        <Header title="Add Laucher" />
        <form >
            <input type="text" placeholder='name...' onChange={(e) => setNewLancher({...newLauncher, laucherName: e.target.value})} />
            <select  name="" id="" onChange={(e) => setNewLancher({...newLauncher, rocketType: e.target.value})}>
                <option value="">choose a Rocket Type</option>
                <option value="Shahab3">Shahab3</option>
                <option value="Fetah110">Fetah110</option>
                <option value="Radwan">Radwan</option>
                <option value="Kheibar">Kheibar</option>
            </select>
            <input type="number" placeholder='latitude...' onChange={(e) => setNewLancher({...newLauncher, latitude: e.target.value})} />
            <input type="number" placeholder='longitude...' onChange={(e) => setNewLancher({...newLauncher, longitude: e.target.value})} />
            <input type="text" placeholder='city' onChange={(e) => setNewLancher({...newLauncher, city: e.target.value})} />
            <button type='button' onClick={addLauncherFetch}>Submit</button>        
        </form>
    </div>
  )
}

export default AddLaucherPage