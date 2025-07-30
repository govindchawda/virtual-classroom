import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const api = import.meta.env.VITE_API_BASE_URL;

export default function Present() {
    const [classes, setClasses] = useState([]);
    const [loginUser, setloginUser] = useState();

    // GET CLASSES
    useEffect(() => {
        if (loginUser?.role == "admin") {
            axios.get(`${api}/classes/getall`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('tokeId')
                }
            }).then((res) => {
                if (!res) {
                    toast.error('Interval server error');
                }
                setClasses(res.data.result)
            }).catch((error) => {
                console.log("Attendance page error", error)
            })
        }
        if (loginUser?.role == "teacher") {
            axios.get(`${api}/classes/showClassIncludeTeachers/${loginUser._id}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('tokeId')
                }
            }).then((res) => {
                if (!res) {
                    toast.error('Interval server error');
                }
                setClasses(res.data.result)
            }).catch((error) => {
                console.log("Attendance page error", error)
            })
        }
    }, [loginUser]);


    // GET LOGIN USER
    useEffect(() => {
        axios.get(`${api}/auth/getusers`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('tokeId')
            }
        }).then((res) => {
            if (!res) {
                toast.error("internal server error");
            }
            setloginUser(res.data.result)
        }).catch((error) => {
            toast.error("get self user get error");
            console.log("get self user get error", error);
        })
    })
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="container">
                    <div className='tittle color d-flex justify-content-between'>
                        <span># Show Classes</span>
                    </div>
                    <div className='dflex flex-wrap'>
                        {classes.map((items, index) => {
                            return (
                                <div className='col-sm-4 p-2 ' key={index}>
                                    <div className="col-sm-12 color pb-2">
                                        <div className="col-sm-12 tittle color">
                                            <div className='class-info d-flex justify-content-between'>
                                                <p><strong>Start Time : </strong> {items.schedule[0].startTime} </p>
                                                <p><strong> Time : </strong> {items.schedule[0].endTime} </p>
                                            </div>
                                            <div className='class-info'>
                                                <p className=''><strong>Day : </strong> {items.schedule[0].day.join(',')}</p>
                                            </div>
                                            <div className='class-info d-flex justify-content-between'>
                                                <p><strong>Section : </strong> {items.section} </p>
                                                <p><strong>Tittle : </strong>{items.tittle} </p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between px-3">
                                            <Link to={`/overview/attendance/${items._id}@qwert`} className='btn btn-primary text-light'>Attendance</Link>
                                            <Link to={`/overview/showattendance/${items._id}@qwert`} className='btn btn-secondary text-light'>Show Attendance</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </React.Fragment>
    );
}
