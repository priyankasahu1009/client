import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function AddMachine() {
  const [values, setValues] = useState({
    name: '',
    endpoint_url: '',
    security_policy: '',
    message_mode: '',
    password: '',
    certificate: '',
    private_key: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3003/add-machine', values)
      .then((res) => {
        if (res.data.Status === "Success") {
          const machineName = values.name;
          setSuccessMessage(`Machine '${machineName}' added successfully!`);
          setTimeout(() => {
            navigate('/home');
          }, 2000); // Navigate to home page after 2 seconds
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="max-w-md bg-white rounded-lg w-[600px] shadow-md px-8 py-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Add Machine</h2>
        {successMessage && <div className="bg-green-200 p-2 mb-4 text-center">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              required
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              required
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Endpoint URL:</label>
            <input
              type="text"
              name="endpoint_url"
              value={values.endpoint_url}
              onChange={(e) => setValues({ ...values, endpoint_url: e.target.value })}
              required
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Security Policy:</label>
            <input
              type="text"
              name="security_policy"
              value={values.security_policy}
              onChange={(e) => setValues({ ...values, security_policy: e.target.value })}
              required
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message Mode:</label>
            <input
              type="text"
              name="message_mode"
              value={values.message_mode}
              onChange={(e) => setValues({ ...values, message_mode: e.target.value })}
              required
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Certificate:</label>
            <input
              type="text"
              name="certificate"
              value={values.certificate}
              onChange={(e) => setValues({ ...values, certificate: e.target.value })}
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Private Key:</label>
            <input
              type="text"
              name="private_key"
              value={values.private_key}
              onChange={(e) => setValues({ ...values, private_key: e.target.value })}
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Machine
          </button>
        </form>
        <Link to="/home" className='block text-center font-bold mt-4 text-gray-800'>Back to Home</Link>
      </div>
    </div>
  );
}

export default AddMachine;