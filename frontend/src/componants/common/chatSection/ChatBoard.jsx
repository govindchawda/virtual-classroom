import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
const api = import.meta.env.VITE_API_BASE_URL;


const ChatBoard = () => {


  const [classes, setClasses] = useState([]);
  const [user, setUser] = useState();

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
      if (res.data.result.role === 'admin') {
        axios.get(`${api}/classes/getAll`, {
          headers: {
            "Authorization": "bearer " + localStorage.getItem("tokeId")
          }
        }).then((res1) => {
          setClasses(res1.data.result)
        }).catch((error) => console.log("get all class error" + error));
      }
      else if (res.data.result.role === 'teacher') {
        axios.get(`${api}/classes/showClassIncludeTeachers/${res.data.result?._id}`).then((res2) => {
          setClasses(res2.data.result)
        }).catch((error) => {
          console.log("get classes includes teachers", error);
        })
      }
      else if (res.data.result.role === 'student') {
        axios.get(`${api}/classes/showClassIncludeStudents/${res?.data?.result?._id}`,
          {
            headers: { "Authorization": "bearer " + localStorage.getItem("tokeId") }
          }
        ).then((res3) => {
          setClasses(res3.data.result);
        }).catch((error) => console.log(error));
      }
      else {
        // navigate('/')
      }
    }).catch((error) => {
      console.log(`user profile error : ${error}`)
    })
  }, []);

  console.log("classes",classes)
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className='tittle color d-flex justify-content-between'>
            <span># ChatBoard</span>
          </div>

          <div className='dflex flex-wrap'>
            {classes.map((items, index) => {
              return (
                <div className='col-sm-12 col-md-6  col-12 col-lg-4 p-2 ' key={index}>
                  <div className="col-sm-12 color pb-2">
                    <div className="col-sm-12 tittle color">
                      <div className='class-info d-flex justify-content-between'>
                        <p><strong>Start Time : </strong> {items.schedule[0].startTime} </p>
                        <p><strong> Time : </strong> {items.schedule[0].endTime} </p>
                      </div>
                      <div className='class-info'>
                        <p className=''><strong>Day : </strong> {items.schedule[0].day.join(',')}</p>
                      </div>
                      <div className='class-info d-flex justify-content-between'>
                        {/* <p><strong>meeting : </strong> {items.meeting} </p> */}
                        <p><strong>Tittle : </strong>   {items.tittle} </p>
                        {/* <button onClick={()=> createMeeting(items._id)}  className='btn btn-info'>Join</button> */}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between px-3">
                      <Link to={`/overview/chat/${items._id}@qwert`} className='btn btn-info  text-light'>Join Chat</Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ChatBoard;
