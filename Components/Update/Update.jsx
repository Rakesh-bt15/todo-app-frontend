import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";


const Update = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { id, title, body } = location.state;

  const [newTitle, setNewTitle] = useState(title);
  const [newBody, setNewBody] = useState(body);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!newTitle || !newBody) {
      toast.error("Fields cannot be empty");
      return;
    }

    try {
      const email = localStorage.getItem("email");

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v2/updateTask/${id}`,
        { title: newTitle, body: newBody, email }
      );

      toast.success("Task Updated ✅");
      navigate("/todo", { state: { refresh: true } });

    } catch (error) {
      console.log(error);
      toast.error("Update Failed ❌");
    }
  };

  return (
    <div className="
      min-h-screen
      flex justify-center items-center
      bg-gray-100
      px-3 sm:px-4
    ">

      <div className="
        relative bg-white rounded shadow-md
        w-full
        max-w-sm
        sm:max-w-md
        md:max-w-lg
        lg:max-w-xl
        p-4 sm:p-6
      ">

        <button
          onClick={() => navigate("/todo")}
          className="
            absolute top-3 right-3
            text-xl sm:text-2xl
            text-gray-500 hover:text-red-500
          "
        >
          <IoClose />
        </button>

        <h2 className="
          font-semibold text-red-500 mb-4
          text-lg sm:text-xl md:text-2xl
        ">
          Update Task
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">

          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="
              w-full border rounded
              px-3 py-2
              text-sm sm:text-base
              focus:outline-none focus:ring-2 focus:ring-red-400
            "
          />

          <textarea
            rows="4"
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            className="
              w-full border rounded
              px-3 py-2
              text-sm sm:text-base
              focus:outline-none focus:ring-2 focus:ring-red-400
            "
          />

          <button
            type="submit"
            className="
              w-full bg-red-500 text-white rounded
              py-2
              text-sm sm:text-base
              hover:bg-red-600
              transition
            "
          >
            Update
          </button>

        </form>
      </div>
    </div>
  );
};

export default Update;