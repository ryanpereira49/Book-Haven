import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";


export default function Wishlist() {
  const { user, loading: userLoading } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    if (userLoading) return;
    
    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.post("/wishlist/load", { username: user.username });
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
      const response = await axios.post("/wishlist/remove", { username: user.username, product: product });
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
    <div className='px-16 pt-4 h-svh'>
      <p className='text-5xl font-bold'>Wishlist</p>
      <div className='flex flex-col flex-grow'>
        <div className='grid grid-cols-4'>
          <p className='text-2xl font-semibold'>Book</p>
          <p className='text-2xl font-semibold'>Author</p>
          <p className='text-2xl font-semibold'>Category</p>
          <p className='text-2xl font-semibold'>Action</p>
        </div>
        {data.map((book) => (
          <div key={book.isbn_13} className='grid grid-cols-4 pt-6'>
            <div className='flex flex-row items-center'>
              <img className='h-auto w-10 rounded-md' src={import.meta.env.VITE_APP_DOMAIN + book.image_sm} alt={book.title} />
              <div className='pl-4 w-3/4'>
                <p className='text-xl truncate'>{book.title}</p>
              </div>
            </div>
            <div className='flex flex-row items-center'>
                <p className='text-gray-600'>{book.author}</p>
              </div>
            <div className='flex flex-row items-center'>
              <p>{book.category}</p>
            </div>
            <div className='flex flex-row items-center'>
              <button className='py-1 px-4  text-lg text-black border-2 border-black rounded hover:shadow-md' onClick={() => handleRemove(book.isbn_13)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
