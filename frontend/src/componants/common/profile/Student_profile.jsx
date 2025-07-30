import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const api = import.meta.env.VITE_API_BASE_URL;

export default function Student_profile() {
  const navigate = useNavigate();
  // const [user, setUser] = useState({
  //   _id: "",
  //   name: "",
  //   email: "",
  //   gender: "",
  //   profile: ""
  // });
  const [editValue, setEditValue] = useState({
    _id: "",
    name: "",
    email: "",
    gender: "",
    profile: "",
  });

  useEffect(() => {
    axios.get(`${api}/auth/getusers`, {
      headers: {
        "Authorization": "bearer " + localStorage.getItem("tokeId")
      }
    }).then((res) => {
      setEditValue(res.data.result);
    }).catch((error) => {
      console.log("user profile error ", error)
    })
  }, []);

  // logout user
  const logout = () => {
    localStorage.removeItem("tokeId");
    navigate("/")
  }

  // edit user
  const edituser = async (id) => {
    try {
      let res = await axios.get(`http://localhost:4000/api/auth/editusers/${id}`, {
        headers: {
          "Authorization": "baerer " + localStorage.getItem("tokeId")
        }
      });
      setEditValue(res.data.result);
    } catch (error) {
      console.log("user profile error", error)
    }
  }
  // update profile
  const inputHandler = (event) => {
    setEditValue({ ...editValue, [event.target.name]: event.target.value });
  }

  const imageHandler = (event) => {
    const url = event.target.files[0];
    if (!url) return;

    const reader = new FileReader();
    reader.readAsDataURL(url);
    reader.onload = () => {
      setEditValue({ ...editValue, [event.target.name]: reader.result });
    }
  }
  const updateProfile = async (event) => {
    event.preventDefault();

    // check require fields
    if (!editValue.name.trim() || !editValue.email.trim() || !editValue.gender.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        },
      }
      const res = await axios.post('http://localhost:4000/api/auth/updateusers', editValue, config);
       let message = res.data.message
       toast(message)
      console.log(message );
      // close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
      modal.hide();
    } catch (error) {
      toast.error('not updated')
      console.log("update profile error", error);
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className='tittle color'>
            # {editValue.role}
          </div>
          <div className="user-profile color mediaFonts">
            <div className='user-image'>
              {editValue.profile ? (
                <img src={editValue?.profile} alt="" />) : (
                <span> <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" /> </span>
              )}
              <div>
                <button onClick={() => edituser(editValue._id)} className='btn btn-primary m-2' data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit Profile</button>
                <button className='btn btn-danger m-2' onClick={logout}>Delete Profile</button>
              </div>
            </div>
            <div className='user-deatils'>
              <ul>
                <li><a href="">Name :<span>{editValue.name}</span></a></li>
                <li><a href="">Email :<span>{editValue.email}</span></a></li>
                <li><a href="">Gender :<span>{editValue.gender}</span></a></li>
                <li><a href="">Role :<span>{editValue.role}</span></a></li>
                <li><a href="" className='textWrap'>Roll.No :<span>{editValue._id}</span></a></li>
              </ul>
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" >{editValue.name} Profile</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={updateProfile}>
                      <div className="mb-3">
                        <label className="form-label">Roll.No</label>
                        <input type="text" className="form-control" readOnly value={editValue?._id} onChange={inputHandler} name='_id' />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" name='name' required className="form-control" value={editValue?.name} onChange={inputHandler} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" value={editValue?.email} onChange={inputHandler} name='email' />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <input type="text" className="form-control" value={editValue?.gender} onChange={inputHandler} name='gender' />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Profile</label>
                        <input type="file" className="form-control" name='profile' onChange={imageHandler} />
                      </div>
                      <button button='submit'  className="btn btn-primary">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       <ToastContainer />
    </>
  )
}
