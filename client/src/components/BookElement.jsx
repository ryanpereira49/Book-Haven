import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";


export default function BookElement({image, name, author, price, isbn, inCart, onAddToCart}) {

  const navigate = useNavigate();
  const { user, loading: userLoading } = useContext(UserContext);

  async function AddToCart(product){
    try{
      const response = await axios.post("api/cart/add", { username: user.username, product: product });
      if(response.data.success){
        toast.success(response.data.success)
        onAddToCart()
      }
    }catch(error){
      console.log(error)
    }
  }

  async function RemoveFromCart(product){
    try{
      const response = await axios.post("api/cart/remove", { username: user.username, product: product });
      if(response.data.success){
        toast.error(response.data.success)
        onAddToCart()
      }
    }catch(error){
      console.log(error)
    }
  }
 
  return (
    <div className="flex flex-col border border-black rounded-lg p-3 gap-y-1">
      <img
        className='w-full h-3/4 object-cover rounded-lg hover:cursor-pointer'
        src={import.meta.env.VITE_APP_DOMAIN + image}
        onClick={() => navigate("/details",{state:isbn})}
        alt={name + " cover"}
      />
      <h2
        className='text-base md:text-base overflow-hidden text-nowrap font-semibold hover:cursor-pointer'
        onClick={() => navigate("/details",{state: isbn})}>
        {name}
      </h2>
      <p className='text-sm md:text-base font-light overflow-hidden text-nowrap'>{author}</p>
      <p className='text-sm md:text-base font-semibold'>${price-Math.floor(price) !== 0 ? price: price+".00" }</p>
      {  
        inCart ? 
        <button className='w-full border-2 border-black text-sm md:text-base py-2 px-4 rounded-lg hover:shadow-md' onClick={() => RemoveFromCart(isbn)}>In Cart</button>:
        user ? 
        <button className='w-full bg-black text-white text-sm md:text-base py-2 px-4 rounded-lg hover:shadow-md' onClick={() => AddToCart(isbn)}>Add to Cart</button>:
        <button className='w-full bg-black text-white text-sm md:text-base py-2 px-4 rounded-lg hover:shadow-md' onClick={() => navigate("/details",{state:isbn})}>Read More</button>
      }
    </div>
  );
}
