import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import BookElement from "../components/BookElement";
import axios from "axios"; // Make sure axios is imported

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(15)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/book/books");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Add dependency array to ensure useEffect runs only once

  if (loading) {
    return <div>Loading...</div>; // Correctly render loading state
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Correctly render error state
  }

  return (
    <div>
      <div className='p-28 mx-4 mt-20'>
        <span className='text-[70px] font-bold text-left'>
          Where every book is a new adventure
        </span>
        <br />
        <span className='text-[40px] font-semibold text-gray-600'>
          Discover your next great read with us!
        </span>
        <br />
        <button className='bg-black rounded-md text-white px-4 py-3 text-[20px] font-semibold mt-8'>
          Start reading
        </button>
      </div>
      <div className='px-24 py-3'>
        <div className='grid grid-cols-5 gap-7 content-around'>
          {data.map((book) => (
            <BookElement
              key={book.isbn_13}
              image={book.image_sm}
              name={book.title}
              author={book.author}
              price={book.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
