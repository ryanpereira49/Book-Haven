import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import BookElement from "../components/BookElement";

export default function Home() {
  return (
    <div>
      <div className='p-28 mx-4 mt-20'>
        <span className="text-[70px] font-bold text-left">Where every book is a new adventure</span>
        <br/>
        <span className="text-[40px] font-semibold text-gray-600">Discover your next great read with us!</span>
        <br/>
        <button className="bg-black rounded-md text-white px-4 py-3 text-[20px] font-semibold mt-8">Start reading</button>
      </div>
      <div className='px-24 py-3'>
        <div className='grid grid-cols-5 gap-7 content-around'>
          <BookElement image="/bookimg.png" name="test" author="test" price="19.9"/>
          <BookElement image="/booksm.webp" name="test" author="test" price="19.9"/>
        </div>
      </div>
    </div>
  );
}
