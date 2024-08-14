import React, { useState } from 'react'
import {toast} from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function Register() {

  const navigate = useNavigate()

  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();
  
    if (password === confirmPassword) {
      try {
        const { data } = await axios.post('/api/register', {
          username: username,
          email: email,
          password: password,
        });
        if (data.error) {
          toast.error(data.error);
        } else {
          setUser(data.success);
          toast.success('Registration Successful');
          navigate('/')
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Password doesn't match!");
    }
  }


  return (
    <div className="flex flex-col min-h-screen">
    <div className="w-screen mt-24 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center border-2 p-4 border-black rounded-md">
        <img className="mb-6 w-60" src="/Logo.png" alt="Website Logo"/>
        <div>
          <h2 className="mb-8 text-3xl">Create a new account</h2>
        </div>
        <input 
        className="mb-4 p-2 border-2 w-full border-black rounded-md focus:border-none" 
        placeholder="Create a username"
        value={username}
        onChange={(e) => {setUsername(e.target.value)}} 
        />
        <input 
        className="mb-4 p-2 w-full border-2 border-black rounded-md focus:border-none" 
        placeholder="Enter your email"
        type='email'
        value={email}
        onChange={(e) => {setEmail(e.target.value)}} 
        />
        <input 
        className="mb-4 p-2 w-full border-2 border-black rounded-md focus:border-none" 
        placeholder="Enter your password"
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}  
        />
        <input 
        className="mb-4 p-2 w-full border-2 border-black rounded-md focus:border-none" 
        placeholder="Confirm password"
        type='password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        <button className="mb-4 p-2 w-full bg-black text-white rounded-md" onClick={handleSubmit}>Sign Up</button>
        <h5>Already have an account ?<button className="underline" onClick={() => {navigate('/login')}}> Log In?</button></h5>
      </div>
    </div>
    </div>
  )
}
