import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";

export default function Cart() {
  const { user, loading: userLoading } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let total = useRef(0)

  useEffect(() => {
    if (userLoading) return;

    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.post("/api/cart/load", { username: user.username });
          setData(response.data);
          setLoading(false);
          total.current = 0
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

  async function handleIncrement(product){
    try{
      const response = await axios.post("/api/cart/increment", { username: user.username, product: product });
      setData(response.data)
      total.current = 0
    }catch(error){
      console.log(error)
    }
  }

  async function handleDecrement(product){
    try{
      const response = await axios.post("/api/cart/decrement", { username: user.username, product: product });
      setData(response.data)
      total.current = 0
    }catch(error){
      console.log(error)
    }
  }

  function calculateTotal(price,quantity) {
    total.current = total.current + (price * quantity)
  }

  if (loading || userLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if(data == null){
    return(
      <div>

      </div>
    )
  }

  return (
    <div className='px-16 pt-4 h-svh'>
      <p className='text-5xl font-bold'>Cart</p>
      <div className='flex flex-row pt-4'>
        <div className='flex flex-col flex-grow'>
          <div className='grid grid-cols-4'>
            <p className='text-2xl font-semibold'>Book</p>
            <p className='text-2xl font-semibold'>Price</p>
            <p className='text-2xl font-semibold'>Quantity</p>
            <p className='text-2xl font-semibold'>Total</p>
          </div>
          {data.map((book) => (
            <div key={book.isbn_13} className='grid grid-cols-4 pt-6'>
              <div className='flex flex-row items-center'>
                <img className='h-auto w-10 rounded-md' src={import.meta.env.VITE_APP_DOMAIN + book.image_sm} alt={book.title} />
                <div className='pl-4 w-3/4'>
                  <p className='text-xl truncate '>{book.title}</p>
                  <p className='text-gray-600'>{book.author}</p>
                </div>
              </div>
              <p className='flex flex-row items-center'>${book.price}</p>
              <div className='flex flex-row items-center space-x-3 px-3'>
                <button 
                className='p-3 border-2 border-black rounded-lg h-1/2 flex items-center hover:bg-black hover:text-white'
                onClick={() => handleIncrement(book.isbn_13)}
                >
                  +
                </button>
                <p>{book.quantity}</p>
                {book.quantity == 1 ? (
                  <button 
                  className='p-3 border-2 border-black rounded-lg h-1/2  flex items-center hover:bg-black hover:text-white'
                  onClick={() => handleDecrement(book.isbn_13)}
                  >
                    x
                  </button>
                ) : (
                  <button 
                  className='p-3 border-2 border-black rounded-lg h-1/2  flex items-center hover:bg-black hover:text-white'
                  onClick={() => handleDecrement(book.isbn_13)}
                  >
                    -
                  </button>
                )}
              </div>
              <p className='flex flex-row items-center'>${(book.price * book.quantity).toFixed(2)}</p>
              {calculateTotal(book.price,book.quantity)}
            </div>
          ))}
        </div>
        <div className="shrink-0">
        <div className='flex flex-col shrink-0 border-2 border-black rounded-md p-4'>
          <input
            className='mb-4 p-2 border-2 w-full border-black rounded-md focus:border-transparent'
            placeholder='Promo Code?'
          />
          <div className='flex flex-col '>
            <div className='flex flex-row justify-between pt-2'>
              <p className='font-semibold text-xl'>Total:</p>
              <p className='font-semibold text-xl'>${total.current.toFixed(2)}</p>
            </div>
            <div className='flex flex-row justify-between pt-2'>
              <p className='font-semibold text-xl'>Tax (13%):</p>
              <p className='font-semibold text-xl'>${(total.current * 0.13).toFixed(2)}</p>
            </div>
            <div className='flex flex-row justify-between pt-2'>
              <p className='font-semibold text-xl'>Shipping:</p>
              <p className='font-semibold text-xl'>${((total.current * 0.05)).toFixed(2)}</p>
            </div>
            <div className='flex flex-row justify-between border-t-2 border-black pt-3 mt-2'>
              <p className='font-semibold text-xl'>Sub Total:</p>
              <p className='font-semibold text-xl'>${(total.current + (total.current * 0.13)+(total.current * 0.05)).toFixed(2)}</p>
            </div>
          </div>
          <button className='mt-4 p-2 w-full bg-black text-white rounded-md text-xl'>Checkout</button>
        </div>
        </div>
      </div>
    </div>
  );
}
