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
      const response = await axios.post("/cart/add", { username: user.username, product: product });
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
      const response = await axios.post("/cart/remove", { username: user.username, product: product });
      if(response.data.success){
        toast.error(response.data.success)
        onAddToCart()
      }
    }catch(error){
      console.log(error)
    }
  }
 
  return (
    <div className='border border-black rounded-lg p-4'>
      <img
        className='w-full h-72 object-cover rounded-lg hover:cursor-pointer'
        src={import.meta.env.VITE_APP_DOMAIN + image}
        onClick={() => navigate("/details",{state:isbn})}
        alt={name + " cover"}
      />
      <div className='pt-3'>
        <h2
          className='text-lg font-semibold overflow-hidden text-nowrap hover:cursor-pointer'
          onClick={() => navigate("/details",{state: isbn})}>
          {name}
        </h2>
        <p className='text-gray-600'>{author}</p>
        <p className='text-gray-800 font-semibold'>${price-Math.floor(price) !== 0 ? price: price+".00" }</p>
        {
          inCart ? 
          <button className='mt-4 w-full border-2 border-black py-2 px-4 rounded-lg hover:shadow-md' onClick={() => RemoveFromCart(isbn)}>In Cart</button>:
          <button className='mt-4 w-full bg-black text-white py-2 px-4 rounded-lg hover:shadow-md' onClick={() => AddToCart(isbn)}>Add to Cart</button>
        }
        
      </div>
    </div>
  );
}
