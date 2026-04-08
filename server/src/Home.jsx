import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Create from './Create'
import { FaTrash, FaEdit } from 'react-icons/fa';

const Home = () => {
  const [Todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedTask, setUpdatedTask] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.Vite_React_Backend_Url}/delete/${id}`)
      .then(() => {
        setTodos(Todos.filter(todo => todo._id !== id))
      })
  }

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setUpdatedTask(todo.task);
  }

  const handleUpdate = () => {
    axios.put(`${import.meta.env.Vite_React_Backend_Url}/update/${editingTodo._id}`, { task: updatedTask })
      .then(() => {
        setTodos(Todos.map(todo =>
          todo._id === editingTodo._id
            ? { ...todo, task: updatedTask }
            : todo
        ))
        setEditingTodo(null);
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col items-center p-6">

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-white mb-8 tracking-wide">
        ✨ My Tasks
      </h1>

      {/* Create Box */}
      <div className="w-full max-w-md mb-6 backdrop-blur-lg bg-white/10 p-4 rounded-2xl shadow-xl border border-white/20">
        <Create />
      </div>

      {/* Todos */}
      <div className="w-full max-w-md space-y-4">
        {Todos.length === 0 ? (
          <div className="text-center text-gray-300 mt-10 text-lg">
            🚀 No tasks yet. Add one!
          </div>
        ) : (
          Todos.map((todo) => (
            <div
              key={todo._id}
              className="group flex justify-between items-center p-4 rounded-2xl 
              bg-white/10 backdrop-blur-md border border-white/20 
              shadow-lg hover:shadow-2xl hover:scale-[1.02] transition duration-300"
            >

              {/* Task Text */}
              <p className="text-white font-medium text-lg">
                {todo.task}
              </p>

              {/* Buttons */}
              <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition">
                <button
                  onClick={() => openEditModal(todo)}
                  className="p-2 rounded-full bg-blue-500/80 hover:bg-blue-600 text-white transition"
                >
                  <FaEdit size={14} />
                </button>

                <button
                  onClick={() => handleDelete(todo._id)}
                  className="p-2 rounded-full bg-red-500/80 hover:bg-red-600 text-white transition"
                >
                  <FaTrash size={14} />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {editingTodo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="bg-gray-900 text-white p-6 rounded-2xl w-80 shadow-2xl border border-gray-700">

            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

            <input
              type="text"
              value={updatedTask}
              onChange={(e) => setUpdatedTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingTodo(null)}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default Home