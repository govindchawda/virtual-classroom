import React, { useState } from 'react'
import style from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const api = import.meta.env.VITE_API_BASE_URL;

export default function Forget() {
  const navigate = useNavigate();
  const [userValue, setUserValue] = useState({
    email: "",
    new_password: ""
  });

  const inputHandler = (event) => {
    setUserValue({ ...userValue, [event.target.name]: event.target.value });
  }

  const changePassword = async (event) => {
    try {
      event.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json"
        },
      }
      const res = await axios.post(`${api}/auth/resetpasswords`, userValue, config);
      toast(res.data.message);
      if (res.data.success) {
        navigate("/login")
      }
    } catch (error) {
      toast.error("possword not change somthing error")
      console.log(`forget password error : ${error}`);
    }
  }
  return (
    <>
      <div className={style.login}>
        <div className="container-fluid">
          <div className="container">
            <h2 className={style.h2}>Forget password</h2>
            <h6 className={style.h6}>If you don't have an account, <a href="">Enroll here</a></h6>
          </div>
        </div>
      </div>
      <div className="container-fluid section-padding ">
        <div className="container">
          <form action="" onSubmit={changePassword} method="post" className={style.login_form}>
            <label htmlFor="" className='mt-3'>Email</label> <br />
            <input type="email" onChange={inputHandler} required name='email' className='form-control' />
            <label htmlFor="" className='mt-4'>New Password</label> <br />
            <input type="text" onChange={inputHandler} required name='new_password' className='form-control' />
            <button className={style.button}>Change Password</button>
            <div className={style.reset_password}>
              <div className={style.remember_me}><input type="checkbox" name="" id="" className={style.pr} />Remember me</div>
              <div className={style.forget_password}><Link to="/login">Log in</Link></div>
            </div>
            {/* <button className={style.button_2}>Login With Google</button> */}
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
