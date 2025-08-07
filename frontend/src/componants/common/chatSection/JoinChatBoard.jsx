import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
const api = import.meta.env.VITE_API_BASE_URL;

const socket = io('http://localhost:4000');

const JoinChatBoard = () => {

    const classid = useParams();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState();
  const [input, setInput] = useState('');


  useEffect(() => {
    axios.get(`${api}/auth/getusers`, {
      headers: {
        "Authorization": "bearer " + localStorage.getItem("tokeId")
      }
    }).then((res) => {
      if (!res) {
        return toast.error("user is not found")
      }
      setUser(res.data.result);
    }).catch((error) => {
      console.log(`user profile error : ${error}`)
    })
  }, []);

  // Load messages on mount
  useEffect(() => {
    axios.get(`${api}/chat/all/${classid?.id}`)
      .then(res => setMessages(res.data.result)).catch((error) => console.log("get all chat error" ,error))
  }, []);

    console.log("messages",messages)
  // Listen for incoming messages
  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off('chat message');
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    const newMsg = {
      sender: user?._id, // replace with logged in user
      message: input,
      classId:classid.id,
    };

    await axios.post(`${api}/chat/send`, newMsg);
    socket.emit('chat message', newMsg);
    setInput('');
  };
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className='tittle color d-flex justify-content-between'>
            <span># ChatBoard</span>
          </div>

          <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid gray', padding: '1rem' }}>
            {messages.map((msg, i) => (
              <div key={i}><strong>{msg?.sender?.name || 'User'} : </strong> {msg?.message}</div>
            ))}
          </div>
          <form onSubmit={sendMessage}>
            <div className="col-sm-6 mt-3 d-flex">
              <input className='form-control' placeholder='...' value={input} onChange={(e) => setInput(e.target.value)} required />
              <button className='btn btn-primary mx-3' type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default JoinChatBoard;
