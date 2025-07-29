import React from 'react'
import style from './Footer.module.css';
import logo from '../../assets/new-logo.png'
import { FaFacebookF,FaInstagram ,FaLinkedinIn  ,FaXTwitter   } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <footer className='section-padding'>
        <div className="container-fluid">
          <div className="container">
            <div className={style.hr}></div>
            <div className={style.footer_main}>
                <div className="footer_box">
                      <img src={logo} alt="" />
                </div>
                <div className="footer_box">
                    <h4 className={style.heading}>Products</h4>
                    <ul className={style.ul}>
                      <li><a href="">Virtual Classroom</a></li>
                      <li><a href="">Learning Management System</a></li>
                      <li><a href="">Success Stories</a></li>
                      <li><a href="">Pricing</a></li>
                      <li><a href="">Request demo</a></li>
                    </ul>
                </div>
                <div className="footer_box">
                    <h4 className={style.heading}>Company</h4>
                    <ul className={style.ul}>
                      <li><a href="">About</a></li>
                      <li><a href="">Contacts</a></li>
                      <li><a href="">Partnership program</a></li>
                    </ul>
                </div>
                <div className="footer_box">
                    <h4 className={style.heading}>Terms and policies</h4>
                    <ul className={style.ul}>
                      <li><a href="">Data Processing Addendum</a></li>
                      <li><a href="">General Terms and Conditions</a></li>
                      <li><a href="">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className={style.hr}></div>
            <div className={style.footer_bottom}>
                <div>
                  <p>© 2013-2025  is owned and operated by Vedamo EAD, Bulgaria.</p>
                </div>
                <div>
                  <FaFacebookF className={style.icon} />
                  <FaInstagram className={style.icon} />
                  <FaLinkedinIn className={style.icon}  />
                  <FaXTwitter className={style.icon} />
                </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
