import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook

function LoginForm() {
  
  const navigate = useNavigate(); // Initialize useNavigate hook
  axios.defaults.withCredentials=true;
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3003/login', values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/home');
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md bg-white rounded-lg shadow-md px-8 py-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
              className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              required
              className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        <Link to="/" className=' font-bold mb-4 flex justify-center mt-[20px] items-center  text-gray-800'>Registration</Link>
      </div>
    </div>
  );
}

export default LoginForm;
