import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
const api = import.meta.env.VITE_API_BASE_URL;

export default function ViewClasses() {
  const [classes, setClasses] = useState({})
  const data = useParams();
  const [teacher, setTeacher] = useState({})
  // GET CLASS
  useEffect(() => {
    axios.get(`${api}/classes/edit/${data.id}`, {
      headers: {
        "Authorization": "bearer " + localStorage.getItem("tokeId")
      }
    }).then((res) => {
      setClasses(res.data.result)
    }).catch((error) => console.log("view classes error", error))
  }, [data.id]);

  // GET TEACHER BY CLASS
  useEffect(() => {
    if (classes.teacherId) {
      axios.get(`${api}/auth/editusers/${classes.teacherId}`, {
        headers: {
          "Authorization": "bearer " + localStorage.getItem('tokeId')
        }
      }).then((res) => {
        setTeacher(res.data.result)
      }).catch((error) => console.log("show teacher in classes error", error))
    }
  }, [classes.teacherId]);
  
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className='tittle color d-flex justify-content-between'>
            <span># view Classes</span>
          </div>
          <div className="color tittle">
            <div className="dflex flex-wrap mediaFonts justify-content-between">
              <div className="col-sm-7 teachers mt-2 p-3">
                {Array.isArray(classes.schedule) && classes.schedule.length > 0 && (
                  <>
                    <div className='d-flex  justify-content-between'>
                      <div className='col-sm-6'>
                        <h6 >Start Time</h6>
                        {classes?.schedule[0]?.startTime}
                      </div>
                      <div className='col-sm-4'>
                        <h6>End Time</h6>
                        {classes?.schedule[0]?.endTime}
                      </div>
                      <div className='col-sm-4'>
                        <Link className='btn btn-info mt-4 text-light' to={`/overview/Students/${data.id}@qwert`}>View Students</Link>
                      </div>
                    </div>
                  </>
                )}
                <div className='d-flex justify-content-between mt-4'>
                  <div className='col-sm-5'>
                    <h6>Tittle</h6>
                    {classes?.tittle}
                  </div>
                  <div className='col-sm-4'>
                    <h6>Class Code</h6>
                    {classes?.classCode}
                  </div>
                  <div className='col-sm-4'>
                    <h6>Section</h6>
                    {classes?.section}
                  </div>
                </div>
                <div className='mt-4'>
                  <h6>Day</h6>
                  {Array.isArray(classes.schedule) && classes.schedule.length > 0 && (
                    <>
                      {classes?.schedule[0]?.day.join(',')}
                    </>
                  )}
                </div>

              </div>
              <div className="col-sm-4 teachers p-3">
                <div className='text-center'>
                  <h3>Teacher</h3>
                  <img className='useImage' src={teacher?.profile} alt="" />
                  <h2 className='text-capitalize mt-3'>{teacher?.name}</h2>
                  <div className='pb-2 d-flex justify-content-between'>
                    <span>Email :- </span>  <span>{teacher?.email}</span>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <span>Gender :- </span>  <span>{teacher?.gender}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}
