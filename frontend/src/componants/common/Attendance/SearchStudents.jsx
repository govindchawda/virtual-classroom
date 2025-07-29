import axios from 'axios';
import React, { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const api = import.meta.env.VITE_API_BASE_URL;

export default function SearchStudents() {
    const [inputValue, setInputValue] = useState();
    const [classes, setClasses] = useState([]);
    const [tragetClass, setTargetClass] = useState();
    const [user, setUser] = useState();

    const searchStudents = async () => {
        try {
            if (!inputValue) {
                return
            }
            const res = await axios.get(`${api}/attendannce/getByStudent/${inputValue}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("tokeId")
                }
            });
            if (!res) {
                toast.error("interval server error");
            }
            toast(res.data.message)
            setClasses(res.data.result);
        } catch (error) {
            toast.error("search student error")
            console.log("search student error", error)
        }
    }

    const showStudentAttendance = async (id, studentId) => {
        try {

            console.log(studentId)
            if (!id || !studentId) {
                return;
            }
            setTargetClass(classes.filter((items) => items?.classId?._id == id));
            const res = await axios.get(`${api}/auth/editusers/${studentId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('tokeId')
                }
            });
            if (!res) {
                toast.error("interval Server error");
            }
            setUser(res.data.result)
        } catch (error) {
            toast.error("show attendance error");
            console.log("show attendance error", error)
        }
    }

    const contentRef = useRef();

    const downloadPDF = () => {
        const input = contentRef.current;
        if (!input) return;

        html2canvas(input, { useCORS: true, scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("attendance-details.pdf");
        });
    };
    return (
        <React.Fragment>
            <div className="constiner-fluid">
                <div className="container">
                    <div className='tittle color d-flex justify-content-between'>
                        <span># Search Students</span>
                    </div>
                    <hr />
                    <div className="col-sm-5">
                        <div className='tittle'>
                            <label htmlFor="">Search by Student id</label>
                            <input type="text" onChange={(e) => setInputValue(e.target.value)} name='studentId' className='form-control mt-2' placeholder='search here' />
                            <button onClick={searchStudents} className='btn btn-primary mt-3'>Search</button>
                        </div>
                    </div>

                    <div className="mt-3 color d-flex flex-wrap justify-content-evenly">
                        {classes.map((items, index) => (
                            <div key={index} className='col-sm-5'>
                                <div>

                                </div>
                                <div className='col-sm-12 mt-3 p-3 border'>
                                    <div className='m-2 d-flex justify-content-between'>
                                        <div>ClassName :  {items?.classId?.tittle || "null"}</div>
                                        <button className='btn btn-info' onClick={() => showStudentAttendance(items?.classId?._id, items?.record[0]?.student?.studentId)} data-bs-toggle="modal" data-bs-target="#staticBackdrop">View Details</button>
                                    </div>
                                    <div>Student Name : {items?.record[0]?.student?.name || "null"}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div class="modal fade  modal-dialog-scrollable" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Student Attendance Detail</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" ref={contentRef}>
                            {tragetClass?.map((items, index) => (
                                <div key={index}>
                                    <div className='d-flex justify-content-between'>
                                        <img className='modalUserImage' src={user?.profile} crossOrigin="anonymous" alt="User" />
                                        <div>
                                            <h6 className='py-2'>Name :  {user?.name}</h6>
                                            <h6 className='py-2'>
                                                Email :  {user?.email}
                                            </h6>
                                            <h6 className='py-2'>
                                                Gender :  {user?.gender}
                                            </h6>
                                            ClassName : {items?.classId?.tittle}
                                        </div>
                                    </div>
                                    <div>
                                        <div className='d-flex flex-wrap'>
                                            {items?.record?.map((item, index) => (
                                                <div key={index} className='col-sm-5 m-2 border'>
                                                    <div className='col-sm-10 d-flex py-2'>
                                                        <div>
                                                            {item?.date} : {item?.student?.status}
                                                        </div>
                                                        <div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={downloadPDF} class="btn btn-primary mt-2">Download</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </React.Fragment>
    )
}
