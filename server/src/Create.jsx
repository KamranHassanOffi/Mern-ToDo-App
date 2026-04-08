import React, { useState } from 'react'
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

const Create = ({ onAdd }) => {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) return;

    axios.post(`${import.meta.env.Vite_React_Backend_Url}/add`, { task })
      .then(result => {
        setTask(""); // clear input

        // ✅ update UI without reload
        {location.reload()}
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="w-full">

      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 shadow-lg">

        {/* Input */}
        <input
          type="text"
          placeholder="✨ Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="flex-1 px-4 py-3 rounded-xl bg-transparent text-white placeholder-gray-300 outline-none"
        />

        {/* Add Button */}
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-3 rounded-xl 
          bg-gradient-to-r from-blue-500 to-indigo-600 
          hover:from-blue-600 hover:to-indigo-700 
          text-white font-medium shadow-md hover:scale-105 transition duration-300"
        >
          <FaPlus />
          Add
        </button>

      </div>

    </div>
  )
}

export default Create