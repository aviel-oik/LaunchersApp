import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

function LoginPage() {

  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const navigate = useNavigate()
  const { login } = useAuthStore()

  async function loginUser() {
    try{
      const res = await fetch("http://localhost:3300/api/auth/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      })

      const result = await res.json()
      if (res.ok) {
        localStorage.setItem("token", result.token)
        login(result.user, result.token)
        navigate("/home")
      } 
      else 
        alert(result.message)
    } 
    catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className='login-page'>
      <Header title="Login" />
      <form className='login-page-form' >
        <input type="text" placeholder='username...' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder='password...' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='button' onClick={loginUser}>Login</button>
      </form>
    </div>
   )
}

export default LoginPage