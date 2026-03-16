import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'


function HomePage() {
    // variables
    const [lauchers, setLauchers] = React.useState([])
    const [typeFilter, setTypeFilter] = React.useState("")
    const [cityFilter, setCityFilter] = React.useState("")
    const [laucherDeleted, setLauncherDeleted] = React.useState(0)
    const navigate = useNavigate()

    // useEffect and Function
    React.useEffect(() => {
        const lauchersFetch = async () => {
            const res = await fetch("http://localhost:3300/lauchers")
            const lauchers = await res.json()
            let filteredLauchers = lauchers
            if(typeFilter !== "")
                filteredLauchers = lauchers.filter(l => l.rocketType === typeFilter)
            if(cityFilter !== "")
                filteredLauchers = filteredLauchers.filter(l => l.city === cityFilter)
            setLauchers(filteredLauchers)
        }
        try{
            lauchersFetch()
        }
        catch(err){
            alert(err)
        }
    },[typeFilter, cityFilter, laucherDeleted])

    async function deleteLauncher(id){
        try{
            const res = await fetch(`http://localhost:3300/lauchers/${id}`,{
                method: "DELETE"
            })
            const result = await res.json();
            setLauncherDeleted(laucherDeleted+1)
            alert(result.message)
        }
        catch(err){
            alert(err)
        }
    }

  // return
  return (
    <div className='home-page'>
        <Header title="Lauchers List" />
        <div className='home-filter'>
            <input className='home-inputFilter' type="text" placeholder='Enter City name...' onChange={(e) => setCityFilter(e.target.value)}/>
            <select className='home-inputFilter' name="type-filter" id="type-filter" onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="">choose a Rocket Type</option>
                <option value="Shahab3">Shahab3</option>
                <option value="Fetah110">Fetah110</option>
                <option value="Radwan">Radwan</option>
                <option value="Kheibar">Kheibar</option>
            </select>
        </div>
        <div className='home-lauchers-list'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Rocket Type</th>
                        <th>More Details</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {lauchers.map((laucher) => (
                        <tr key={laucher._id}>
                            <td>{laucher.laucherName}</td>
                            <td>{laucher.city}</td>
                            <td>{laucher.rocketType}</td>
                            <td>
                                <button onClick={() => navigate(`/laucher-details/${laucher._id}`)}>Click for more detail</button>
                            </td>
                            <td>
                                <button id='delete-launcher' onClick={() => deleteLauncher(laucher._id)} >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <button id='add-launcher' onClick={() => navigate("/add-laucher")}>Add Launcher</button>
    </div>
  )
}

export default HomePage