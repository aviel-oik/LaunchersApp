import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Navbar from '../components/Navbar';

function UpdateUserPage() {
    // variables
    const { id } = useParams()
    const [userUpdated, setUserUpdated] = React.useState(0) 
    const [newUser, setNewUser] = React.useState({username: "", password: "", email: "", userType: ""})

    // useEffect and functions
    React.useEffect(() => {
      const userFetch = async () => {
        const token = localStorage.getItem("token")
        const res = await fetch(`http://localhost:3300/api/auth/user/${id}`,{
          headers : { "Authorization": `Barer ${token}`}
        })
        const user = await res.json()
        setNewUser(user)
      }
      userFetch()
    }, [userUpdated])

    async function updateUser() {
      try{
        const token = localStorage.getItem("token")
        const res = await fetch(`http://localhost:3300/api/auth/register/update/${id}`,{
          method: "PUT",
          headers : {"Content-Type": "application/json", "Authorization": `Barer ${token}`},
          body: JSON.stringify(newUser)
        })
        const result = await res.json()
        alert(result.message)
        setUserUpdated(userUpdated+1)
      }
      catch(err){
        alert(err.message)
      }
    }

  // return
  return (    
    <div className='update-user-page'>
      <Header title="Update User" />
      <Navbar />
        <form className='update-user-form'>
          <input type="text" placeholder='username...' value={newUser.username}  onChange={(e) => setNewUser({...newUser, username: e.target.value})}/>
          <input type="text" placeholder='passsword...' value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})}/>
          <input type="text" placeholder='email...' value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})}/>
          <select id="" value={newUser.userType} onChange={(e) => setNewUser({...newUser, userType: e.target.value})}>
            <option value="" >choose a user-type</option>
            <option value="intelligence-Corps">intelligence-Corps</option>
            <option value="air-Corps">air-Corps</option>
            <option value="system-administrator">system-administrator</option>
          </select>
          <button type='button' onClick={updateUser}>Update</button>
        </form>
    </div>
  )
}

export default UpdateUserPage