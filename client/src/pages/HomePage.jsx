import React from 'react'
import Header from '../components/Header'

function HomePage() {

    const [lauchers, setLauchers] = React.useState([])
    const [typeFilter, setTypeFilter] = React.useState("")
    const [cityFilter, setCityFilter] = React.useState("")

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
        lauchersFetch()
    },[typeFilter, cityFilter])

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
                        <th>Rocket Type</th>
                        <th>City</th>
                        <th>More Details</th>
                    </tr>
                </thead>
                <tbody>
                    {lauchers.map((laucher) => (
                        <tr key={laucher.id}>
                            <td>{laucher.laucherName}</td>
                            <td>{laucher.rocketType}</td>
                            <td>{laucher.city}</td>
                            <td><button>...</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default HomePage