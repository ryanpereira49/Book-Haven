import React, { useEffect, useState } from "react";
import BookElement from "../components/BookElement";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import { ReactTyped } from "react-typed";

export default function Home() {
  const [data, setData] = useState(null);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(15);
  
  const { user, loading: userLoading } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/book/books");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [cart]);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const response = await axios.post("/api/cart/fetch", { username: user.username });
          setCart(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    fetchCart();
  }, [user]);

  const isInCart = (isbn) => {
    if (user && cart) { // Add a null check for cart
      return cart.some(item => item.product === isbn);
    }
    
  };

  const handleAddToCart = async () => {
    if(user){
      try {
        const response = await axios.post("/api/cart/fetch",{username: user.username});
        setCart(response.data);
      } catch (error) {
        console.log(error)
      }
    }
  };

  // Change grid item size according to window size
  useEffect(() => {
    const updatePostsPerPage = () => {
      if (window.innerWidth > 800) {
        setPostPerPage(15); // Large screens (more than 1200px)
      } else {
        setPostPerPage(12); // Small screens (less than 800px)
      }
    };

    updatePostsPerPage(); // Set initial value
    window.addEventListener("resize", updatePostsPerPage);

    return () => window.removeEventListener("resize", updatePostsPerPage); // Remove event listner when unmount
  },[])

  // Scroll Down by svh when called
  const handleScrollsvh = () => {
    window.scrollBy({
      top: window.innerHeight, // Scroll down by the viewport height
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);


  return (
    <div className='flex flex-col items-left px-6 md:px-12 overflow-hidden'>
      <div
        id='hero'
        className='flex flex-col justify-center items-baseline h-svh gap-y-3 md:gap-y-6 transform -translate-y-20'>
        <span className='text-[30px] md:text-[70px] text-pretty font-bold'>
          Where every book is a new{" "}
          <ReactTyped
            strings={[
              "adventure",
              "journey",
              "universe",
              "beginning",
              "discovery",
              "doorway",
              "wonder",
              "possibility",
              "horizon",
              "awakening",
              "revelation",
              "sanctuary",
              "treasure",
              "chronicle",
              "inspiration"
            ]} typeSpeed={50} loop backSpeed={10} showCursor={true} cursorChar="?"
          />
        </span>
        <span className='text-[17px] md:text-[40px] text-pretty font-semibold text-gray-600'>
          Discover your next great read with us!
        </span>
        <button
          className='bg-black rounded-md text-white px-4 py-3 text-lg md:text-[20px] font-semibold w-1/2 md:w-auto'
          onClick={handleScrollsvh}>
          Start Reading
        </button>
      </div>
      <div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 content-around'>
          {currentPosts.map((book) => (
            <BookElement
              key={book.isbn_13}
              image={book.image_sm}
              name={book.title}
              author={book.author}
              price={book.price}
              isbn={book.isbn_13}
              inCart={user ? isInCart(book.isbn_13) : false}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        <div className='py-8 flex justify-center'>
          <Pagination
            totalPosts={data.length}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
