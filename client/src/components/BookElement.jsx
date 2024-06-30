import React from "react";

export default function BookElement({image, name, author, price, isbn}) {
  return (
    <div className="border border-black rounded-lg p-4">
        <img className="w-full h-72 object-cover rounded-lg" src={'http://'+image} alt="Book Image"/>
        <div className="pt-3">
            <h2 className="text-lg font-semibold overflow-hidden text-nowrap">{name}</h2>
            <p className="text-gray-600">{author}</p>
            <p className="text-gray-800 font-semibold">${price}</p>
            <button className="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg hover:shadow-md">Add to Cart</button>
        </div>
    </div>
  );
}
