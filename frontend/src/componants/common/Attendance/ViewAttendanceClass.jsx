import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
const api = import.meta.env.VITE_API_BASE_URL;

export default function ViewAttendanceClass() {
    const classObjectId = useParams();
    const [classes, setClasses] = useState();
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({
        classId: "",
        teacherId: "",
        date: "",
        student: []
    });
    // GET CLASS
    useEffect(() => {
        axios.get(`${api}/classes/edit/${classObjectId.id}`, {
            headers: {
                "Authorization": "bearer " + localStorage.getItem('tokeId')
            }
        }).then((res) => {
            if (!res) {
                toast.error("interval server error")
            }
            setClasses(res.data.result)
        }).catch((error) => {
            toast.error("interval server error")
            console.log("get class for attendance error", error);
        })
    }, []);

    // GET STUDENTS
    useEffect(() => {
        if (classes) {

            axios.get(`${api}/auth/getStudents/${classes?.students}`, {
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("tokeId")
                }
            }).then((res) => {
                if (!res) {
                    toast.error("inter server error")
                }
                setStudents(res.data.result)
            }).catch((error) => {
                toast.error("inter server error")
                console.log("get multiple student for attendance error", error)
            })
        }
    }, [classes]);

    const inputhandler = (event) => {
        setAttendance({ ...attendance, [event.target.name]: event.target.value });
    }

    console.log("outside attendance",attendance)
    const handleAttendanceChange = (studentId, role, name) => {
        if(!studentId || !role || !name){
            return toast.error("please field all students")
        }
        setAttendance(prev => {
            const updatedStudents = [...prev.student];
            const existingIndex = updatedStudents.findIndex(s => s.studentId === studentId);
            // console.log("existingIndex",existingIndex)
            if (existingIndex !== -1) {
                updatedStudents[existingIndex].status = role;
            } else {
                updatedStudents.push({ "studentId": studentId, "status":role, "name":name });
            }

            return { ...prev, student: updatedStudents };
        });
    };

    useEffect(() => {
        setAttendance(prev => ({ ...prev, classId: classes?._id, teacherId: classes?.teacherId }))
    }, [classes]);

    const submitAttendance = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${api}/attendannce/add`, attendance, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('tokeId'),
                    "Content-Type": "application/json",
                }
            });
            if(!res){
                toast.error("attendance is not save")
            }
            toast(res.data.message)
        } catch (error) {
            toast.error("interval error");
            console.log("submit students error", error);
        }
    }
    
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="container">
                    <div className='tittle color d-flex justify-content-between'>
                        <span># Show Attendance</span>
                    </div>
                    <div className="mt-4 tittle color mediaFonts">
                        <form action="" onSubmit={submitAttendance}>
                            <div className="attendanceMedia d-flex justify-content-between">
                                <div className='attendance-box'>Tittle : <p>{classes?.tittle}</p></div>
                                <div className='attendance-box'>TeacherId : <p>{classes?.teacherId}</p></div>
                                <div className='attendance-box'>classId : <p>{classes?._id}</p></div>
                                <div className='attendance-box'>Date : <span> <input onChange={inputhandler} required type="date" className='form-control' name="date" id="" /></span></div>
                            </div>
                            <div className='scroll-table-container'>
                            <table className="table table-striped table-inverse table-responsive mt-3">
                                <thead className="thead-inverse ">
                                    <tr>
                                        <th>S.no</th>
                                        <th>Profile</th>
                                        <th>Name</th>
                                        <th>Enrollment.no</th>
                                        <th>online</th>
                                        <th>offline</th>
                                        <th>absent</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((items, index) => (
                                        <tr key={index}>
                                            <td scope="row">{index + 1}</td>
                                            <td><img className='useImage' src={items.profile} alt="" /></td>
                                            <td>{items.name}</td>
                                            <td> <input type="text" name='studentId' disabled className='form-control' readOnly value={items?._id} onChange={inputhandler} /></td>
                                            <td>
                                                <input type="radio" value="online" name={index}
                                                    onChange={() => handleAttendanceChange(items._id, "online", items.name)}required />
                                            </td>
                                            <td>
                                                <input type="radio" value="offline" name={index}
                                                    onChange={() => handleAttendanceChange(items._id, "offline", items.name)} required />
                                            </td>
                                            <td>
                                                <input type="radio" value="absent" name={index}
                                                    onChange={() => handleAttendanceChange(items._id, "absent", items.name)} required/>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                            <button type='submit' className='btn btn-info mt-3 mr-auto'>submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </React.Fragment>
    )
}
