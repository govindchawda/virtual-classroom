// import React, { useState } from 'react'
// import style from './Login.module.css';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import { useFormInputValidation } from 'react-form-input-validation';
// export default function Login() {
//   const navigate = useNavigate();

//   const [fields, errors, form] = useFormInputValidation({
//     email: "",
//     password: ""
//   }, {
//     email: "required|email",
//     password: "required"
//   }
//   )
//   const loginUser = async (event) => {
//     // event.preventDefault();
//     try {
//       // if(!loginValue.email || !loginValue.password){
//       //   toast.error("")
//       // }
//       const config = {
//         headers: {
//           "Content-Type": "application/json"
//         },
//       }
//       let res = await axios.post('http://localhost:4000/api/auth/login', fields, config)
//       toast(res.data.message, {
//         autoClose: 3000
//       });
//       if (res.data.success) {
//         localStorage.setItem("tokeId", res.data.token);
//         if (res.data.user.role == "student") {
//           navigate('/students')
//         }
//         if (res.data.user.role == "teacher") {
//           navigate('/teachers')
//         }
//         if (res.data.user.role == "admin") {
//           navigate('/admin')
//         }
//       }
//     } catch (error) {
//       console.log(`login user error : ${error}`)
//     }
//   }
//   return (
//     <>
//       <div className={style.login}>
//         <div className="container-fluid">
//           <div className="container">
//             <h2 className={style.h2}>Log in</h2>
//             <h6 className={style.h6}>If you don't have an account, <a href="">Enroll here</a></h6>
//           </div>
//         </div>
//       </div>
//       <div className="container-fluid section-padding ">
//         <div className="container">
//           <div className={style.form}>
//             <form noValidate autoComplete="off" method="post" onSubmit={form.handleSubmit(loginUser)} className={style.login_form}>
//               <label htmlFor="" className='mt-3'>Email</label> <br />
//               <input type="email" name='email' onChange={form.handleChangeEvent} value={fields.email} onBlur={form.handleBlurEvent} className='form-control' />
//               <label htmlFor="">{errors.email ? errors.email : ''}</label>
//               <label htmlFor="" className='mt-4'>Password</label> <br />
//               <input type="text" name='password' onChange={fields.handleChangeEvent} onBlur={fields.handleBlurEvent} className='form-control' />
//               <button className={style.button}>Log in</button>
//               <div className={style.reset_password}>
//                 <div className={style.remember_me}><input type="checkbox" name="" id="" className={style.pr} />Remember me</div>
//                 <div className={style.forget_password}><Link to="/forget" >Forget password</Link></div>
//               </div>
//             </form>
//             <button className={style.button_2}>Login With Google</button>
//           </div>
//           <ToastContainer />
//         </div>
//       </div>
//     </>
//   )
// }


// react validition



import React, { useState } from 'react'
import style from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

const api = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
  const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: ""
  });

  useEffect(()=>{
    const name = "gowebtech";
    axios.post(`${api}/googleMeeting/create`,name);
  },[]);

  const inputHandler = (event) => {
    setLoginValue({ ...loginValue, [event.target.name]: event.target.value });
  }

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        },
      }
      let res = await axios.post(`${api}/auth/login`, loginValue, config)
      toast(res.data.message, {
        autoClose: 3000
      });
      if(res.data.success){
        localStorage.setItem("tokeId", res.data.token);
        if (res.data.user.role == "student") {
          navigate('/overview')
        }
        if (res.data.user.role == "teacher") {
          navigate('/overview')
        }
        if (res.data.user.role == "admin") {
          navigate('/overview')
        }
      }
    } catch (error) {
      console.log(`login user error : ${error}`)
    }
  }
  return (
    <>
      <div className={style.login}>
        <div className="container-fluid">
          <div className="container">
            <h2 className={style.h2}>Log in</h2>
            <h6 className={style.h6}>If you don't have an account, <a href="">Enroll here</a></h6>
          </div>
        </div>
      </div>
      <div className="container-fluid section-padding ">
        <div className="container">
          <div className={style.form}>
            <form action="" method="post" onSubmit={loginUser} className={style.login_form}>
              <label htmlFor="" className='mt-3'>Email</label> <br />
              <input type="email" name='email' required onChange={inputHandler} className='form-control' />
              <label htmlFor="" className='mt-4'>Password</label> <br />
              <input type="text" name='password'required onChange={inputHandler} className='form-control' />
              <button className={style.button}>Log in</button>
              <div className={style.reset_password}>
                <div className={style.remember_me}><input type="checkbox" required name="" id="" className={style.pr} />Remember me</div>
                <div className={style.forget_password}><Link to="/forget" >Forget password</Link></div>
              </div>
            </form>
            <button className={style.button_2}>Login With Google</button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  )
}
