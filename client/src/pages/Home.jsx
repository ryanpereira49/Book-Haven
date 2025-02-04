import React, { useEffect, useState } from "react";
import BookElement from "../components/BookElement";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

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
    // <div>
    //   <div className='p-28 mx-4 mt-20'>
    //     <span className='text-[70px] font-bold text-left'>Where every book is a new adventure</span>
    //     <br />
    //     <span className='text-[40px] font-semibold text-gray-600'>Discover your next great read with us!</span>
    //     <br />
    //     <button className='bg-black rounded-md text-white px-4 py-3 text-[20px] font-semibold mt-8'>
    //       Start reading
    //     </button>
    //   </div>
    //   <div className='px-24 py-3'>
    //     <div className='grid grid-cols-5 gap-7 content-around'>
    //       {currentPosts.map((book) => (
    //         <BookElement
    //           key={book.isbn_13}
    //           image={book.image_sm}
    //           name={book.title}
    //           author={book.author}
    //           price={book.price}
    //           isbn={book.isbn_13}
    //           inCart={user ? isInCart(book.isbn_13): false}
    //           onAddToCart={handleAddToCart}
    //         />
    //       ))}
    //     </div>
    //     <div className="pt-8 mb-8 flex justify-center">
    //       <Pagination totalPosts={data.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col items-center px-6 md:px-12 overflow-hidden">
      <div id='hero' className='flex flex-col justify-center items-baseline h-svh gap-y-3 md:gap-y-6 transform -translate-y-20'>
        <span className='text-[30px] md:text-[70px] text-pretty font-bold'>Where every book is a new adventure</span>
        <span className='text-[17px] md:text-[40px] text-pretty font-semibold text-gray-600'>
          Discover your next great read with us!
        </span>
        <button className='bg-black rounded-md text-white px-4 py-3 text-lg md:text-[20px] font-semibold w-1/2 md:w-auto'>
          Start Reading
        </button>
      </div>
      <div>
        <div className='grid grid-cols-5 gap-7 content-around'>
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
        <div className='pt-8 mb-8 flex justify-center'>
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
