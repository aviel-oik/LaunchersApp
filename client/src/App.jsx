import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage'
import LauncherDetailsPage from './pages/LauncherDetailsPage'
import AddLaucherPage from './pages/AddLaucherPage'
import UpdateLauncherPage from './pages/UpdateLauncherPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UpdateUserPage from './pages/UpdateUserPage'
import { useAuthStore } from './store/authStore'
import React from 'react'

function App() {

  React.useEffect(() => {
    useAuthStore.getState().initAuthStore();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />  
        <Route path="/update-user/:id" element={<UpdateUserPage />} />   
        <Route path="/home" element={<HomePage />} />
        <Route path="/laucher-details/:id" element={<LauncherDetailsPage />} />
        <Route path="/update-launcher/:id" element={<UpdateLauncherPage />} />
        <Route path="/add-laucher" element={<AddLaucherPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
