import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client'; // Import socket.io-client

const socket = io('http://localhost:3003'); 
function HomePage() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [addedMachineMessage, setAddedMachineMessage] = useState('');
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    socket.on('opcData', (data ) => {
      console.log('Received data:', data);
      // Do something with the received data, like updating state
    });

    axios.get('http://localhost:3003')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
          if (res.data.machineMessage) {
            setAddedMachineMessage(res.data.machineMessage);
          }
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch(err => console.log(err));

    // Fetch the list of machines
    axios.get('http://localhost:3003/get-machines')
      .then(res => {
        setMachines(res.data);
      })
      .catch(err => console.log(err));
      return () => {
        socket.off('opcData');
      };
  }, []);

  const handleDelete = () => {
    axios.get('http://localhost:3003/logout')
      .then(res => {
        window.location.reload(true);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='h-screen bg-gray-100'>
      {
        auth ?
          <div>
            <div className='flex items-center justify-between'>
              <h3>You are authorized{name}</h3>
              <div className='m-[10px]'>
                <button onClick={handleDelete} className="w-[100px] m-2 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Logout</button>
                <Link to="/add-machine" className="w-[120px] m-2 pl-2 pr-2 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">ADD Machine</Link>
              </div>
            </div>
            {addedMachineMessage && <div className="bg-green-200 p-2 mb-4 text-center">{addedMachineMessage}</div>}
            <h3>Machines:</h3>
            <ul className='flex flex-wrap'>
              {machines.map(machine => (
                <Link key={machine.id} to={`/data/${machine.id}`}>
                  <div className='h-[100px] w-[350px] bg-slate-50 m-2 p-2 '> 
                    <li>{machine.name}</li>
                    <li>{machine.endpoint_url}</li>
                  </div>
                </Link>
              ))}
            </ul>
          </div>
          :
          <div>
            <h3>{message}</h3>
            <h3>Login now</h3>
            <Link to="/login">Login</Link>
          </div>
      }
    </div>
  );
}

function DataPage() {
  const { machineId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3003/data/${machineId}`)
      .then(res => {
        setData(res.data.data); // Assuming the data is nested under the 'data' field
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [machineId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Data Page for Machine {machineId}</h2>
      {data && (
        <ul>
          {data.map(item => (
            <li key={item.nodeId}>
              Value-{item.value} timestamp- {item.timestamp} nodeId - {item.nodeId} browseName- {item.browseName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { HomePage, DataPage };
