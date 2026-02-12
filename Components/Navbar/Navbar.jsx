import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("email");
    setOpen(false);            
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-gray-100 shadow-md border-b border-gray-100 h-18">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

         
          <Link
            to="/"
            className="tdl flex items-center gap-2 no-underline"
            onClick={() => setOpen(false)}  
          >
            <div className="bg-red-500 text-white font-bold px-2 py-1 rounded">
              t
            </div>
            <span className="text-xl font-semibold text-red-500">
              todo
            </span>
          </Link>

         
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

         
          <div
            className={`
              ${open ? "block" : "hidden"}
              absolute md:static
              top-16 left-0
              w-full md:w-auto
              bg-gray-100
              md:flex
              items-center
              gap-6
              text-sm
              p-4 md:p-0
              shadow-md md:shadow-none
              z-50
            `}
          >

           
            <Link className="nav-link" to="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link className="nav-link" to="/about" onClick={() => setOpen(false)}>
              About Us
            </Link>
            <Link className="nav-link" to="/todo" onClick={(e) => {setOpen(false);

               if (!email) {
                e.preventDefault();                 
                toast.error("Please sign in first"); 
                navigate("/signin");                 
              }
            }}> Todo
            </Link>

           
            {!email ? (
              <>
                <Link
                  to="/signup"
                  className="btn-red"
                  onClick={() => setOpen(false)}
                >
                  SignUp
                </Link>

                <Link
                  to="/signin"
                  className="btn-red"
                  onClick={() => setOpen(false)}
                >
                  SignIn
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="btn-red">
                Logout
              </button>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;