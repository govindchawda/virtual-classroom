import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';

const api = import.meta.env.VITE_API_BASE_URL;


export default function ShowStudent() {
  const [Students, setStudents] = useState([]);
  const [editingStudents, setEditingStudents] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
    role: "student",
    gender: "",
    profile: "",
  });

  // GET ALL STUDENTS || SHOW ALL STUDENTS
  useEffect(() => {
    axios.get(`${api}/auth/getallstudents`, {
      headers: {
        "Authorization": "bearer " + localStorage.getItem("tokeId")
      }
    }).then((res) => {
      // toast("welcome to Students" )
      setStudents(res.data.result);
    }).catch((error) => console.log(error));
  })

  // DELETE STUDENTS
  const deleteStudent = async (id) => {
    try {
      const res = await axios.delete(`${api}/auth/deleteusers/${id}`, {
        headers: {
          "Authorization": "bearer " + localStorage.getItem("tokeId")
        }
      });
      toast(res.data.message || 'deleted');
    } catch (error) {
      toast.error('Error deleting student');
      console.log("delete students error" + error);
    }
  }

  // EDIT Students
  const editStudents = async (id) => {
    try {
      const res = await axios.get(`${api}/auth/editusers/${id}`, {
        headers: {
          "Authorization": "bearer " + localStorage.getItem("tokeId")
        }
      });
      setEditingStudents(res.data.result)
      toast(res.data.message);
    } catch (error) {
      toast.error('Error loading students');
      console.log("edit Students error", error);
    }
  }

  // GET THE DATA FROM THE INPUTS
  const inputHandler = (event) => {
    setEditingStudents({ ...editingStudents, [event.target.name]: event.target.value });
  }
  const imageHandler = (event) => {
    const url = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(url);
    reader.onload = () => {
      setEditingStudents({ ...editingStudents, [event.target.name]: reader.result });
    }
  }

  // UPDATE THE STUDENTS
  const updateTeacher = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post(`${api}/auth/updateusers`, editingStudents, {
        headers: {
          "Authorization": "bearer " + localStorage.getItem("tokeId"),
          "Content-Type": "application/json"
        }
      });
      toast(res.data.message)
    } catch (error) {
      toast.error('Update failed');
      console.log("update teacher error", error);
    }
  }

  // ADD STUDENTS
  const AddStudents = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post(`${api}/auth/register`, editingStudents, {
        headers: "application/json"
      });
      toast(res.data.message || "add student");

    } catch (error) {
      toast.error('Add failed');
      console.log("add Students errror", error)
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className='tittle color d-flex justify-content-between'>
            <span># Show Students</span>
            <div>
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#notstaticBackdrop">+ Add Students</button>
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
              {Students.map((items, index) => (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td><img width={40} src={items.profile} /></td>
                  <td>{items.name}</td>
                  <td>{items.email}</td>
                  <td>{items.gender}</td>
                  <td>{items._id}</td>
                  <td>
                    <button onClick={() => deleteStudent(items._id)} className='btn btn-danger'>Delete</button>
                    <button onClick={() => editStudents(items._id)} className='btn btn-info mx-2' data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
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
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Students</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form action="" onSubmit={updateTeacher}>
                <div className="mt-3">
                  <label htmlFor="">Name</label>
                  <input name='_id' value={editingStudents?._id} readOnly className='form-control' type="text" />
                  <input name='name' required value={editingStudents?.name} onChange={inputHandler} className='form-control' type="text" />
                </div>
                <div className="mt-3">
                  <label htmlFor="">Email</label>
                  <input name='email' required className='form-control' onChange={inputHandler} value={editingStudents?.email} type="email" />
                </div>
                <div className="mt-3">
                  <label htmlFor="">Gender</label>
                  <input name='gender' required className='form-control' onChange={inputHandler} value={editingStudents?.gender} type="text" />
                </div>
                <div className="mt-3">
                  <label htmlFor="">Profile</label>
                  <input name='profile'  onChange={imageHandler} className='form-control' type="file" />
                </div>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="notstaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form action="" onSubmit={AddStudents}>
                <div className="mt-3">
                  <label htmlFor="">Name</label>
                  <input name='name' onChange={inputHandler} className='form-control' type="text" />
                </div>
                <div className="mt-3">
                  <label htmlFor="">Email</label>
                  <input name='email' className='form-control' onChange={inputHandler} type="email" />
                </div>
                <div className="mt-3">
                  <label htmlFor="">password</label>
                  <input name='password' className='form-control' onChange={inputHandler} type="text" />
                </div>
                <div className="mt-3">
                  <label htmlFor="">Gender</label>
                  <input name='gender' className='form-control' onChange={inputHandler} type="text" />
                </div>
                <div className="mt-3">
                  <label htmlFor="">Profile</label>
                  <input name='profile' onChange={imageHandler} className='form-control' type="file" />
                </div>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
