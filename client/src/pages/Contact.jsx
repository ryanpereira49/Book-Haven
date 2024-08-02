import React, {useState} from "react";
import {toast} from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios";


export default function Contact() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubmit(e){
    e.preventDefault()
    try {
      const { data } = await axios.post('/about/contact', {
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
    <div className="flex flex-col min-h-screen">
    <div className="w-screen mt-32 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center border-2 p-4 border-black rounded-md">
        <img className="mb-6 w-60" src="/Logo.png" alt="Website Logo"/>
        <div>
          <h2 className="mb-8 text-3xl">Contact Us</h2>
        </div>
        <input 
        className="mb-4 p-2 border-2 w-full border-black rounded-md focus:border-transparent" 
        placeholder="Name"
        value={username}
        onChange={(e) => {setUsername(e.target.value)}} 
        />
        <input 
        className="mb-4 p-2 w-full border-2 border-black rounded-md focus:border-transparent" 
        placeholder="Email"
        value={email}
        onChange={(e) => {setEmail(e.target.value)}} 
        />
        <textarea 
        className="mb-4 p-2 w-full border-2 border-black rounded-md focus:border-transparent resize-y" 
        placeholder="Message"
        value={message}
        onChange={(e) => {setMessage(e.target.value)}} 
        />
        <button className="mb-4 p-2 w-full bg-black text-white rounded-md" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
    </div>
  );
}
