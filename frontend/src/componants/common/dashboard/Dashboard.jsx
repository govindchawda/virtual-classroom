import React, { useEffect, useRef, useState } from 'react'
// import './Students.css';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaBars } from "react-icons/fa";
import { BsChatRightTextFill } from "react-icons/bs";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { MdManageHistory } from "react-icons/md";
import { MdOutlineManageSearch } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoIosArrowForward } from 'react-icons/io';
import { MdCoPresent } from "react-icons/md";
import { MdOutlineChat } from "react-icons/md";

const api = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
  const [admins, setAdmin] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [student, setStudent] = useState(false);
  const [showSpanTag, setShowSpanTag] = useState(true);
  const [user, setUser] = useState([]);
  const [options, setOptions] = useState(false);
  const [optionValue, setoptionValue] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // SHOW HIDE SPAN TAGS
  const hideSpanTag = () => {
    setShowSpanTag(showSpanTag == true ? false : true)
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("tokeId");
    navigate('/');
  }

  // GET SELF PROFILE
  useEffect(() => {
    axios.get(`${api}/auth/getusers`, {
      headers: {
        "Authorization": "bearer " + localStorage.getItem("tokeId")
      }
    }).then((res) => {
      setUser(res.data.result);
      if (res.data.result.role === 'admin') {
        setAdmin(true)
      }
      else if (res.data.result.role === 'teacher') {
        setTeacher(true)
      }
      else if (res.data.result.role === 'student') {
        setStudent(true)
      }
      else {
        navigate('/')
      }
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

  const optionBar = (event) => {
    setTimeout(() => {
      setoptionValue(optionValue == event ? null : event);
    }, 500);
  }
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
          {student === true &&
            <div className={`leftbar ${showSpanTag ? "show-class" : "hide-class"}`}>
              <ul>
                <li className='text-center'><a href="">{showSpanTag == true &&
                  <span className='leftbar-profile'>
                    <img src={user.profile} alt="" /> <br />
                    <b>{user.name}</b>
                  </span>
                }</a></li>
                <li><a href=""><BsChatRightTextFill />{showSpanTag == true && <span>Message </span>}</a></li>
                <li><Link to={`/overview/view-class/${user._id}@qywvsg`}><BsFillPersonLinesFill />{showSpanTag == true && <span>Classes</span>}</Link></li>
                <li><a href=""><BsFillPersonLinesFill />{showSpanTag == true && <span>Online Class</span>}</a></li>
                <li><a href=""><MdAssignment />{showSpanTag == true && <span>Send Assignment</span>}</a></li>
                <li><a href=""><MdFeedback />{showSpanTag == true && <span>Send feedback</span>}</a></li>
                <li><Link to="change-password"><RiLockPasswordFill />{showSpanTag == true && <span>Change Password</span>}</Link></li>
              </ul>
            </div>
          }
          {teacher === true &&
            <div className={`leftbar ${showSpanTag ? "show-class" : "hide-class"}`}>
              <ul>
                <li className='text-center'><a href="">{showSpanTag == true &&
                  <span className='leftbar-profile'>
                    <img src={user.profile} alt="" /> <br />
                    <b>{user.name}</b>
                  </span>
                }</a></li>
                <li className='showusers' onClick={() => optionBar('classes')}>
                  <div className='showusera link'><div><BsFillPersonLinesFill />{showSpanTag == true && <span>Classes</span>}</div>{showSpanTag == true && <div className={`${optionValue == "classes" ? "rotateicon" : ''}`}><IoIosArrowForward /></div>}</div>
                  {optionValue == "classes" &&
                    <div className='useroptions'>
                      <div className='li'><Link to={`classes/${user._id}`}><MdManageHistory />{showSpanTag == true && <span>Manage Classes</span>}</Link></div>
                      <div className='li'><Link to="searchClasses" ><MdOutlineManageSearch />{showSpanTag == true && <span>Search Classes</span>}</Link></div>
                    </div>}
                </li>
                <li className='showusers'>
                  <div className='showusera link' onClick={() => optionBar('attendance')}><div><MdCoPresent />{showSpanTag == true && <span>Attendance</span>}</div>{showSpanTag == true && <div className={`${optionValue == "users" ? "rotateicon" : ''}`}><IoIosArrowForward /></div>}</div>
                  {optionValue == "attendance" &&
                    <div className='useroptions'>
                      <div className='li'><Link to="Attendance"><GiTeacher />{showSpanTag == true && <span>Add Attendance </span>}</Link></div>
                      <div className='li'><Link to="searchattendance"><MdOutlineManageSearch />{showSpanTag == true && <span>Search Attendance</span>}</Link></div>
                    </div>}
                </li>
                <li><Link to="ShowStuden"><MdFeedback />{showSpanTag == true && <span>Students</span>}</Link></li>
                      <li><a href=""><BsChatRightTextFill />{showSpanTag == true && <span>Message </span>}</a></li>
                <li><a href=""><BsFillPersonLinesFill />{showSpanTag == true && <span>Online Class</span>}</a></li>
                <li><a href=""><MdFeedback />{showSpanTag == true && <span>Send feedback</span>}</a></li>
                <li><Link to="change-password"><RiLockPasswordFill />{showSpanTag == true && <span>Change Password</span>}</Link></li>
              </ul>
            </div>
          }
          {admins === true &&
            <div className={`leftbar ${showSpanTag ? "show-class" : "hide-class"}`}>
              <div>
                <ul className='showoptions'>
                  <li className='text-center'><a href="">{showSpanTag == true &&
                    <span className='leftbar-profile'>
                      <img src={user.profile} alt="" /> <br />
                      <b>{user.name}</b>
                    </span>
                  }</a></li>

                  <li className='showusers' onClick={() => optionBar('classes')}>
                    <div className='showusera link'><div><BsFillPersonLinesFill />{showSpanTag == true && <span>Classes</span>}</div>{showSpanTag == true && <div className={`${optionValue == "classes" ? "rotateicon" : ''}`}><IoIosArrowForward /></div>}</div>
                    {optionValue == "classes" &&
                      <div className='useroptions'>
                        <div className='li'><Link to={`classes/${user._id}`}><MdManageHistory />{showSpanTag == true && <span>Manage Classes</span>}</Link></div>
                        <div className='li'><Link to="searchClasses" ><MdOutlineManageSearch />{showSpanTag == true && <span>Search Classes</span>}</Link></div>
                      </div>}
                  </li>
                  <li className='showusers'>
                    <div className='showusera link' onClick={() => optionBar('users')}><div><FaUsers />{showSpanTag == true && <span>Users</span>}</div>{showSpanTag == true && <div className={`${optionValue == "users" ? "rotateicon" : ''}`}><IoIosArrowForward /></div>}</div>
                    {optionValue == "users" &&
                      <div className='useroptions'>
                        <div className='li'><Link to="ShowTeachers"><GiTeacher />{showSpanTag == true && <span>Teachers </span>}</Link></div>
                        <div className='li'><Link to="ShowStudens"><PiStudentBold />{showSpanTag == true && <span>Students</span>}</Link></div>
                      </div>}
                  </li>
                  <li className='showusers'>
                    <div className='showusera link' onClick={() => optionBar('attendance')}><div><MdCoPresent />{showSpanTag == true && <span>Attendance</span>}</div>{showSpanTag == true && <div className={`${optionValue == "users" ? "rotateicon" : ''}`}><IoIosArrowForward /></div>}</div>
                    {optionValue == "attendance" &&
                      <div className='useroptions'>
                        <div className='li'><Link to="Attendance"><GiTeacher />{showSpanTag == true && <span>Add Attendance </span>}</Link></div>
                        <div className='li'><Link to="searchattendance"><MdOutlineManageSearch />{showSpanTag == true && <span>Search Attendance</span>}</Link></div>
                      </div>}
                  </li>
                  <li><a href=""><BsChatRightTextFill />{showSpanTag == true && <span>Message </span>}</a></li>
                  {/* <li><Link to="Attendance"><MdOutlineChat />{showSpanTag == true && <span>Attendance</span>}</Link></li> */}
                  <li><a href=""><MdOutlineChat />{showSpanTag == true && <span>Chat Boards</span>}</a></li>
                  <li><a href=""><MdAssignment />{showSpanTag == true && <span>Assignment</span>}</a></li>
                  <li><a href=""><MdFeedback />{showSpanTag == true && <span>feedback's</span>}</a></li>
                  <li><Link to="change-password"><RiLockPasswordFill />{showSpanTag == true && <span>Change Password</span>}</Link></li>
                </ul>
              </div>
            </div>
          }
          <div className='rightbar'>
            <Outlet />
          </div>
        </div>
      </section>
    </>
  )
}
