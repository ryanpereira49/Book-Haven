import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Footer() {

  const navigate = useNavigate()

  return (
  //   <div className='flex flex-row mx-4 px-4 pt-4 mb-4 border-2 border-t-black border-x-transparent border-b-transparent'>
  //   <div className="shrink-0 items-center justify-center sm:justify-start">
  //     <button onClick={() => {navigate('/')}}>
  //       <img className='w-60' src='/Logo.png' alt='Website Logo'/>
  //     </button>
  //   </div>
  //   <div className="sm:flex sm:flex-grow sm:justify-end hidden">
  //     <button className="mx-4 py-1 text-lg underline" onClick={() => {navigate('/about')}}>About</button>
  //     <button className="mx-4 py-1 text-lg underline" onClick={() => {navigate('/contact')}}>Contact</button>
  //     <button className="mx-4 py-1 text-lg underline" onClick={() => {navigate('/')}}>Ryan Pereira</button>
  //   </div>
  //  </div>
  <div className='flex flex-col md:flex-row items-center md:justify-between border-2 border-t-black border-x-transparent border-b-transparent mx-4 mb-4'>
    <button onClick={() => {navigate('/')}}>
      <img className='max-w-60 h-auto pt-4' src='/Logo.png' alt='Website Logo'/>
    </button>
    <div className='flex flex-col md:flex-row md:gap-x-4 mt-4 md:mt-0'>
      <button className="text-lg hover:underline" onClick={() => {navigate('/about')}}>About</button>
      <button className="text-lg hover:underline" onClick={() => {navigate('/contact')}}>Contact</button>
      <button className="text-lg hover:underline" onClick={() => {navigate('/')}}>Ryan Pereira</button>
    </div>
  </div>
  )
}
