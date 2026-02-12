import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GrDocumentUpdate } from "react-icons/gr";
import axios from "axios";
import { toast } from "react-toastify";


const Todo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [todos, setTodos] = useState([]);

  const email = localStorage.getItem("email");

  
  useEffect(() => {

    const fetchTodos = async () => {
      if (!email) return;

      try {
        const userRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/getUserByEmail/${email}`
        );

        const userId = userRes.data._id;

        const todoRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v2/getTasks/${userId}`
        );

        setTodos(todoRes.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchTodos();

  }, [email, location.state]); 


  
  const addTodo = async () => {
    if (!title || !body) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v2/addTask`,
        { title, body, email }
      );

      setTodos([...todos, res.data]);
      setTitle("");
      setBody("");

      toast.success("Task created ✅");

    } catch (err) {
      console.log(err);
    }
  };


  
  const removeTodo = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v2/deleteTask/${id}`,
        { data: { email } }
      );

      setTodos(todos.filter((t) => t._id !== id));
      toast.success("Task deleted 🗑");

    } catch (err) {
      console.log(err);
    }
  };


  return (
  <div className="min-h-screen bg-gray-100 px-3 sm:px-6 py-6 sm:py-10">
    <div className="w-full md:max-w-xl mx-auto mb-8 sm:mb-10">
      <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
        <input
          type="text"
          placeholder="TITLE"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 border-none outline-none text-sm sm:text-base"
        />
        <textarea
          placeholder="BODY"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border-none outline-none resize-none text-sm sm:text-base"
        />

      </div>
      <div className="flex justify-end mt-3">
        <button
          onClick={addTodo}
          className="
            bg-red-500 text-white
            px-3 py-1 sm:px-4 sm:py-2
            rounded shadow
            text-sm sm:text-base
          "
        >
          Add
        </button>
      </div>
    </div>

    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-4 sm:gap-6
      "
    >

      {todos.map((t) => (
        <div
          key={t._id}
          className="
            bg-white border rounded shadow-sm
            p-3 sm:p-4
            flex flex-col justify-between
          "
        >
          <div>
            <h3 className="font-semibold mb-2 text-base sm:text-lg lg:text-xl">
              {t.title}
            </h3>

            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              {t.body}
            </p>
          </div>

          <div className="flex justify-end gap-3 text-lg sm:text-xl">
            <button
              onClick={() =>
                navigate("/update", {
                  state: {
                    id: t._id,
                    title: t.title,
                    body: t.body,
                  },
                })
              }
            >
              <GrDocumentUpdate />
            </button>

            <button onClick={() => removeTodo(t._id)}>
              🗑️
            </button>

          </div>
        </div>
      ))}

    </div>

  </div>
  );
}

export default Todo;