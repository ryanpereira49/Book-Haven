import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import axios from "axios";
import BookElement from "../components/BookElement";
import toast from "react-hot-toast";

export default function Details() {
  const { state } = useLocation();

  const { user, loading: userLoading } = useContext(UserContext);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recom, setRecom] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [InWishlist, SetInWishlist] = useState(false);
  const [overflow, setOverflow] = useState("hidden");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/book/details", { isbn: state });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [state]);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const response = await axios.post("/api/cart/fetch", { username: user.username });
          const cartData = response.data;
          setInCart(cartData.some((item) => item.product === state));
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (user) {
      fetchCart();
    }
  }, [user, state]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const response = await axios.post("/api/wishlist/get", { username: user.username });
          const wishlistData = response.data;
          SetInWishlist(wishlistData.some((item) => item === state));
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (user) {
      fetchWishlist();
    }
  }, [user, state]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (data) {
        try {
          const response = await axios.post("/api/book/recommendation", {
            category: data.category,
            isbn: data.isbn_13,
          });
          setRecom(response.data);
        } catch (error) {
          setError(error);
        }
      }
    };

    fetchRecommendations();
  }, [data]);

  async function AddToCart(product) {
    try {
      const response = await axios.post("/api/cart/add", { username: user.username, product: product });
      if (response.data.success) {
        toast.success(response.data.success);
        setInCart(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function RemoveFromCart(product) {
    try {
      const response = await axios.post("/api/cart/remove", { username: user.username, product: product });
      if (response.data.success) {
        toast.error(response.data.success);
        setInCart(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function AddToWishlist(product) {
    try {
      const response = await axios.post("/api/wishlist/add", { username: user.username, product: product });
      if (response.data.success) {
        toast.success(response.data.success);
        SetInWishlist(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function RemoveFromWishlist(product) {
    try {
      const response = await axios.post("/api/wishlist/remove_min", { username: user.username, product: product });
      if (response.data.success) {
        toast.error(response.data.success);
        SetInWishlist(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleOverflow() {
    if (overflow === "hidden") {
      setOverflow("y-scroll");
    } else {
      setOverflow("hidden");
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='p-6 md:p-8'>
      {/* Image and info wrapper */}
      <div className='flex flex-col items-center md:items-start md:flex-row gap-3 md:gap-8'>
        {/* Book Cover Image */}
        <img
          className='w-3/4 md:w-max max-h-max rounded-lg'
          src={import.meta.env.VITE_APP_DOMAIN + data.image_sm}
          alt={data.title + " cover"}
        />
        {/* Book Info Section */}
        <div className='flex flex-col items-center md:items-start text-justify'>
          <p className='font-bold text-2xl md:text-3xl'>{data.title}</p>
          <p className='font-semibold pt-2 md:pt-3'>{data.author}</p>
          <p className='font-bold text-xl pt-2 md:pt-3'>
            ${data.price - Math.floor(data.price) !== 0 ? data.price : data.price + ".00"}
          </p>
          <div className='flex flex-col md:flex-row w-full pt-2 md:pt-4 gap-2 md:gap-4'>
            {inCart ? (
              <button
                className='border-2 border-black py-2 px-4 rounded-lg hover:shadow-md'
                onClick={() => RemoveFromCart(data.isbn_13)}>
                Remove From Cart
              </button>
            ) : (
              <button
                className='border-2 border-black py-2 px-4 rounded-lg hover:shadow-md'
                onClick={() => user? AddToCart(data.isbn_13): toast.error("Please login in to use cart","warning")}>
                Add to Cart
              </button>
            )}
            {InWishlist ? (
              <button
                className=' bg-black text-white py-2 px-4 rounded-lg hover:shadow-md'
                onClick={() => RemoveFromWishlist(data.isbn_13)}>
                Remove from Wishlist
              </button>
            ) : (
              <button
                className=' bg-black text-white py-2 px-4 rounded-lg hover:shadow-md'
                onClick={() => user? AddToWishlist(data.isbn_13): toast.error("Please login to use wishlist")}>
                Add to Wishlist
              </button>
            )}
          </div>
          <div className='p-2 md:p-3 mt-2 md:mt-4 border-2 border-black rounded-lg'>
            <p className={`h-40 overflow-${overflow}`} onClick={() => handleOverflow()}>
              {data.overview}
            </p>
          </div>
          {/* Misc Info */}
          <div className='flex flex-col md:flex-row pt-3 md:mt-4 gap-x-4'>
            <p className=''>ISBN 13: {data.isbn_13} </p>
            <p className=''>ISBN 10: {data.isbn_10} </p>
            <p className=''>Category: {data.category}</p>
            <p className=''>Publisher: {data.publisher}</p>
            <p className=''>Page Count: {data.page_count}</p>
          </div>
        </div>
      </div>
      {/* Read More */}
      <div>
        <p className='text-4xl text-gray-800 pt-3 font-semibold'>Read More</p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-7 content-around pt-3'>
          {recom &&
            recom.map((book) => (
              <BookElement
                key={book.isbn_13}
                image={book.image_sm}
                name={book.title}
                author={book.author}
                price={book.price}
                isbn={book.isbn_13}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
