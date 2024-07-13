import React from "react";
import { useNavigate, Link } from "react-router-dom";


export default function BookElement({image, name, author, price, isbn}) {

  const navigate = useNavigate();

  return (
    <div className='border border-black rounded-lg p-4'>
      <img
        className='w-full h-72 object-cover rounded-lg hover:cursor-pointer'
        src={"http://" + image}
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
        <button className='mt-4 w-full bg-black text-white py-2 px-4 rounded-lg hover:shadow-md'>Add to Cart</button>
      </div>
    </div>
  );
}
