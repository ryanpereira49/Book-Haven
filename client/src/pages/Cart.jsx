import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";

export default function Cart() {
  const { user, loading: userLoading } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let total = useRef(0);

  useEffect(() => {
    if (userLoading) return;

    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.post("/api/cart/load", { username: user.username });
          setData(response.data);
          setLoading(false);
          total.current = 0;
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

  async function handleIncrement(product) {
    try {
      const response = await axios.post("/api/cart/increment", { username: user.username, product: product });
      setData(response.data);
      total.current = 0;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDecrement(product) {
    try {
      const response = await axios.post("/api/cart/decrement", { username: user.username, product: product });
      setData(response.data);
      total.current = 0;
    } catch (error) {
      console.log(error);
    }
  }

  function calculateTotal(price, quantity) {
    total.current = total.current + price * quantity;
  }

  if (loading || userLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data == null) {
    return <div></div>;
  }

  return (
    <div id='main-wrapper' className='flex flex-col md:items-center min-h-screen p-6 md:p-0'>
      <h1 className='text-2xl md:text-4xl text-center pt-4'>Cart</h1>
      <div id='desktop-wrapper' className='hidden md:flex px-6 pt-6 gap-x-6 w-[80%]'>
        <div id='book-list'>
          <div className='grid grid-cols-4 border-black border-b-2 gap-6'>
            <p>Book</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
          </div>
          {data.map((book) => (
            <div key={book.isbn_13} className='grid grid-cols-4 mt-3 gap-6'>
              <div className='flex gap-x-2 overflow-hidden'>
                <img
                  className='h-16 rounded-md'
                  src={import.meta.env.VITE_APP_DOMAIN + book.image_sm}
                  alt={book.title}
                />
                <div>
                  <p className='truncate'>{book.title}</p>
                  <p className=''>{book.author}</p>
                </div>
              </div>
              <p className='flex flex-row items-center'>${book.price}</p>
              <div id='quantity-buttons-mobile' className='flex items-center gap-x-3'>
                <button
                  className='border-2 border-black rounded-full px-2 flex items-center justify-center text-xl hover:text-white hover:bg-black'
                  onClick={() => handleIncrement(book.isbn_13)}>
                  +
                </button>
                <p className='text-xl'>{book.quantity}</p>
                {book.quantity === 1 ? (
                  <button
                    className='border-2 border-black rounded-full px-2 flex items-center justify-center text-xl hover:text-white hover:bg-black'
                    onClick={() => handleDecrement(book.isbn_13)}>
                    x
                  </button>
                ) : (
                  <button
                    className='border-2 border-black rounded-full px-2 flex items-center justify-center text-xl hover:text-white hover:bg-black'
                    onClick={() => handleDecrement(book.isbn_13)}>
                    -
                  </button>
                )}
                {calculateTotal(book.price, book.quantity)}
              </div>
              <p className='flex flex-row items-center'>${(book.price * book.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div id='checkout-section' className='pt-6'>
          <div id='content-wrapper' className='flex flex-col  border-2 border-black rounded-md gap-y-3 p-3'>
            <input
              className='p-2 border-2 border-black rounded-md focus:border-transparent'
              placeholder='Promo Code?'
            />
            <div className='flex justify-between'>
              <p className='font-semibold text-lg'>Total:</p>
              <p className=''>${total.current.toFixed(2)}</p>
            </div>
            <div className='flex justify-between'>
              <p className='font-semibold text-lg'>Tax (13%):</p>
              <p className=''>${(total.current * 0.13).toFixed(2)}</p>
            </div>
            <div className='flex justify-between'>
              <p className='font-semibold text-lg'>Shipping:</p>
              <p className=''>${(total.current * 0.05).toFixed(2)}</p>
            </div>
            <div className='flex justify-between'>
              <p className='font-semibold text-lg'>Sub Total:</p>
              <p className=''>${(total.current + total.current * 0.13 + total.current * 0.05).toFixed(2)}</p>
            </div>
            <button className='p-2 bg-black text-white rounded-md font-semibold'>Checkout</button>
          </div>
        </div>
      </div>
      <div id='mobile-wrapper' className="md:hidden">
        <div className='book-list-mobile'>
          <div id='book-list-mobile'>
            <div className='flex justify-between font-bold border-b-2 border-black'>
              <div className='flex gap-x-6'>
                <p>Book</p>
                <p>Title</p>
              </div>
              <p>Total</p>
            </div>
            <div>
              {data.map((book) => (
                <div id='book-info' className='flex flex-col'>
                  <div key={book.isbn_13} className='flex items-center justify-between pt-4 gap-x-4'>
                    <div className='flex gap-x-3 items-center'>
                      <img
                        className='h-16 rounded-md'
                        src={import.meta.env.VITE_APP_DOMAIN + book.image_sm}
                        alt={book.title}
                      />
                      <div className='flex flex-col'>
                        <p className='text-sm'>{book.title}</p>
                        <p className='text-gray-600 text-xs'>{book.author}</p>
                      </div>
                    </div>
                    <div className='flex justify-center items-center'>
                      <p className='flex flex-row items-center'>${(book.price * book.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  <div id='quantity-buttons' className='flex pt-2 justify-end items-center gap-x-3'>
                    <button
                      className='border-2 border-black rounded-full px-2 flex items-center justify-center text-xl hover:text-white hover:bg-black'
                      onClick={() => handleIncrement(book.isbn_13)}>
                      +
                    </button>
                    <p className='text-xl'>{book.quantity}</p>
                    {book.quantity === 1 ? (
                      <button
                        className='border-2 border-black rounded-full px-2 flex items-center justify-center text-xl hover:text-white hover:bg-black'
                        onClick={() => handleDecrement(book.isbn_13)}>
                        x
                      </button>
                    ) : (
                      <button
                        className='border-2 border-black rounded-full px-2 flex items-center justify-center text-xl hover:text-white hover:bg-black'
                        onClick={() => handleDecrement(book.isbn_13)}>
                        -
                      </button>
                    )}
                    {calculateTotal(book.price, book.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id='checkout-section-mobile' className='pt-6'>
            <div id='content-wrapper' className='flex flex-col  border-2 border-black rounded-md gap-y-3 p-3'>
              <input
                className='p-2 border-2 border-black rounded-md focus:border-transparent'
                placeholder='Promo Code?'
              />
              <div className='flex justify-between'>
                <p className='font-semibold text-lg'>Total:</p>
                <p className=''>${total.current.toFixed(2)}</p>
              </div>
              <div className='flex justify-between'>
                <p className='font-semibold text-lg'>Tax (13%):</p>
                <p className=''>${(total.current * 0.13).toFixed(2)}</p>
              </div>
              <div className='flex justify-between'>
                <p className='font-semibold text-lg'>Shipping:</p>
                <p className=''>${(total.current * 0.05).toFixed(2)}</p>
              </div>
              <div className='flex justify-between'>
                <p className='font-semibold text-lg'>Sub Total:</p>
                <p className=''>${(total.current + total.current * 0.13 + total.current * 0.05).toFixed(2)}</p>
              </div>
              <button className='p-2 bg-black text-white rounded-md font-semibold'>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
