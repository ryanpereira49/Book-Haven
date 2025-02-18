import React, {useState} from "react";
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from "axios";


export default function Contact() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubmit(e){
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/about/contact', {
        name: username,
        email: email,
        message: message
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success('Message sent');
        setUsername("")
        setEmail("")
        setMessage("")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-svh justify-center items-center">
      <div id="main-container" className="flex flex-col max-w-2xl border-2 border-black rounded-lg px-4 py-6 items-center gap-y-4">
        <div id="image-container" className="w-60 h-auto">
        <img className="" src="/Logo.png" alt="Website Logo"/>
        </div>
        <h2 className="text-2xl">Contact Us</h2>
        <input 
        className="p-2 border-2 w-full border-black rounded-md focus:border-transparent" 
        placeholder="Name"
        value={username}
        onChange={(e) => {setUsername(e.target.value)}} 
        />
        <input 
        className="p-2 w-full border-2 border-black rounded-md focus:border-transparent" 
        placeholder="Email"
        value={email}
        onChange={(e) => {setEmail(e.target.value)}} 
        />
        <textarea 
        className="p-2 w-full border-2 border-black rounded-md focus:border-transparent resize-y" 
        placeholder="Message"
        value={message}
        onChange={(e) => {setMessage(e.target.value)}} 
        />
        <button className="p-2 w-full bg-black text-white rounded-md" onClick={handleSubmit}>Submit</button>
      </div>
    </div>

);
}
