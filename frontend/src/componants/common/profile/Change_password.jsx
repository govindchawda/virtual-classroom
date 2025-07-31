import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const api = import.meta.env.VITE_API_BASE_URL;

export default function Change_password() {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [user, setuser] = useState();
  const [userValue, setUserValue] = useState({
    email: "",
    new_password: "",
    confirm_password: ""
  });
  // get user 
  useEffect(() => {
    axios.get(`${api}/auth/getusers`, {
      headers: {
        "Authorization": "bearer " + localStorage.getItem("tokeId")
      }
    }).then((res) => {
      if (!res.data.result) {
        return toast.error("internal server error")
      }
      setuser(res.data.result);
    }).catch((error) => console.log("get self user error", error));
  }, []);

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
      console.log(userValue);
      if (userValue.new_password !== userValue.confirm_password) {
        return toast.error("password and confirm are not matched ")
      }

      const payload = { ...userValue, email: user.email };
      if (!payload.email) {
        console.log(userValue)
        return toast.error("email not matched")
      }

      console.log("payload", payload)
      const res = await axios.post(`${api}/auth/resetpasswords`, payload, config);
      toast(res.data.message);
      if (res.data.success) {
        toast(res.data.message)
        navigate('/overview')
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
              {/* <div className="mb-3">
                <label  className="form-label">Email address</label>
                <input type="email"  value={user?.email} className="form-control" onChange={inputHandler} name='email' aria-describedby="emailHelp" />
              </div> */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" onChange={inputHandler} name='new_password' />
              </div>
              {/* <div className="mb-3">
                <label  className="form-label">Confirm Password</label>
                <input type="password"  id="password" className="form-control" onChange={inputHandler} name='confirm_password' />
              </div> */}
              <div className="mb-3 position-relative">
                <label className="form-label">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  className="form-control pe-5"
                  onChange={inputHandler}
                />
                <button
                  type="button"
                  className="btn btn-sm position-absolute top-50 end-0 "
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
