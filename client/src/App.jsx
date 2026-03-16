import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage'
import LauncherDetailsPage from './pages/LauncherDetailsPage'
import AddLaucherPage from './pages/AddLaucherPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/laucher-details" element={<LauncherDetailsPage />} />
        <Route path="/add-laucher" element={<AddLaucherPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
