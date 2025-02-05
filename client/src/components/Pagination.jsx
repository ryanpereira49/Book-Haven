import React from 'react'

export default function Pagination({totalPosts,postPerPage, setCurrentPage, currentPage}) {

    let pages = []

    for(let i=1; i <= Math.ceil(totalPosts/postPerPage); i++ ){
        pages.push(i)
    }

  return (
    <div>
      {
        pages.map((page,index)=>{
            return (
              <button
                className={
                  page == currentPage
                    ? "border-2 border-black rounded-full px-3 py-1 mx-3 bg-black text-white"
                    : "border-2 border-black rounded-full px-3 py-1 mx-3 my-1"
                }
                key={index}
                onClick={() => setCurrentPage(page)}>
                {page}
              </button>
            );
        })
      }
    </div>
  )
}
