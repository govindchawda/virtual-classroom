import React, { useEffect, useState } from 'react'
import style from './Navbar.module.css';
import logo2 from '../../assets/new-logo.png'
import { TfiEmail } from "react-icons/tfi";
import { LuFacebook,LuTwitter,LuLinkedin,LuInstagram ,LuPhoneCall } from "react-icons/lu";
import { Link } from 'react-router-dom';


export default function Navbar() {
  const [token, setToken] = useState(false);
  useEffect(()=>{
    const tokenId = localStorage.getItem("tokeId");
    if(!tokenId){
      return 
    }
    setToken(true)
  },[]);
  console.log(token);
  return (
    <>
      <div className={style.header_top}>
        <div className="container-fluid">
          <div className="container">
            <div className={style.header_top_wrapper}>
                <div className={style.top_info}>
                  <p className={style.header_content}>
                    <LuPhoneCall className={style.call_icon}/>
                    <a href="">12345-6789</a>  
                  </p>
                  <p className={style.header_content}>
                    <TfiEmail className={style.call_icon}/>
                    <a href="">infogowebtecg@gmail.com</a>  
                  </p>
                </div>
                <div className={style.social_icons}>
                    <LuFacebook className={style.social_icon} />
                    <LuTwitter className={style.social_icon} />
                    <LuLinkedin className={style.social_icon} />
                    <LuInstagram  className={style.social_icon} />
                </div>
            </div>
          </div>
        </div>
      </div>
      <nav>
        <div className="container-fluid">
          <div className="container">
            <div className={style.main_header}>
              <div className={style.header_logo}>
                <Link to='/'><img src={logo2} alt="" /></Link>
              </div>
              <div className={style.hearder_menu}>
                <ul>
                  <li><a href="">Home</a></li>
                  <li><a href="">Teacher's</a></li>
                  <li><a href="">Our Student's</a></li>
                  <li><a href="">Services</a></li>
                </ul>
              </div>
              <div className={style.header_login}>
                {token == true ?
                <Link to="/overview">Dashboard</Link> :
                <Link to="/login">Login</Link> }
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

