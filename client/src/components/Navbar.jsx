import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Navbar() {

  const navigate = useNavigate()

  return (
   <div className="flex flex-row mx-4 p-4">
    <div className="shrink-0 items-center justify-center sm:justify-start">
      <button onClick={() => {navigate('/')}}>
        <img className='w-60' src='/Logo.png' alt='Website Logo'/>
      </button>
    </div>
    <div className="sm:flex sm:flex-grow sm:justify-end hidden">
      <button className="mx-4 py-1 text-lg" onClick={() => {navigate('/')}}>Search</button>
      <button className="mx-4 py-1 text-lg" onClick={() => {navigate('/')}}>Home</button>
      <button className="mx-4 py-1 text-lg" onClick={() => {navigate('/')}}>Categories</button>
      <button className="mx-4 py-1 px-3  text-lg border-2 border-black rounded hover:bg-black hover:text-white " onClick={() => {navigate('/login')}}>Login</button>
      <button className="mx-4 py-1 px-4  text-lg bg-black text-white rounded hover:shadow-md" onClick={() => {navigate('/register')}}>Sign Up</button>
    </div>

   </div>
  )
}
