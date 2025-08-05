import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDoList from './ToDoModule.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ToDoList />} />
          <Route path="/bigTable" element={<p>a</p>} />

        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
