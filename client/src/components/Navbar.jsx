import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { useState } from 'react';
import { UserContext } from "../context/userContext";

export default function Navbar() {

  const navigate = useNavigate()

  const { user, setUser } = useContext(UserContext);

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  async function handleLogout() {
    try {
      await axios.get('/api/logout');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }


  return (
    <div className='flex justify-between items-center px-4 pt-4'>
      <div id='logo'>
        <button
          onClick={() => {
            navigate("/");
          }}>
          <img className='max-w-60 h-auto' src='/Logo.png' alt='Website Logo' />
        </button>
      </div>
      {/* Desktop Navbar */}
      <div className='hidden md:block'>
        <button className='mx-4 py-1 text-lg' onClick={() => { navigate("/");}}>Home</button>
        <button className='mx-4 py-1 text-lg' onClick={() => {navigate("/about");}}>About</button>
        <button className='mx-4 py-1 text-lg' onClick={() => { navigate("/contact");}}>Contact</button>
        {user ? (
          <>
            <button className='mx-4 py-1 text-lg' onClick={() => {navigate("/wishlist");}}>Hi {user.username}!</button>
            <button className='mx-4 py-1 px-4  text-lg bg-black text-white rounded hover:shadow-md' onClick={() => {navigate("/cart");}}>Cart</button>
            <button className='mx-4 py-1 px-3  text-lg border-2 border-black rounded hover:bg-black hover:text-white' onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <button className='mx-4 py-1 px-3  text-lg border-2 border-black rounded hover:bg-black hover:text-white' onClick={() => {navigate("/login");}}>Login</button>
            <button className='mx-4 py-1 px-4  text-lg bg-black text-white rounded hover:shadow-md' onClick={() => {navigate("/register");}}>Sign Up</button>
          </>
        )}
      </div>
      {/* Mobile Navbar */}
      <div className='block md:hidden' onClick={handleNav}>
        {nav ? <>
          <button className='mx-4 py-1 px-3  text-lg border-2 border-black rounded'>X</button>
        </> : <>
        <button className='mx-4 py-1 px-4  text-lg bg-black text-white rounded hover:shadow-md'>+</button>
        </>}
      </div>
      <div
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-10'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%] z-10'
        }
      >
        <div id='nav-links-wrapper' className='flex flex-col items-center gap-y-3'>
        <button
          onClick={() => {
            navigate("/");
          }}>
          <img className='max-w-60 h-auto invert p-4 mt-3' src='/Logo.png' alt='Website Logo' />
        </button>
        <hr className='w-[60%]'/>
        <button className='mx-4 py-1 text-lg text-white' onClick={() => { navigate("/");handleNav()}}>Home</button>
        <button className='mx-4 py-1 text-lg text-white' onClick={() => {navigate("/about");handleNav()}}>About</button>
        <button className='mx-4 py-1 text-lg text-white' onClick={() => { navigate("/contact");handleNav()}}>Contact</button>
        <hr className='w-[60%]'/>
        {user ? (
          <>
            <button className='mx-4 py-1 text-lg text-white' onClick={() => {navigate("/wishlist");}}>Hi {user.username}!</button>
            <button className='mx-4 py-1 px-3  text-lg border-2 border-white text-white rounded' onClick={() => {navigate("/cart");handleNav()}}>Cart</button>
            <button className='mx-4 py-1 px-3  text-lg bg-white text-black rounded hover:shadow-md' onClick={() => {handleLogout();handleNav()}}>Log Out</button>
          </>
        ) : (
          <>
            <button className='mt-4 py-1 px-3  text-lg border-2 border-white text-white rounded' onClick={() => {navigate("/login");handleNav()}}>Login</button>
            <button className='mt-4 py-1 px-4  text-lg bg-white text-black rounded hover:shadow-md' onClick={() => {navigate("/register");handleNav()}}>Sign Up</button>
          </>
        )}
      </div>
      </div>
    </div>
  );
}
