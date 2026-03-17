import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {

    const [users, setUsers] = React.useState([])
    const [userdeleted, setUserDeleted] = React.useState(0)
    const [newUser, setNewUser] = React.useState({username: "", password: "", email: "", userType: ""})
    const navigate = useNavigate()

    React.useEffect(() => {
      const usersFetch = async () => {
        const res = await fetch("http://localhost:3300/api/auth/users")
        const users = await res.json()
        setUsers(users)
      }
      usersFetch()
    }, [userdeleted])

    async function registerUser() {
      try{
        const res = await fetch("http://localhost:3300/api/auth/register/create",{
          method: "POST",
          headers : {"Content-Type": "application/json"},
          body: JSON.stringify(newUser)
        })
        const result = await res.json()
        alert(result.message)
        setNewUser({username: "", password: "", email: "", userType: ""})
      }
      catch(err){
        alert(err.message)
      }
    }

    async function deleteUser(id){
      try{
          const res = await fetch(`http://localhost:3300/api/auth/register/delete/${id}`,{
              method: "DELETE"
          })
          const result = await res.json();
          setUserDeleted(userdeleted+1)
          alert(result.message)
      }
      catch(err){
          alert(err)
      }
    }

  return (
    <div className='register-page'>
      <Header title="Register" />
      <div className='register-user'>
        <form className='register-user-form'>
          <input type="text" placeholder='username...' value={newUser.username}  onChange={(e) => setNewUser({...newUser, username: e.target.value})}/>
          <input type="text" placeholder='passsword...' value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})}/>
          <input type="text" placeholder='email...' value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})}/>
          <select id="" value={newUser.userType} onChange={(e) => setNewUser({...newUser, userType: e.target.value})}>
            <option value="" >choose a user-type</option>
            <option value="intelligence-Corps">intelligence-Corps</option>
            <option value="air-Corps">air-Corps</option>
            <option value="system-administrator">system-administrator</option>
          </select>
          <button type='button' onClick={registerUser}>Register</button>
        </form>
      </div>
      <div className='users-list'>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>User-Type</th>
                        <th>Last Login</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.userType}</td>
                            <td>{user.last_login}</td>
                            <td>
                                <button onClick={() => navigate(`/update-user/${user._id}`)}>Update</button>
                            </td>
                            <td>
                                <button id='delete-launcher' onClick={() => deleteUser(user._id)} >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
      </div>
    </div>
  )
}

export default RegisterPage