import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Testt() {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("/api/book/books");
            console.log(data)
            setData(response.data);
            setLoading(false);
          } catch (error) {
            setError(error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, [data]);
  return (
    <div>
      {console.log(data)}
    </div>
  )
}
