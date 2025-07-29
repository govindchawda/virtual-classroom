import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const api = import.meta.env.VITE_API_BASE_URL;

export default function Change_password() {
  const navigate = useNavigate();
  const [userValue, setUserValue] = useState({
    email: "",
    new_password: ""
  });

  // GET THE VALUE FROM INPUTS
  const inputHandler = (event) => {
    setUserValue({ ...userValue, [event.target.name]: event.target.value });
  }

  // CHANGE PASSWORD || FORGET PASSWORD
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
        toast(res.data.message)
        navigate('/students')
      }
    } catch (error) {
      console.log(`forget password error : ${error}`);
    }
  }
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className='tittle color'>
            # Change Password
          </div>
          <div className='change-password'>
            <form method='post' onSubmit={changePassword}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" onChange={inputHandler} name='email' aria-describedby="emailHelp" />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" onChange={inputHandler} name='new_password' />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
