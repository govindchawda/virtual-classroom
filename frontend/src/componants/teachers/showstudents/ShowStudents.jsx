import axios from 'axios';
import React, { useEffect, useState } from 'react'
const api = import.meta.env.VITE_API_BASE_URL;

export default function ShowStudents() {
  const [students, setStudents] = useState([])

  // SHOW ALL STUDENTS
  useEffect(() => {
    axios.get(`${api}/auth/getallstudents`, {
      headers: { "authorization": "baerer " + localStorage.getItem("tokeId") }
    }).then((res) => {
      setStudents(res.data.result);
    }).catch((error) => console.log("get students error", error))
  }, []);
  
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className='tittle color d-flex justify-content-between'>
            <span># Show Students</span>
          </div>
          <div className='scroll-table-container'>
          <table class="table table-striped table-inverse table-responsive">
            <thead class="thead-inverse">
              <tr>
                <th>S.no</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Roll.no</th>
              </tr>
            </thead>
            <tbody>
              {students.map((items, index) => (
                <tr key={index}>
                  <td scope="row" key={index} >{index + 1}</td>
                  <td><img width={40} src={items.profile} alt="" /></td>
                  <td>{items.name}</td>
                  <td>{items.email}</td>
                  <td>{items.gender}</td>
                  <td>{items._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </>
  )
}
