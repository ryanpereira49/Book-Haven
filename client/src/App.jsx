import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Home from "../src/pages/Home"
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Navbar from "./components/Navbar";
import Details from "./pages/Details";
import Footer from "./components/Footer";
import { UserContextProvider } from "../src/context/userContext";
import Cart from "./pages/Cart";
import Contact from './pages/Contact';
import Wishlist from "./pages/Wishlist";
import About from "./pages/About"

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Toaster toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/details' element={<Details />} />
          <Route path='/cart' element={<Cart />}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/wishlist' element={<Wishlist/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
        <Footer />
      </UserContextProvider>
    </>
  );
}

export default App;
