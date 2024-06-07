import React, {useState} from "react";
import {toast} from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios";


export default function Login() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e){
    e.preventDefault()
    console.log(username,password)
  
  }

  return (
    <div className="w-screen mt-32 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center border-2 p-4 border-black rounded-md">
        <img className="mb-6 w-60" src="/Logo.png" alt="Website Logo"/>
        <div>
          <h2 className="mb-8 text-3xl">Log in to your account</h2>
        </div>
        <input 
        className="mb-4 p-2 border-2 w-full border-black rounded-md focus:border-none" 
        placeholder="Enter your username"
        value={username}
        onChange={(e) => {setUsername(e.target.value)}} 
        />
        <input 
        className="mb-4 p-2 w-full border-2 border-black rounded-md focus:border-none" 
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={(e) => {setPassword(e.target.value)}} 
        />
        <button className="mb-4 p-2 w-full bg-black text-white rounded-md" onClick={handleSubmit}>Login</button>
        <h5>Don't have an account ?<button className="underline" onClick={() => {navigate('/register')}}> Sign Up?</button></h5>
      </div>
    </div>
  );
}
