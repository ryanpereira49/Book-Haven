import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Footer() {

  const navigate = useNavigate()

  return (
    <div className='flex flex-row mx-4 px-4 pt-4 mb-4 border-2 border-t-black border-x-transparent border-b-transparent'>
    <div className="shrink-0 items-center justify-center sm:justify-start">
      <button onClick={() => {navigate('/')}}>
        <img className='w-60' src='/Logo.png' alt='Website Logo'/>
      </button>
    </div>
    <div className="sm:flex sm:flex-grow sm:justify-end hidden">
      <button className="mx-4 py-1 text-lg underline" onClick={() => {navigate('/about')}}>About</button>
      <button className="mx-4 py-1 text-lg underline" onClick={() => {navigate('/contact')}}>Contact</button>
      <button className="mx-4 py-1 text-lg underline" onClick={() => {navigate('/')}}>Ryan Pereira</button>
    </div>
   </div>
  )
}
