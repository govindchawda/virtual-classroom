import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import ShowStudent from '../../admin/users/ShowStudent';
const api = import.meta.env.VITE_API_BASE_URL;

export default function SearchAttendanceClass() {
    const classObjectId = useParams();
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState();
    const [user, setUser] = useState();


    // GET STUDENTS
    useEffect(() => {
        axios.get(`${api}/attendannce/getByClass/${classObjectId.id}`, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("tokeId")
            }
        }).then((res) => {
            if (!res) {
                toast.error("inter server error")
            }
            setClasses(res.data.result);
        }).catch((error) => {
            toast.error("inter server error")
            console.log("get multiple student for attendance error", error)
        })
    }, []);


    const ShowStudent = async (id) => {
        try {
            const res = await axios.get(`${api}/attendannce/get/${id}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('tokeId')
                }
            });
            if (!res) {
                toast.error("interval server error");
            }
            setStudents(res.data.result);
        } catch (error) {
            toast.error("get students error")
            console.log("getAttendance error", error)
        }
    }

    const showUserDetails = async (id) => {
        try {
            const res = await axios.get(`${api}/auth/editusers/${id}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("tokeId")
                }
            });
            if (!res) {
                toast.error("interval server error");
            }
            setUser(res.data.result)
            const myModal = new bootstrap.Modal('#staticBackdrop2', {
                backdrop: 'static',
                keyboard: false
            });
            myModal.show();
        } catch (error) {
            toast.error("get user error");
            console.log("get user error", error)
        }
    }
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="container">
                    <div className='tittle color d-flex justify-content-between'>
                        <span># Search Attendance</span>
                    </div>
                    <div>
                        
                    </div>
                    <div className="tittle color scroll-table-container mediaFonts">
                        <table className="table table-striped table-inverse table-responsive mt-4">
                            <thead className="thead-inverse">
                                <tr>
                                    <th>S.no</th>
                                    <th>ClassName</th>
                                    {/* <th>Teacher</th> */}
                                    <th>date</th>
                                    <th>Student</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes.map((items, index) => (
                                    <tr key={index}>
                                        <td scope="row">{index + 1}</td>
                                        <td>{items.classId}</td>
                                        {/* <td>{items?.teacherId}</td> */}
                                        <td className='textWrap'>{items.date}</td>
                                        <td className='textWrap'><button className='btn btn-primary' onClick={() => ShowStudent(items._id)} data-bs-toggle="modal" href="#staticBackdrop" role="button">View Students</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Students</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" style={{ overflowX: "auto" }}>
                            <table className="table table-striped table-inverse table-responsive mt-4">
                                <thead className="thead-inverse">
                                    <tr>
                                        <th>S.no</th>
                                        <th>Name</th>
                                        <th>Enrollment.no</th>
                                        <th>Status</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {students?.student?.map((items, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{items?.name}</td>
                                            <td>{items?.studentId}</td>
                                            <td>{items?.status}</td>
                                            <td><button onClick={() => showUserDetails(items.studentId)} className='btn btn-info' data-bs-target="#staticBackdrop2" data-bs-toggle="modal" data-bs-dismiss="modal">View</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade mediaFonts" id="staticBackdrop2" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel2" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel2">Student</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body d-flex">
                            <div>
                                <img className='modalUserImage' src={user?.profile} alt="" />
                            </div>
                            <div>

                            <div className='d-flex justify-content-between tittle'>
                                    <div><label htmlFor="">Name : </label> </div>
                                    <div><label htmlFor="">{user?.name}</label></div>
                            {/* {user?._id} */}
                            </div>
                            <div className='d-flex justify-content-between tittle'>
                                    <div><label htmlFor="">Email : </label> </div>
                                    <div><label htmlFor="">{user?.email}</label></div>
                            {/* {user?._id} */}
                            </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-primary" data-bs-target="#staticBackdrop" data-bs-toggle="modal" data-bs-dismiss="modal">Back to Students</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </React.Fragment>
    )
}
