import React, {useState} from "react";
import {toast} from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/userContext";


export default function Login() {

  const navigate = useNavigate()

  const { user, setUser } = useContext(UserContext);


  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e){
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/login', {
        username: username,
        password: password
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setUser(data.success)
        toast.success('Login Successful');
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-svh justify-center items-center">
      <div id="main-container" className="flex flex-col border-2 border-black rounded-lg p-4 gap-y-6 items-center">
        <div id="image-container">
        <img className="w-60" src="/Logo.png" alt="Website Logo"/>
        </div>
        <h2 className="text-2xl md:text-3xl">Login to your account</h2>
        <input 
        className="p-2 border-2 w-full border-black rounded-md focus:border-none" 
        placeholder="Enter your username"
        value={username}
        onChange={(e) => {setUsername(e.target.value)}} 
        />
        <input 
        className="p-2 w-full border-2 border-black rounded-md focus:border-none" 
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={(e) => {setPassword(e.target.value)}} 
        />
        <button className="p-2 w-full bg-black text-white rounded-md" onClick={handleSubmit}>Login</button>
        <h5>Don't have an account?<button className="underline" onClick={() => {navigate('/register')}}>Sign Up</button></h5>
      </div>
    </div>
  );
}
