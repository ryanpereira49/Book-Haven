import React from "react";

export default function BookElement({image, name, author, price}) {
  return (
    <div class="border border-black rounded-lg p-4">
        <img class="w-full h-72 object-cover rounded-lg" src={image} alt="Book Image"/>
        <div class="pt-3">
            <h2 class="text-lg font-semibold">{name}</h2>
            <p class="text-gray-600">{author}</p>
            <p class="text-gray-800 font-semibold">${price}</p>
            <button class="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg hover:shadow-md">Add to Cart</button>
        </div>
    </div>
  );
}
