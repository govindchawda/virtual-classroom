import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export default function ShowTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [editingTeachers, setEditingTeachers] = useState({
    // _id: "",
    name: "",
    email: "",
    password: "",
    role: "teacher",
    gender: "",
    profile: "",
  });

  // GET ALL TEACHERS || SHOW ALL TEACHERS
  useEffect(() => {
    axios.get(`${api}/auth/getallteachers`, {
      headers: {
        "Authorization": "bearer " + localStorage.getItem("tokeId")
      }
    }).then((res) => {
      setTeachers(res.data.result);
    }).catch((error) => console.log(error));
  })

  // DELETE TEACHERS
  const deleteTeacher = async (id) => {
    try {
      const res = await axios.delete(`${api}/auth/deleteusers/${id}`, {
        headers: {
          "Authorization": "bearer " + localStorage.getItem("tokeId")
        }
      });
      toast(res.data.message || 'deleted');
    } catch (error) {
      toast.error('Error deleting teacher');
      console.log("delete students error" + error);
    }
  }

  // EDIT TEACHERS
  const editTeachers = async (id) => {
    try {
      const res = await axios.get(`${api}/auth/editusers/${id}`, {
        headers: {
          "Authorization": "bearer " + localStorage.getItem("tokeId")
        }
      });
      setEditingTeachers(res.data.result)
      console.log(res.data.result)
      toast(res.data.message);
    } catch (error) {
      toast.error('Error loading teacher');
      console.log("edit teachers error", error);
    }
  }

  // GET THE VALUE FROM INPUTS
  const inputHandler = (event) => {
    setEditingTeachers({ ...editingTeachers, [event.target.name]: event.target.value });
  }

  const imageHandler = (event) => {
    const url = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(url);
    reader.onload = () => {
      setEditingTeachers({ ...editingTeachers, [event.target.name]: reader.result });
    }
  }


  // UPDATE TEACHERS
  const updateTeacher = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(`${api}/auth/updateusers`, editingTeachers, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "bearer " + localStorage.getItem("tokeId")
        }
      });
      toast(res.data.message || 'Updated')
    } catch (error) {
      toast.error('Update failed');
      console.log("update teacher error", error);
    }
  }

  // ADD TEACHERS
  const addTeachers = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post(`${api}/auth/register`, editingTeachers, {
        headers: "application/json"
      });
      toast(res.data.message || 'Teacher added');
      console.log(res.data.result);
    } catch (error) {
      toast.error('Add failed');
      console.log("add teachers errror", error)
    }
  }
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className='tittle color d-flex justify-content-between'>
            <span># Show Teachers</span>
            <div>
              <Link className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#notstaticBackdrop"> +Add Teachers</Link>
            </div>
          </div>
          <table className="table table-striped table-inverse table-responsive">
            <thead className="thead-inverse">
              <tr>
                <th>S.no</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Enrollment.no</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((items, index) => (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td><img width={40} src={items.profile} /></td>
                  <td>{items.name}</td>
                  <td>{items.email}</td>
                  <td>{items.gender}</td>
                  <td>{items._id}</td>
                  <td>
                    <button onClick={() => deleteTeacher(items._id)} className='btn btn-danger'> Delete</button>
                    <button onClick={() => editTeachers(items._id)} className='btn btn-info mx-2' data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Teachers</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form action="" onSubmit={updateTeacher}>
                <input name='_id' value={editingTeachers?._id} readOnly className='form-control' type="text" />
                <div className="mt-3">
                  <label htmlFor="">Name</label>
                  <input name='name' value={editingTeachers?.name} onChange={inputHandler} className='form-control' type="text" />
                </div>
                <div className="mt-3">
                  <label htmlFor="">Email</label>
                  <input name='email' className='form-control' onChange={inputHandler} value={editingTeachers?.email} type="email" />
                </div>
                <div className="mt-3">
                  <label htmlFor="">Gender</label>
                  <input name='gender' className='form-control' onChange={inputHandler} value={editingTeachers?.gender} type="text" />
                </div>
                <div className="mt-3">
                  <label htmlFor="">Profile</label>
                  <input name='profile' onChange={imageHandler} className='form-control' type="file" />
                </div>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <div className="modal fade" id="notstaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Teachers</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form action="" onSubmit={addTeachers}>
                <div className="mt-3">
                  <label htmlFor="">Name</label>
                  <input type="text" className='form-control' onChange={inputHandler} name='name' />
                </div>
                <div className="mt-3">
                  <label htmlFor="">Email</label>
                  <input type="text" name='email' onChange={inputHandler} className='form-control' />
                </div>
                <div className="mt-3">
                  <label htmlFor="">Password</label>
                  <input type="text" name='password' onChange={inputHandler} className='form-control' />
                </div>
                <div className="mt-3">
                  <label htmlFor="">Gender</label>
                  <input type="text" name='gender' onChange={inputHandler} className='form-control' />
                </div>
                <div className="mt-3">
                  <label htmlFor="">Profile</label>
                  <input type="file" name='profile' onChange={imageHandler} className='form-control' />
                </div>
                <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
