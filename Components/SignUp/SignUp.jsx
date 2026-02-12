import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const SignUp = () => {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
    alert("All fields are required");
    return;
    }
    
    if (!isValidEmail(form.email)) {
    alert("Please enter a valid email");
    return;
    }

    try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/register`,
      form
    );
    localStorage.setItem("email", form.email);
    alert(response.data.message);
    
    navigate("/todo", {
      state: { message: "New user registered!" }
    });

    

  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
    console.log(error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

        <h2 className="text-2xl font-semibold text-center text-red-500 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2   mb-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2   mb-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2  mb-2"
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Sign Up
          </button>

        </form>

      </div>
    </div>
  );
};

export default SignUp;