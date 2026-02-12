import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

const Home = () => {

  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  return (
    <div className='home flex justify-center items-center'>
      <div className="container flex justify-center items-center flex-col">

        <h1 className='text-center'>
          Stay Organized.<br/> Stay Productive.
        </h1>
        
        <p>
          Clear your mind, organize your work,<br/> and move forward with confidence.
        </p>

        <button
          onClick={() => {
            if (!email) {
              toast.error("Please sign in first");
              navigate("/signin");
            } else {
              navigate("/todo");
            }
          }}
          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
        >
          Make Todo list
        </button>

      </div>
    </div>
  )
}

export default Home