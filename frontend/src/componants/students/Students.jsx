import React, { useEffect, useRef, useState } from 'react'
import './Students.css';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaBars } from "react-icons/fa";
import { BsChatRightTextFill } from "react-icons/bs";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = import.meta.env.VITE_API_BASE_URL;


export default function Students() {
  const navigate = useNavigate();
  const [showSpanTag, setShowSpanTag] = useState(true);
  const hideSpanTag = () => {
    setShowSpanTag(showSpanTag == true ? false : true)
  };
  const logout = () => {
    localStorage.removeItem("tokeId");
    navigate('/');
  }
  const [user, setUser] = useState([]);
  const [options, setOptions] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    axios.get(`${api}/auth/getusers`, {
      headers: {
        "Authorization": "bearer " + localStorage.getItem("tokeId")
      }
    }).then((res) => {
      setUser(res.data.result);
    }).catch((error) => {
      console.log(`user profile error : ${error}`)
    })
  }, []);

  // VIWE || HIDE OPTION
  const showOption = () => {
    setOptions(options == false ? true : false)
  }

  // OUTSIDE CLICK KARKE OPTION BAND KARNA H
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <>
      <section className="dashboard">
        <div className='topbar'>
          <div className='topbar-image'>
            <div className='topbae-logo'>
              <img src="https://i.ibb.co/0RdZZbhD/Screenshot-2025-05-30-162121.png" alt="" />
              <FaBars onClick={hideSpanTag} className='bar_icons' />
            </div>
            <div className='user-topbarIcons' ref={dropdownRef}>
              <HiOutlineDotsVertical onClick={showOption} className='dot_icons' />
              {options &&
                <>
                  <div className='user-logout'>
                    <span> ! Welcome</span>
                    <li><Link to="profile"><img src={user.profile} alt="" />Profile</Link></li>
                    <li><a href="" onClick={logout}><CgLogOut /> Log out</a></li>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
        <div className='middlebar'>
          <div className='leftbar'>
            <ul>
              <li className='text-center'><a href="">{showSpanTag == true &&
                <span className='leftbar-profile'>
                  <img src={user.profile} alt="" /> <br />
                  <b>{user.name}</b>
                </span>
              }</a></li>
              <li><a href=""><BsChatRightTextFill />{showSpanTag == true && <span>Message </span>}</a></li>
              <li><Link to={`/students/view-class/${user._id}@qywvsg`}><BsFillPersonLinesFill />{showSpanTag == true && <span>Classes</span>}</Link></li>
              <li><a href=""><BsFillPersonLinesFill />{showSpanTag == true && <span>Online Class</span>}</a></li>
              <li><a href=""><MdAssignment />{showSpanTag == true && <span>Send Assignment</span>}</a></li>
              <li><a href=""><MdFeedback />{showSpanTag == true && <span>Send feedback</span>}</a></li>
              <li><Link to="change-password"><RiLockPasswordFill />{showSpanTag == true && <span>Change Password</span>}</Link></li>
            </ul>
          </div>
          <div className='rightbar'>
            <Outlet />
          </div>
        </div>
      </section>
    </>
  )
}
