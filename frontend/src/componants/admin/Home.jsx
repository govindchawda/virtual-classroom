import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Students from '../students/Students'
import { PiStudentBold } from "react-icons/pi";

const api = import.meta.env.VITE_API_BASE_URL;

export default function Home() {
    const [students, setStudents] = useState([])
    const [maleStudent, setMaleStudents] = useState([])
    const [girlStudent, setGirlStudents] = useState([])
    const [teachers, setTeachers] = useState([])
    const [maleTeachers, setMaleTeachers] = useState([])
    const [girlTeachers, setGirlTeachers] = useState([])
    useEffect(()=>{
        axios.get(`${api}/auth/getallstudents`,{
            headers:{"Authorization": "bearer "+localStorage.getItem('tokeId')}
        }).then((res)=>{
            if(!res){
                toast.error('interval server error')
            }
            setStudents(res.data.result)
            setMaleStudents(res.data.result.filter((items)=> items.gender === "male"))
            setGirlStudents(res.data.result.filter((items)=> items.gender === "female"))
        }).catch((error)=>{
            toast.error('get students error');
            console.log('get student error',error);
        })
    },[]);
    useEffect(()=>{
        axios.get(`${api}/auth/getallteachers`,{
            headers:{"Authorization": "bearer "+localStorage.getItem('tokeId')}
        }).then((res)=>{
            if(!res){
                toast.error('interval server error')
            }
            setTeachers(res.data.result)
            setMaleTeachers(res.data.result.filter((items)=> items.gender === "male"))
            setGirlStudents(res.data.result.filter((items)=> items.gender === "female"))
        }).catch((error)=>{
            toast.error('get students error');
            console.log('get student error',error);
        })
    },[]);
    return (
        <>
            <div className="container-fluid">
                <div className="container">
                    <div className='tittle color d-flex justify-content-between'>
                        <span># Overview</span>
                    </div>
                    <div className="mt-3 d-flex flrx-wrap">
                        <div className="col-sm-6">
                            <div className="color p-4 m-2">
                                <h3>{students.length}  Students <PiStudentBold/></h3>
                                <div className='d-flex justify-content-evenly'>
                                <strong><span>Boys : </span>{maleStudent.length}</strong>
                                <strong><span>Girls : </span>{girlStudent.length}</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="color m-2 color p-4">
                                <h3>{teachers.length}  Teachers <PiStudentBold/></h3>
                                <div className='d-flex justify-content-evenly'>
                                <strong><span>male : </span>{maleTeachers.length}</strong>
                                <strong><span>female : </span>{girlTeachers.length}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
