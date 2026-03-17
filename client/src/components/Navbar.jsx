import React from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate()
    const { user, logout } = useAuthStore()

    function logoutFunc(){
        logout()
        navigate("/")
    }

    function getUserFunc(){
        alert("USERNAME: " + user.username + "\n" + "USER-TYPE: " + user.userType)
    }

  return (
    <div className='navbar'>
        <div className='navbar-left'>
            <button onClick={() => navigate("/home")}>home</button>
            {( user.userType === "intelligence-Corps" || user.userType === "system-administrator") && <button onClick={() => navigate("/add-laucher")}>add launcher</button>}
            {user.userType === "system-administrator" && <button onClick={() => navigate("/Register")}>Register</button>}
        </div>

        <div className='navbar-right'>
            <button onClick={getUserFunc}>get User</button>
            <button onClick={logoutFunc}>logout</button>
        </div>
    </div>
  )
}

export default Navbar