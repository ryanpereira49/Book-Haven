import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Home from "../src/pages/Home"
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Navbar from "./components/Navbar";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Navbar/>
      <Toaster toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
