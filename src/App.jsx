import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import Home from '../Components/Home/Home';
import Footer from '../Components/Footer/Footer';
import About from '../Components/About/About';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signin from '../Components/Sign in/Sign in';
import Todo from '../Components/Todo/Todo';
import Update from '../Components/Update/Update';
import Logout from '../Components/LogOut/Logout';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from '../Components/SignUp/SignUp';

const App = () => {
  return (
    <BrowserRouter>
      <div className='flex flex-col min-h-screen pb-14'>
        <Navbar />
          <Routes>
             <Route exact path="/" element={<Home/>}/>
             <Route path="/about" element={<About/>}/>
             <Route path="/todo" element={<Todo/>}/>
             <Route path="/SignUp" element={<SignUp/>}/>
             <Route path="/Signin" element={<Signin/>}/>
             <Route path="/update" element={<Update />} />
             <Route path="/LogOut" element={<Logout/>}/>

          </Routes>
        
        <Footer />
       
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="colored"
        />

      </div>
    </BrowserRouter>
  )
}


export default App
