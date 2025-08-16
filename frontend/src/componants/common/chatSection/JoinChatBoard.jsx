// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import { Link, useParams } from 'react-router-dom';
// const api = import.meta.env.VITE_API_BASE_URL;

// const socket = io('http://localhost:4000');

// const JoinChatBoard = () => {

//     const classid = useParams();
//   const [messages, setMessages] = useState([]);
//   const [user, setUser] = useState();
//   const [input, setInput] = useState('');


//   useEffect(() => {
//     axios.get(`${api}/auth/getusers`, {
//       headers: {
//         "Authorization": "bearer " + localStorage.getItem("tokeId")
//       }
//     }).then((res) => {
//       if (!res) {
//         return toast.error("user is not found")
//       }
//       setUser(res.data.result);
//     }).catch((error) => {
//       console.log(`user profile error : ${error}`)
//     })
//   }, []);

//   // Load messages on mount
//   useEffect(() => {
//     axios.get(`${api}/chat/all/${classid?.id}`)
//       .then(res => setMessages(res.data.result)).catch((error) => console.log("get all chat error" ,error))
//   }, []);

//     console.log("messages",messages)
//   // Listen for incoming messages
//   useEffect(() => {
//     socket.on('chat message', (msg) => {
//       setMessages(prev => [...prev, msg]);
//     });

//     return () => socket.off('chat message');
//   }, []);

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     const newMsg = {
//       sender: user?._id, // replace with logged in user
//       message: input,
//       classId:classid.id,
//     };

//     await axios.post(`${api}/chat/send`, newMsg);
//     socket.emit('chat message', newMsg);
//     setInput('');
//   };
//   return (
//     <>
//       <div className="container-fluid">
//         <div className="container">
//           <div className='tittle color d-flex justify-content-between'>
//             <span># ChatBoard</span>
//           </div>

//           <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid gray', padding: '1rem' }}>
//             {messages.map((msg, i) => (
//               <div key={i}><strong>{msg?.sender?.name || 'User'} : </strong> {msg?.message}</div>
//             ))}
//           </div>
//           <form onSubmit={sendMessage}>
//             <div className="col-sm-6 mt-3 d-flex">
//               <input className='form-control' placeholder='...' value={input} onChange={(e) => setInput(e.target.value)} required />
//               <button className='btn btn-primary mx-3' type="submit">Send</button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default JoinChatBoard;










// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import { useParams } from 'react-router-dom';

// const api = import.meta.env.VITE_API_BASE_URL;
// const socket = io('http://localhost:4000');

// const JoinChatBoard = () => {
//   const classid = useParams();
//   const [messages, setMessages] = useState([]);
//   const [user, setUser] = useState();
//   const [input, setInput] = useState('');
//   const [file, setFile] = useState(null);

//   // File select handler
//   const fileHandler = (event) => {
//     const selectedFile = event.target.files[0];
//     if (!selectedFile) return;

//     const reader = new FileReader();
//     reader.readAsDataURL(selectedFile); // convert to Base64
//     reader.onload = () => {
//       setFile({
//         data: reader.result,      // Base64 string
//         type: selectedFile.type,  // mimetype: image/png, video/mp4, pdf
//         name: selectedFile.name,  // optional: file name
//       });
//     };
//     console.log("reader", reader.result)
//   };

//   // Load user
//   useEffect(() => {
//     axios
//       .get(`${api}/auth/getusers`, {
//         headers: {
//           Authorization: 'bearer ' + localStorage.getItem('tokeId'),
//         },
//       })
//       .then((res) => {
//         if (!res) {
//           return toast.error('user is not found');
//         }
//         setUser(res.data.result);
//       })
//       .catch((error) => {
//         console.log(`user profile error : ${error}`);
//       });
//   }, []);

//   // Load old messages
//   useEffect(() => {
//     axios
//       .get(`${api}/chat/all/${classid?.id}`)
//       .then((res) => setMessages(res.data.result))
//       .catch((error) => console.log('get all chat error', error));
//   }, [classid]);

//   // Listen for incoming socket messages
//   useEffect(() => {
//     socket.on('chat message', (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//     return () => socket.off('chat message');
//   }, []);

//   // File Reader function
//   // const readFileAsBase64 = (file) => {
//   //   return new Promise((resolve, reject) => {
//   //     const reader = new FileReader();
//   //     reader.onload = () => resolve(reader.result);
//   //     reader.onerror = reject;
//   //     reader.readAsDataURL(file); // Base64 string banega
//   //   });
//   // };

//   // Send Message Function
//   console.log("file", file)
//   const sendMessage = async (e) => {
//     e.preventDefault();

//     if (!input && !file) {
//       toast.error("Please add text or file");
//       return;
//     }

//     const newMsg = {
//       sender: user?._id,
//       message: input,
//       fileUrl: file?.data, // Base64 string
//       fileType: file?.type,
//       classId: classid.id,
//     };
//     console.log("newMsg",newMsg)

//     try {
//       const res =  await axios.post(`${api}/chat/send`, newMsg);
//       console.log(res.data);
//       if(!res){
//         toast.error("internal server error")
//       }
//       socket.emit('chat message', newMsg);
//       setInput('');
//       setFile(null);
//     } catch (err) {
//       toast.error('Message not sent');
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="container">
//           <div className="tittle color d-flex justify-content-between">
//             <span># ChatBoard</span>
//           </div>

//           {/* Messages Area */}
//           <div
//             style={{
//               height: '300px',
//               overflowY: 'scroll',
//               border: '1px solid gray',
//               padding: '1rem',
//             }}
//           >
//             {messages.map((msg, i) => (
//               <div key={i} style={{ marginBottom: '10px' }}>
//                 <div className='d-flex justify-content-between py-3 border-top'>
//                   <div>
//                 <strong>{msg?.sender?.name || 'User'} : </strong>
//                 {msg?.message && <span>{msg.message}</span>}
//                   </div>
//                 <strong>{msg?.createdAt}</strong>
//                 </div>

//                 {/* Image */}
//                 {msg?.fileType?.startsWith('image/') && msg.fileUrl && (
//                   <div>
//                     <img
//                       src={msg?.fileUrl}
//                       alt="img"
//                       style={{
//                         maxWidth: '200px',
//                         display: 'block',
//                         marginTop: '5px',
//                       }}
//                     />
//                   </div>
//                 )}

//                 {/* Video */}
//                 {msg?.fileType?.startsWith('video/') && msg.fileUrl && (
//                   <div>
//                     <video
//                       controls
//                       style={{
//                         maxWidth: '300px',
//                         display: 'block',
//                         marginTop: '5px',
//                       }}
//                     >
//                       <source src={msg.fileUrl} type={msg.fileType} />
//                     </video>
//                   </div>
//                 )}

//                 {/* PDF */}
//                 {msg?.fileType === 'application/pdf' && msg.fileUrl && (
//                   <div>
//                     <a
//                       href={msg.fileUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       style={{
//                         color: 'blue',
//                         textDecoration: 'underline',
//                       }}
//                     >
//                       📄 View PDF
//                     </a>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Input Area */}
//           <form onSubmit={sendMessage}>
//             <div className="col-sm-6 mt-3 d-flex">
//               <input
//                 className="form-control"
//                 placeholder="Type a message..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//               />
//               <input
//                 type="file"
//                 name="file"
//                 className="form-control mx-2"
//                 onChange={fileHandler}
//               />
//               <button className="btn btn-primary mx-3" type="submit">
//                 Send
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default JoinChatBoard;












// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import { useParams } from 'react-router-dom';

// const api = import.meta.env.VITE_API_BASE_URL;
// const socket = io('http://localhost:4000');

// const JoinChatBoard = () => {
//   const classid = useParams();
//   const [messages, setMessages] = useState([]);
//   const [user, setUser] = useState();
//   const [input, setInput] = useState('');
//   const [file, setFile] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);

//   // File select handler
//   const fileHandler = (event) => {
//     const selectedFile = event.target.files[0];
//     if (!selectedFile) return;

//     const reader = new FileReader();
//     reader.readAsDataURL(selectedFile); // convert to Base64
//     reader.onload = () => {
//       setFile({
//         data: reader.result,
//         type: selectedFile.type,
//         name: selectedFile.name,
//       });
//     };
//   };

//   // Load user
//   useEffect(() => {
//     axios
//       .get(`${api}/auth/getusers`, {
//         headers: {
//           Authorization: 'bearer ' + localStorage.getItem('tokeId'),
//         },
//       })
//       .then((res) => setUser(res.data.result))
//       .catch((error) => console.log(`user profile error : ${error}`));
//   }, []);

//   // Load old messages
//   useEffect(() => {
//     axios
//       .get(`${api}/chat/all/${classid?.id}`)
//       .then((res) => setMessages(res.data.result))
//       .catch((error) => console.log('get all chat error', error));
//   }, [classid]);

//   // Listen for socket messages
//   useEffect(() => {
//     socket.on('chat message', (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//     return () => socket.off('chat message');
//   }, []);

//   // Send Message Function
//   const sendMessage = async (e) => {
//     e.preventDefault();

//     if (!input && !file) {
//       toast.error("Please add text or file");
//       return;
//     }

//     const newMsg = {
//       sender: user?._id,
//       message: input,
//       fileUrl: file?.data,
//       fileType: file?.type,
//       classId: classid.id,
//     };

//     try {
//       const res = await axios.post(`${api}/chat/send`, newMsg);
//       if (!res) {
//         toast.error("internal server error");
//       }
//       socket.emit('chat message', newMsg);
//       setInput('');
//       setFile(null);
//     } catch (err) {
//       toast.error('Message not sent');
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="container">
//           <div className="tittle color d-flex justify-content-between">
//             <span># ChatBoard</span>
//           </div>

//           {/* Messages Area */}
//           <div
//             style={{
//               height: '300px',
//               overflowY: 'scroll',
//               border: '1px solid gray',
//               padding: '1rem',
//             }}
//           >
//             {messages.map((msg, i) => (
//               <div key={i} style={{ marginBottom: '10px' }}>
//                 <div className="d-flex justify-content-between py-3 border-top">
//                   <div>
//                     <strong>{msg?.sender?.name || 'User'} : </strong>
//                     {msg?.message && <span>{msg.message}</span>}
//                   </div>
//                   <strong>{msg?.createdAt}</strong>
//                 </div>

//                 {/* Image */}
//                 {msg?.fileType?.startsWith('image/') && msg.fileUrl && (
//                   <img
//                     src={msg?.fileUrl}
//                     alt="img"
//                     style={{ maxWidth: '200px', display: 'block', marginTop: '5px' }}
//                   />
//                 )}

//                 {/* Video */}
//                 {msg?.fileType?.startsWith('video/') && msg.fileUrl && (
//                   <video controls style={{ maxWidth: '300px', display: 'block', marginTop: '5px' }}>
//                     <source src={msg.fileUrl} type={msg.fileType} />
//                   </video>
//                 )}

//                 {/* PDF */}
//                 {msg?.fileType === 'application/pdf' && msg.fileUrl && (
//                   <a
//                     href={msg.fileUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{ color: 'blue', textDecoration: 'underline' }}
//                   >
//                     📄 View PDF
//                   </a>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Input Area */}
//           <form onSubmit={sendMessage} className="d-flex align-items-center mt-3 p-2 border rounded" style={{ background: "#f8f9fa" }}>
//             {/* Attachment Button */}
//             <div className="position-relative mx-2">
//               <button
//                 type="button"
//                 className="btn btn-light"
//                 onClick={() => setShowOptions(!showOptions)}
//               >
//                 📎
//               </button>

//               {/* Options (Image, Video, PDF) */}
//               {showOptions && (
//                 <div
//                   className="position-absolute p-2 border rounded bg-white shadow"
//                   style={{ bottom: "50px", left: "0" }}
//                 >
//                   <label className="d-block" style={{ cursor: "pointer" }}>
//                     🖼️ Image
//                     <input type="file" accept="image/*" hidden onChange={fileHandler} />
//                   </label>
//                   <label className="d-block mt-2" style={{ cursor: "pointer" }}>
//                     🎥 Video
//                     <input type="file" accept="video/*" hidden onChange={fileHandler} />
//                   </label>
//                   <label className="d-block mt-2" style={{ cursor: "pointer" }}>
//                     📄 PDF
//                     <input type="file" accept="application/pdf" hidden onChange={fileHandler} />
//                   </label>
//                 </div>
//               )}
//             </div>

//             {/* Input Field */}
//             <input
//               className="form-control mx-2"
//               placeholder="Type a message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//             />

//             {/* Send Button */}
//             <button className="btn btn-primary" type="submit">
//               ➤
//             </button>
//           </form>
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default JoinChatBoard;














import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

const api = import.meta.env.VITE_API_BASE_URL;
const socket = io("http://localhost:4000");

const JoinChatBoard = () => {
  const classid = useParams();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState();
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);

  // File select handler
  const fileHandler = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile); // convert to Base64
    reader.onload = () => {
      setFile({
        data: reader.result, // Base64 string
        type: selectedFile.type,
        name: selectedFile.name,
      });
    };
  };

  // Load user
  useEffect(() => {
    axios
      .get(`${api}/auth/getusers`, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("tokeId"),
        },
      })
      .then((res) => {
        if (!res) {
          return toast.error("user is not found");
        }
        setUser(res.data.result);
      })
      .catch((error) => {
        console.log(`user profile error : ${error}`);
      });
  }, []);

  // Load old messages
  useEffect(() => {
    axios
      .get(`${api}/chat/all/${classid?.id}`)
      .then((res) => setMessages(res.data.result))
      .catch((error) => console.log("get all chat error", error));
  }, [classid]);

  // Listen for incoming socket messages
  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("chat message");
  }, []);

  // Send Message Function
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!input && !file) {
      toast.error("Please add text or file");
      return;
    }

    const newMsg = {
      sender: user?._id,
      message: input,
      fileUrl: file?.data,
      fileType: file?.type,
      classId: classid.id,
    };

    try {
      const res = await axios.post(`${api}/chat/send`, newMsg);
      if (!res) {
        toast.error("internal server error");
      }
      socket.emit("chat message", newMsg);
      setInput("");
      setFile(null);
      toast(res.data.message)
    } catch (err) {
      toast.error("Message not sent");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="container mediaFonts">
          <div className="tittle color d-flex justify-content-between">
            <span># ChatBoard</span>
          </div>

          {/* Messages Area */}
          <div
            style={{
              height: "300px",
              overflowY: "scroll",
              border: "1px solid gray",
              padding: "1rem",
            }}
          >
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <div className="d-flex justify-content-between py-3 border-top">
                  <div>
                    <strong>{msg?.sender?.name || "User"} : </strong>
                    {msg?.message && <span>{msg.message}</span>}
                  </div>
                  <strong>{msg?.createdAt}</strong>
                </div>

                {/* Image */}
                {msg?.fileType?.startsWith("image/") && msg.fileUrl && (
                  <div>
                    <img
                      src={msg?.fileUrl}
                      alt="img"
                      style={{
                        maxWidth: "200px",
                        display: "block",
                        marginTop: "5px",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                )}

                {/* Video */}
                {msg?.fileType?.startsWith("video/") && msg.fileUrl && (
                  <div>
                    <video
                      controls
                      style={{
                        maxWidth: "300px",
                        display: "block",
                        marginTop: "5px",
                        borderRadius: "8px",
                      }}
                    >
                      <source src={msg.fileUrl} type={msg.fileType} />
                    </video>
                  </div>
                )}

                {/* PDF */}
                {msg?.fileType === "application/pdf" && msg.fileUrl && (
                  <div>
                    <a
                      href={msg.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                      }}
                    >
                      📄 View PDF
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* File Preview */}
          {file && (
            <div
              style={{
                marginTop: "10px",
                border: "1px solid #ccc",
                padding: "8px",
                borderRadius: "8px",
                display: "inline-block",
                position: "relative",
              }}
            >
              {/* Image Preview */}
              {file.type.startsWith("image/") && (
                <img
                  src={file.data}
                  alt="preview"
                  style={{ width: "80px", height: "80px", borderRadius: "8px" }}
                />
              )}

              {/* Video Preview */}
              {file.type.startsWith("video/") && (
                <video
                  src={file.data}
                  style={{ width: "100px", borderRadius: "8px" }}
                  muted
                />
              )}

              {/* PDF Preview */}
              {file.type === "application/pdf" && (
                <div>
                  <span>📄 {file.name}</span>
                </div>
              )}

              {/* Send button */}
              <button
                onClick={sendMessage}
                style={{
                  position: "absolute",
                  right: "-60px",
                  top: "20px",
                  background: "green",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={sendMessage}>
            <div className="d-flex mt-3 align-items-center">
             

              {/* Text input */}
              <input
                className="form-control"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

               {/* File button */}
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                📎
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={fileHandler}
                />
              </label>

              {/* Send text button */}
              <button className="btn btn-primary mx-2" type="submit">
                ➤
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default JoinChatBoard;
