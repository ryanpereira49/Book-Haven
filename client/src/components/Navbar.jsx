import React from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function Navbar() {

  const navigate = useNavigate()

  const { user, setUser } = useContext(UserContext);

  async function handleLogout() {
    try {
      await axios.get('/logout');
      setUser(null);
      //navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }


  return (
   <div className="flex flex-row mx-4 px-4 pt-4">
    <div className="shrink-0 items-center justify-center sm:justify-start">
      <button onClick={() => {navigate('/')}}>
        <img className='w-60' src='/Logo.png' alt='Website Logo'/>
      </button>
    </div>
    <div className="sm:flex sm:flex-grow sm:justify-end hidden">
      <button className="mx-4 py-1 text-lg" onClick={() => {navigate('/')}}>Home</button>
      <button className="mx-4 py-1 text-lg" onClick={() => {navigate('/about')}}>About</button>
      <button className="mx-4 py-1 text-lg" onClick={() => {navigate('/contact')}}>Contact</button>
      {
        user ? (
        <>
        <button className="mx-4 py-1 text-lg" onClick={() => {navigate('/wishlist')}}>Hi {user.username}!</button>
        <button className="mx-4 py-1 px-4  text-lg bg-black text-white rounded hover:shadow-md" onClick={() => {navigate('/cart')}}>Cart</button>
        <button className="mx-4 py-1 px-3  text-lg border-2 border-black rounded hover:bg-black hover:text-white " onClick={handleLogout}>Log Out</button>
        </>) : (
          <>
          <button className="mx-4 py-1 px-3  text-lg border-2 border-black rounded hover:bg-black hover:text-white " onClick={() => {navigate('/login')}}>Login</button>
          <button className="mx-4 py-1 px-4  text-lg bg-black text-white rounded hover:shadow-md" onClick={() => {navigate('/register')}}>Sign Up</button>
          </>
        )
      }
      
    </div>
   </div>
  )
}
