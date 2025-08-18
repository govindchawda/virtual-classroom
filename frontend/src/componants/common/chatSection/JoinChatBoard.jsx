// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { useParams } from "react-router-dom";

// const api = import.meta.env.VITE_API_BASE_URL;
// const socket = io("http://localhost:4000");

// const JoinChatBoard = () => {
//   const classid = useParams();
//   const [messages, setMessages] = useState([]);
//   const [user, setUser] = useState();
//   const [input, setInput] = useState("");
//   const [file, setFile] = useState(null);
//   // const [user, setUser] = useState([]);

//   // File select handler
//   const fileHandler = (event) => {
//     const selectedFile = event.target.files[0];
//     if (!selectedFile) return;

//     const reader = new FileReader();
//     reader.readAsDataURL(selectedFile);
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
//     axios.get(`${api}/auth/getusers`, {
//       headers: {
//         Authorization: "bearer " + localStorage.getItem("tokeId"),
//       },
//     }).then((res) => {
//       if (!res) {
//         return toast.error("user is not found");
//       }
//       setUser(res.data.result);
//     }).catch((error) => {
//       console.log(`user profile error : ${error}`);
//     });
//   }, []);

//   // Load old messages
//   useEffect(() => {
//     axios.get(`${api}/chat/all/${classid?.id}`).then((res) => {
//       setMessages(res.data.result)
//     }).catch((error) => console.log("get all chat error", error));
//   }, [classid]);


//   // Listen for incoming socket messages
//   useEffect(() => {
//     socket.on("chat message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//     return () => socket.off("chat message");
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
//       message: input || file?.data,
//       fileType: file
//         ? (file.type.startsWith("image/") ? "image"
//           : file.type.startsWith("video/") ? "video"
//             : file.type === "application/pdf" ? "pdf"
//               : "file")
//         : "text",
//       classId: classid.id,
//     };

//     try {
//       const res = await axios.post(`${api}/chat/send`, newMsg);
//       if (!res) {
//         toast.error("internal server error");
//       }
//       socket.emit("chat message", newMsg);
//       setInput("");
//       setFile(null);
//       toast(res.data.message)
//     } catch (err) {
//       toast.error("Message not sent");
//     }
//   };

//   // delete chat
//   const deleteChat = async (id) => {
//     try {
//       if (!id) {
//         return toast.error("message can't delete");
//       }
//       const res = await axios.delete(`${api}/chat/deleteChat/${id}`)
//       if (!res) {
//         return toast.error("internal server error");
//       }
//       toast(res.data.message);
//     } catch (error) {
//       console.log("delete chat error", error);
//     }
//   }

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="container mediaFonts">
//           <div className="tittle color d-flex justify-content-between">
//             <span># ChatBoard</span>
//           </div>

//           {/* Messages Area */}
//           <div className="mt-3 message_board">
//             {messages.map((msg, i) => {
//               const isMyMessage = msg?.sender?._id === user?._id;

//               // Current message date (only date part, not time)
//               const msgDate = new Date(msg?.createdAt).toLocaleDateString();
//               // Previous message date
//               const prevMsgDate = i > 0 ? new Date(messages[i - 1]?.createdAt).toLocaleDateString() : null;
//               return (
//                 <>
//                   {/* Date Separator */}
//                   {msgDate !== prevMsgDate && (
//                     <div className="date_separator">
//                       {msgDate}
//                     </div>
//                   )}
//                   <div key={i} className={`d-flex mb-2 ${isMyMessage ? "justify-content-end" : "justify-content-start"}`} >
//                     <div className={`message-bubble ${isMyMessage ? "my-message" : "other-message"}`}>
//                       {/* Text */}
//                       {msg?.fileType === "text" && <span>{msg.message}</span>}

//                       {/* Image */}
//                       {msg?.fileType === "image" && (
//                         <img className="chatImage" src={msg.message} alt="img" />
//                       )}

//                       {/* Video */}
//                       {msg?.fileType === "video" && (
//                         <video controls className="chatVideo">
//                           <source src={msg.message} type="video/mp4" />
//                         </video>
//                       )}

//                       {/* PDF */}
//                       {msg?.fileType === "pdf" && (
//                         <a href={msg.message} target="_blank" rel="noopener noreferrer" className="chatpdf" >📄 View PDF</a>
//                       )}

//                       {/* Time */}
//                       <div className="d-flex justify-content-between" style={{ fontSize: "12px", color: "gray", marginTop: "5px" }}>
//                         <div>
//                           {new Date(msg?.createdAt).toLocaleTimeString([], {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </div>
//                         <div className="px-2" style={{ cursor: "pointer" }} onClick={() => deleteChat(msg?._id)}>
//                           {(user?.role === "teacher" || user?.role === "admin" || (user?.role === "student" && msg.sender._id === user._id)) && (
//                             <div className="chatdelete" onClick={() => deleteChat(msg)}>delete</div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               );
//             })}
//           </div>

//           {/* File Preview */}
//           {file && (
//             <div className="chat-message-box">
//               {/* Image Preview */}
//               {file.type.startsWith("image/") && (
//                 <img src={file.data} alt="preview" className="chat-image" />
//               )}

//               {/* Video Preview */}
//               {file.type.startsWith("video/") && (
//                 <video src={file.data} className="chat-file-preview" muted />
//               )}

//               {/* PDF Preview */}
//               {file.type === "application/pdf" && (
//                 <div> <span>📄 {file.name}</span></div>
//               )}

//               {/* Send button */}
//               <button className="chat-delete-btn" onClick={sendMessage}> Send</button>
//             </div>
//           )}

//           {/* Input Area */}
//           <form onSubmit={sendMessage}>
//             <div className="d-flex mt-3 align-items-center">
//               <input
//                 className="form-control"
//                 placeholder="Type a message..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 disabled={file !== null} // Disable text input if file is selected
//               />

//               {/* File button */}
//               <label className={`send-icon ${input ? "disabled" : ""}`} >
//                 📎
//                 <input
//                   type="file"
//                   style={{ display: "none" }}
//                   onChange={fileHandler}
//                   disabled={input.length > 0} // Disable file select if input has text
//                 />
//               </label>

//               {/* Send text button */}
//               <button className="btn btn-primary mx-2" type="submit">
//                 ➤
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



import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
// import "./chat.css";

const api = import.meta.env.VITE_API_BASE_URL;
const socket = io("http://localhost:4000");

const JoinChatBoard = () => {
  const classid = useParams();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState();
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load user
  useEffect(() => {
    axios
      .get(`${api}/auth/getusers`, {
        headers: { Authorization: "bearer " + localStorage.getItem("tokeId") },
      })
      .then((res) => setUser(res.data.result))
      .catch((err) => console.log("user error", err));
  }, []);

  // Load old messages
  useEffect(() => {
    axios
      .get(`${api}/chat/all/${classid?.id}`)
      .then((res) => setMessages(res.data.result))
      .catch((err) => console.log("get chat error", err));
  }, [classid]);

  // Listen for incoming socket messages
  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("chat message");
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // File handler
  const fileHandler = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setFile({
        data: reader.result,
        type: selectedFile.type,
        name: selectedFile.name,
      });
    };
  };

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input && !file) return toast.error("Add text or file");

    const newMsg = {
      sender: user?._id,
      message: input || file?.data,
      fileType: file
        ? file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("video/")
          ? "video"
          : file.type === "application/pdf"
          ? "pdf"
          : "file"
        : "text",
      classId: classid.id,
      createdAt: new Date(),
    };

    try {
      const res = await axios.post(`${api}/chat/send`, newMsg);
      if (res) {
        socket.emit("chat message", newMsg);
        setInput("");
        setFile(null);
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error("Message not sent");
    }
  };

  // Delete chat
  const deleteChat = async (id) => {
    try {
      const res = await axios.delete(`${api}/chat/deleteChat/${id}`);
      if (res) {
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log("delete error", err);
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
          <div className="mt-3 message_board">
            {messages.map((msg, i) => {
              const isMyMessage = msg?.sender?._id === user?._id;
              const msgDate = new Date(msg?.createdAt).toLocaleDateString();
              const prevMsgDate =
                i > 0
                  ? new Date(messages[i - 1]?.createdAt).toLocaleDateString()
                  : null;

              return (
                <React.Fragment key={i}>
                  {msgDate !== prevMsgDate && (
                    <div className="date_separator">{msgDate}</div>
                  )}
                  <div
                    className={`d-flex mb-2 ${
                      isMyMessage ? "justify-content-end" : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`message-bubble ${
                        isMyMessage ? "my-message" : "other-message"
                      }`}
                    >
                      {msg?.fileType === "text" && <span>{msg.message}</span>}
                      {msg?.fileType === "image" && (
                        <img className="chatImage" src={msg.message} alt="img" />
                      )}
                      {msg?.fileType === "video" && (
                        <video controls className="chatVideo">
                          <source src={msg.message} type="video/mp4" />
                        </video>
                      )}
                      {msg?.fileType === "pdf" && (
                        <a
                          href={msg.message}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="chatpdf"
                        >
                          📄 View PDF
                        </a>
                      )}

                      <div className="d-flex justify-content-between message-time">
                        <div>
                          {new Date(msg?.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>

                        {(user?.role === "teacher" ||
                          user?.role === "admin" ||
                          (user?.role === "student" &&
                            msg.sender._id === user._id)) && (
                          <div
                            className="chatdelete"
                            onClick={() => deleteChat(msg._id)}
                          >
                            delete
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* File Preview */}
          {file && (
            <div className="chat-message-box">
              {file.type.startsWith("image/") && (
                <img src={file.data} alt="preview" className="chat-image" />
              )}
              {file.type.startsWith("video/") && (
                <video src={file.data} className="chat-file-preview" muted />
              )}
              {file.type === "application/pdf" && (
                <div>📄 {file.name}</div>
              )}
              <button className="chat-delete-btn" onClick={sendMessage}>
                Send
              </button>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={sendMessage}>
            <div className="d-flex mt-3 align-items-center">
              <input
                type="text"
                className="form-control"
                value={input}
                placeholder="Type a message..."
                onChange={(e) => setInput(e.target.value)}
                disabled={file !== null}
              />
              <label className={`send-icon ${input ? "disabled" : ""}`}>
                📎
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={fileHandler}
                  disabled={input.length > 0}
                />
              </label>
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
