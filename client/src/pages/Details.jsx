import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BookElement from "../components/BookElement";

export default function Details() {
  const { state } = useLocation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recom, setRecom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/book/details", { isbn: state });
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
    const fetchRecommendations = async () => {
      if (data) {
        try {
          const response = await axios.post("/book/recommendation", { category: data.category, isbn: data.isbn_13 });
          setRecom(response.data);
        } catch (error) {
          setError(error);
        }
      }
    };

    fetchRecommendations();
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="px-32 pt-16">
      <div className="flex flex-row">
        <div className="flex-shrink-0">
          <img
            className="w-full h-[500px] object-cover rounded-lg"
            src={"http://" + data.image_lg}
            alt={data.title + " cover"}
          />
        </div>
        <div className="pl-8 pt-8 flex-grow">
          <p className="text-6xl font-bold">{data.title}</p>
          <p className="text-4xl text-gray-600 pt-3">{data.author}</p>
          <p className="text-4xl text-gray-800 pt-3 font-semibold">
            ${data.price - Math.floor(data.price) !== 0 ? data.price : data.price + ".00"}
          </p>
          <div className="overflow-y-auto h-40">
            <p className="text-xl text-gray-600 pt-3">{data.overview}</p>
          </div>
          <div className="flex flex-row w-full mt-8">
            <button className="mr-3 w-1/2 border-2 border-black py-2 px-4 rounded-lg hover:shadow-md text-xl">
              Add to Cart
            </button>
            <button className="ml-3 w-1/2 bg-black text-white py-2 px-4 rounded-lg hover:shadow-md text-xl">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex flex-row pt-1">
          <pre className="text-xl text-gray-800">ISBN 13: </pre>
          <p className="text-xl text-gray-600">{data.isbn_13}</p>
        </div>
        <div className="flex flex-row pt-1">
          <pre className="text-xl text-gray-800">ISBN 10: </pre>
          <p className="text-xl text-gray-600">{data.isbn_10}</p>
        </div>
        <div className="flex flex-row pt-1">
          <pre className="text-xl text-gray-800">Category: </pre>
          <p className="text-xl text-gray-600">{data.category}</p>
        </div>
        <div className="flex flex-row pt-1">
          <pre className="text-xl text-gray-800">Publisher: </pre>
          <p className="text-xl text-gray-600">{data.publisher}</p>
        </div>
        <div className="flex flex-row pt-1">
          <pre className="text-xl text-gray-800">Page Count: </pre>
          <p className="text-xl text-gray-600">{data.page_count}</p>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-4xl text-gray-800 pt-3 font-semibold">Read More</p>
        <div className="grid grid-cols-5 gap-7 content-around mt-8 mb-8">
          {recom && recom.map((book) => (
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
