import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";
import BookElement from "../components/BookElement";


export default function Wishlist() {
  const { user, loading: userLoading } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(null);
  

  useEffect(() => {
    if (userLoading) return;
    
    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.post("/api/wishlist/load", { username: user.username });
          setData(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
      setError(new Error("User not logged in"));
    }
  }, [user, userLoading]);

  async function handleRemove(product){
    try{
      const response = await axios.post("/api/wishlist/remove", { username: user.username, product: product });
      setData(response.data)
      toast.error("Removed from wishlist")
    }catch(error){
      console.log(error)
    }
  }

  if (loading || userLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div id="main-wrapper" className="flex flex-col min-h-screen p-6">
      <h1 className="text-2xl md:text-4xl text-center">Wishlist</h1>
      <div id="desktop-wrapper" className="hidden md:flex flex-col pt-6 max-w-[80%]">
        <div className="grid grid-cols-4 w-full font-bold  border-b-2 border-black text-center">
          <p>Book</p>
          <p>Title</p>
          <p>Author</p>
          <p>Action</p>
        </div>
        {
          data.map((book) => (
            <div key={book.isbn_13} className='grid grid-cols-4 items-center p-6 text-center '>
              <img className='h-14 rounded-md mx-auto' src={import.meta.env.VITE_APP_DOMAIN + book.image_sm} alt={book.title} />
              <p className='text-md truncate'>{book.title}</p>
              <p className='text-gray-600'>{book.author}</p>
              <div>
                <button className='py-1 px-4  text-lg text-black border-2 border-black rounded hover:shadow-md' onClick={() => handleRemove(book.isbn_13)}>Remove</button>
              </div>
            </div>
          ))}
      </div>
      <div id="mobile-wrapper" className="flex flex-col md:hidden pt-2">
      <div className="flex justify-between font-bold border-b-2 border-black">
          <div className="flex gap-x-6">
            <p>Book</p>
            <p>Title</p>  
          </div>
          <p>Action</p>
      </div>
      <div>
      {
          data.map((book) => (
            <div key={book.isbn_13} className='flex items-center justify-between pt-4 gap-x-4'>
              <div className="flex gap-x-3 items-center">
                <img className='h-16 rounded-md' src={import.meta.env.VITE_APP_DOMAIN + book.image_sm} alt={book.title} />
                <div className="flex flex-col">
                  <p className='text-sm'>{book.title}</p>
                  <p className='text-gray-600 text-xs'>{book.author}</p>
              </div>
              </div>
              <div className="flex justify-center items-center">
                <button className='py-1 px-2  text-lg text-black border-2 border-black rounded hover:shadow-md' onClick={() => handleRemove(book.isbn_13)}>Remove</button>
              </div>
            </div>
          ))}
      </div>
      </div>
    </div>
  );
}
