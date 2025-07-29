import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
const api = import.meta.env.VITE_API_BASE_URL;

export default function ViewStudents() {
  const [classes, setClasses] = useState({})
  const data = useParams();
  const [students, setstudents] = useState([]);

  // GET ALL CLASSES
  useEffect(() => {
     if (!data.id) return;
     
    axios.get(`${api}/classes/edit/${data.id}`, {
      headers: {
        "Authorization": "bearer " + localStorage.getItem("tokeId")
      }
    }).then((res) => {
      setClasses(res.data.result)
    }).catch((error) => console.log("view classes error", error))
  }, [data.id]);

  // GET ALL STUDENTS FROM CLASS
  useEffect(() => {
    if (classes.students) {
      axios.get(`${api}/auth/getStudents/${classes.students}`, {
        headers: {
          "Authorization": "bearer " + localStorage.getItem('tokeId')
        }
      }).then((res) => {
        setstudents(res.data.result)
      }).catch((error) => console.log("show students in classes error", error))
    }
  }, [classes.students]);
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className='tittle color d-flex justify-content-between'>
            <span># view Students</span>
          </div>
          <div className="color tittle">
            <div className="d-flex">
              <table className="table table-striped table-inverse table-responsive">
                <thead className="thead-inverse">
                  <tr>
                    <th>S.no</th>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Roll.no</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((items, index) => (
                    <tr key={index}>
                      <td scope="row">{index + 1}</td>
                      <td><img className='useImage' src={items?.profile} alt="" /></td>
                      <td>{items?.name}</td>
                      <td>{items?.email}</td>
                      <td>{items?._id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
