import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
const api = import.meta.env.VITE_API_BASE_URL;

export default function ManageClasses() {
    const userObjectId = useParams();
    const [showTeacherOption, setShowTeacherOption] = useState([]);
    const [classes, setClasses] = useState([]);
    const [student, setStudents] = useState([]);
    const [addStudent, setADDStudents] = useState('');
    const [updateClass, setUpdateClass] = useState({
        _id: "",
        tittle: "",
        classCode: "",
        section: "",
        teacherId: "",
        students: [],
        schedule: [
            {
                day: "",
                startTime: "",
                endTime: "",
            }
        ]
    })

    // GET ALL CLASSES
    useEffect(() => {
        // admin
        if (showTeacherOption.role === "admin") {
            axios.get(`${api}/classes/getAll`, {
                headers: {
                    "Authorization": "bearer " + localStorage.getItem("tokeId")
                }
            }).then((res) => {
                setClasses(res.data.result)
            }).catch((error) => console.log("get all class error" + error));
        }
        // teacher
        axios.get(`${api}/classes/showClassIncludeTeachers/${showTeacherOption._id}`).then((res) => {
            if (showTeacherOption.role == "teacher") {
                setClasses(res.data.result)
            }
        }).catch((error) => {
            console.log("get classes includes teachers", error);
        })
    }, [showTeacherOption]);

    // DELETE CLASSES
    const deleteClasses = async (id) => {
        try {
            const res = await axios.delete(`${api}/classes/delete/${id}`, {
                headers: {
                    "Authorization": "bearer " + localStorage.getItem("tokeId")
                }
            });
            toast(res.data.message);
        } catch (error) {
            console.log("delete classes error" + error);
        }
    }

    // EDIT CLASSES
    const editClasses = async (id) => {
        try {
            const res = await axios.get(`${api}/classes/edit/${id}`, {
                headers: {
                    "Authorization": "bearer " + localStorage.getItem("tokeId")
                }
            });

            toast(res.data.message)
            setUpdateClass(res.data.result);

            // CALL STUDENTS FUNCTIN FOR SHOW THE STUDENTS
            students(res.data);
        } catch (error) {
            console.log("edit classes error" + error);
        }
    }

    // GET STUDENTS BY CLASSES
    const students = async (data) => {
        const id = data.result.students;
        const res = await axios.get(`${api}/auth/getStudents/${id}`, {
            headers: {
                "authorization": "bearer " + localStorage.getItem("tokeId")
            }
        });
        setStudents(res.data.result);
    }

    // DELETE STUDENTS FROM CLASSES
    const deleteStudents = async (id) => {
        try {
            const res = await axios.get(`${api}/classes/delteStudentFromClass`, {
                params: {
                    studentId: id,
                    classId: updateClass._id
                }, headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokeId")
                }
            });
            setUpdateClass(prev => ({
                ...prev,
                students: res.data.result.students
            }));
            // setUpdateClass(res.data.result);
            toast(res.data.message);
            setStudents(student.filter((items, index) => {
                return items._id != id;
            }))
        } catch (error) {
            console.log("delete students error", error);
        }
    }

    // ADD STUDENTS IN THE CLASS
    const studentHandler = (event) => {
        setADDStudents(event.target.value);
    }

    const addStudentsInClass = async (event) => {
        try {
            event.preventDefault();
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            }

            const res = await axios.post(`${api}/classes/addStudentForClass`, {
                newStudent: addStudent,
                classId: updateClass._id
            }, config);
            
            if(res.data.success ===  true && res.data.result?.students){
                setUpdateClass(prev => ({
                    ...prev,
                    students: res.data.result.students
                }));
                 setADDStudents('');
                toast(res.data.message);
            } else{
                toast.error("student is already exsist")
            }
            // setUpdateClass(res.data.result);

            const response = await axios.get(`${api}/auth/getStudents/${res?.data?.result?.students}`, {
                headers: {
                    "authorization": "bearer " + localStorage.getItem("tokeId")
                }
            });
            setStudents(response.data.result);
           
        } catch (error) {
            console.log("add student in class error : ", error)
        }
    }

    // UPDATE CLASSES
    const inputHandler = (event) => {
        setUpdateClass({ ...updateClass, [event.target.name]: event.target.value });
    }

    const scheduleInputHandler = (event) => {
        const updatedSchedule = [...updateClass.schedule];
        updatedSchedule[0] = { ...updatedSchedule[0], [event.target.name]: event.target.value }
        setUpdateClass({ ...updateClass, schedule: updatedSchedule });
    }

    // UPDATE DAYS BY CHECKBOX

    const inputDayHandler = (event) => {

        const exsistDays = updateClass.schedule[0]?.day;

        let updatedDays;
        if (event.target.checked) {
            updatedDays = [...new Set([...exsistDays, event.target.name])];
            // new Set YE DUPLICATE KO HATATA H
        } else {
            updatedDays = exsistDays.filter((items) => {
                return items !== event.target.name;
            })
        }

        const updatedSchudle = [...updateClass.schedule];
        updatedSchudle[0] = { ...updatedSchudle[0], day: updatedDays }

        setUpdateClass(updateClass => ({ ...updateClass, schedule: updatedSchudle }))
    };


    const updateCls = async (event) => {
        try {
            event.preventDefault();
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            }
            const res = await axios.post(`${api}/classes/update`, updateClass, config);
            toast(res.data.message);
            const classRes = await axios.get(`${api}/classes/getAll`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("tokeId")
                }
            });
            setClasses(classRes.data.result);
        } catch (error) {
            console.log("update class  error", error);
        }
    }

    // useEffect(()=>{
    //     console.log("updateClass",updateClass)
    // },[updateClass])


    // USER DETAILS
    useEffect(() => {
        axios.get(`${api}/auth/getusers`, {
            headers: {
                "Authorization": "bearer " + localStorage.getItem('tokeId')
            }
        }).then((res) => {
            if (res.data.result) {
                setShowTeacherOption(res.data.result);
            }
        }).catch((error) => {
            toast.error("interval error")
            console.log("get self", error)
        });
    }, []);


    console.log("userObjectId",userObjectId)
    // janrate google meeting
     const createMeeting = async (id) => {

         const response = await axios.get(`${api}/googleMeeting/get/${id}`);
            if(!response){
                alert("hii");
            }
            alert("hello");
         console.log("response",response);


         const meetLink = "https://meet.google.com/new"; // This always creates a new meet, but opens for the current user only
         const newUrl = {meetLink:meetLink,classId:id}
         console.log("newUrl",newUrl)
         const res = await axios.post(`${api}/googleMeeting/create`,newUrl);
         console.log("res.data",res.data)
        window.open(meetLink, "_blank");
    }
    return (
        <>
            <div className="container-fluid">
                <div className="container">
                    <div className='tittle color d-flex justify-content-between'>
                        <span># Manage Classes</span>
                        <div>
                            <Link to="add-class" className='btn btn-primary'>+ Add classes</Link>
                        </div>
                    </div>
                    <div className='dflex flex-wrap'>
                        {classes.map((items, index) => {
                            return (
                                <div className='col-sm-12 col-md-6  col-12 col-lg-4 p-2 ' key={index}>
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
                                                <p><strong>Tittle : </strong>   {items.tittle} </p>
                                               <button onClick={()=> createMeeting(items._id)}  className='btn btn-info'>Join</button>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between px-3">
                                            <button onClick={() => editClasses(items._id)} data-bs-toggle="modal" data-bs-target="#editClassModal" className='btn btn-info'>Edit</button>
                                            {/* <button onClick={() => editClasses(items._id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop" className='btn btn-info'>Edit</button> */}
                                            <button onClick={() => deleteClasses(items._id)} className='btn btn-danger'>Delete</button>
                                            <Link to={`/overview/classes/${items._id}@qwert`} className='btn btn-primary text-light'>View</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {/* <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"> */}
            <div className="modal fade" id="editClassModal" tabIndex="-1" aria-labelledby="editClassModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="" onSubmit={updateCls}>
                                <div className="mt-3">
                                    <label htmlFor="">_id</label>
                                    <input type="text" value={updateClass?._id} readOnly className='form-control' />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="">Tittle</label>
                                    <input type="text" name='tittle' value={updateClass?.tittle} onChange={inputHandler} className='form-control' />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="">classCode</label>
                                    <input type="text" name='classCode' value={updateClass?.classCode} className='form-control' onChange={inputHandler} />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="">section</label>
                                    <input type="text" name='section' value={updateClass?.section} className='form-control' onChange={inputHandler} />
                                </div>
                                <div className="mt-3 p-2 select-option">
                                    <label htmlFor="Day">Day</label>
                                    <div className='d-flex mt-3'>
                                        <div className='col-sm-4'><input checked={updateClass?.schedule[0]?.day?.includes('monday')} type="checkbox" className='mx-2' onChange={inputDayHandler} name="monday" id="" /><label htmlFor="">Monday</label></div>
                                        <div className='col-sm-4'><input checked={updateClass?.schedule[0]?.day?.includes('tuesday')} type="checkbox" className='mx-2' onChange={inputDayHandler} name="tuesday" id="" /><label htmlFor="">Tuesday</label></div>
                                        <div className='col-sm-4'><input checked={updateClass?.schedule[0]?.day?.includes('wednesday')} type="checkbox" className='mx-2' onChange={inputDayHandler} name="wednesday" id="" /><label htmlFor="">Wednesday</label></div>
                                    </div>
                                    <div className="d-flex mt-3">
                                        <div className='col-sm-4'><input checked={updateClass?.schedule[0]?.day?.includes('thursday')} type="checkbox" className='mx-2' onChange={inputDayHandler} name="thursday" id="" /><label htmlFor="">Thursday</label></div>
                                        <div className='col-sm-4'><input checked={updateClass?.schedule[0]?.day?.includes('friday')} type="checkbox" className='mx-2' onChange={inputDayHandler} name="friday" id="" /><label htmlFor="">Friday</label></div>
                                        <div className='col-sm-4'><input checked={updateClass?.schedule[0]?.day?.includes('saturday')} type="checkbox" className='mx-2' onChange={inputDayHandler} name="saturday" id="" /><label htmlFor="">Saturday</label></div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="">startTime</label>
                                    <input type="text" name='startTime' value={updateClass?.schedule[0]?.startTime} className='form-control' onChange={scheduleInputHandler} />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="">endTime</label>
                                    <input type="text" name='endTime' value={updateClass?.schedule[0]?.endTime} className='form-control' onChange={scheduleInputHandler} />
                                </div>
                                {showTeacherOption.role === "admin" ?
                                    <div className="mt-3">
                                        <label htmlFor="">teacherId</label>
                                        <input type="text" name='teacherId' value={updateClass?.teacherId} className='form-control' onChange={inputHandler} />
                                    </div> : <div className="mt-3">
                                        <label htmlFor="">teacherId</label>
                                        <input type="text" readOnly disabled value={showTeacherOption._id} name='teacherId' className='form-control' onChange={inputHandler} />
                                    </div>}
                                <div className="mt-3">
                                    <label htmlFor="" className='alert alert-info w-100'>students</label>
                                    <div className='d-flex justify-content-between table'>
                                        <div className='mediaFonts'>Name</div>
                                        <div className='mediaFonts'>Roll.No</div>
                                        <div className='mediaFonts'>Action</div>
                                    </div>
                                    {student.map((items, index) => (
                                        <div className='mediaFonts d-flex p-2 justify-content-between' key={index}>
                                            <div>{items.name}</div>
                                            <div>{items._id}</div>
                                            <div onClick={() => deleteStudents(items._id)} className='btn btn-danger'>Delete</div>
                                        </div>
                                    ))}
                                    <label className='mt-3 btn btn-primary' data-bs-toggle="modal" data-bs-target="#addStudentModal">+ Add Students</label>
                                    {/* <label className='mt-3 btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">+ Add Students</label> */}

                                </div>
                                <hr />
                                <button type="submit" data-bs-dismiss="modal" className="btn btn-primary mt-3">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
            <div className="modal fade" id="addStudentModal" tabIndex="-1" aria-labelledby="addStudentModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">+Add students</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="" onSubmit={addStudentsInClass}>
                                <label htmlFor="">Enter Student</label>
                                <input type="text" name='students' className='form-control mt-3' onChange={studentHandler} />
                                <button type="submit" data-bs-dismiss="modal" className="btn btn-primary mt-3">Save changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import { Link, useParams } from 'react-router-dom';

// export default function ManageClasses() {
//     const userObjectId = useParams();
//     const [showTeacherOption, setShowTeacherOption] = useState([]);
//     const [classes, setClasses] = useState([]);
//     const [student, setStudents] = useState([]);
//     const [addStudent, setADDStudents] = useState('');
//     const [updateClass, setUpdateClass] = useState({
//         _id: "",
//         tittle: "",
//         classCode: "",
//         section: "",
//         teacherId: "",
//         students: [],
//         schedule: [
//             {
//                 day: "",
//                 startTime: "",
//                 endTime: "",
//             }
//         ]
//     })

//     // GET ALL CLASSES
//     useEffect(() => {
//         // admin
//         if (showTeacherOption.role === "admin") {
//             axios.get("http://localhost:4000/api/classes/getAll", {
//                 headers: {
//                     "Authorization": "bearer " + localStorage.getItem("tokeId")
//                 }
//             }).then((res) => {
//                 setClasses(res.data.result)
//             }).catch((error) => console.log("get all class error" + error));
//         }
//         // teacher
//         axios.get(`http://localhost:4000/api/classes/showClassIncludeTeachers/${showTeacherOption._id}`).then((res) => {
//             if (showTeacherOption.role == "teacher") {
//                 setClasses(res.data.result)
//             }
//         }).catch((error) => {
//             console.log("get classes includes teachers", error);
//         })
//     }, [showTeacherOption]);

//     // DELETE CLASSES
//     const deleteClasses = async (id) => {
//         try {
//             const res = await axios.delete(`http://localhost:4000/api/classes/delete/${id}`, {
//                 headers: {
//                     "Authorization": "bearer " + localStorage.getItem("tokeId")
//                 }
//             });
//             toast(res.data.message);
//         } catch (error) {
//             console.log("delete classes error" + error);
//         }
//     }

//     // EDIT CLASSES
//     const editClasses = async (id) => {
//         try {
//             const res = await axios.get(`http://localhost:4000/api/classes/edit/${id}`, {
//                 headers: {
//                     "Authorization": "bearer " + localStorage.getItem("tokeId")
//                 }
//             });

//             toast(res.data.message)
//             setUpdateClass(res.data.result);

//             // CALL STUDENTS FUNCTIN FOR SHOW THE STUDENTS
//             students(res.data);
//         } catch (error) {
//             console.log("edit classes error" + error);
//         }
//     }

//     // GET STUDENTS BY CLASSES
//     const students = async (data) => {
//         const id = data.result.students;
//         const res = await axios.get(`http://localhost:4000/api/auth/getStudents/${id}`, {
//             headers: {
//                 "authorization": "bearer " + localStorage.getItem("tokeId")
//             }
//         });
//         setStudents(res.data.result);
//     }

//     // DELETE STUDENTS FROM CLASSES
//     const deleteStudents = async (id) => {
//         try {
//             const res = await axios.get('http://localhost:4000/api/classes/delteStudentFromClass', {
//                 params: {
//                     studentId: id,
//                     classId: updateClass._id
//                 }, headers: {
//                     Authorization: "Bearer " + localStorage.getItem("tokeId")
//                 }
//             });
//             setUpdateClass(res.data.result);
//             toast(res.data.message);
//             setStudents(student.filter((items, index) => {
//                 return items._id != id;
//             }))
//         } catch (error) {
//             console.log("delete students error", error);
//         }
//     }

//     // ADD STUDENTS IN THE CLASS
//     const studentHandler = (event) => {
//         setADDStudents(event.target.value);
//     }

//     const addStudentsInClass = async (event) => {
//         try {
//             event.preventDefault();
//             const config = {
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             }

//             const res = await axios.post('http://localhost:4000/api/classes/addStudentForClass', {
//                 newStudent: addStudent,
//                 classId: updateClass._id
//             }, config);
//             toast(res.data.message);
//             setUpdateClass(res.data.result)
//             const response = await axios.get(`http://localhost:4000/api/auth/getStudents/${res.data.result.students}`, {
//                 headers: {
//                     "authorization": "bearer " + localStorage.getItem("tokeId")
//                 }
//             });
//             setStudents(response.data.result);
//             // setADDStudents('');
//         } catch (error) {
//             console.log("add student in class error : ", error)
//         }
//     }

//     // UPDATE CLASSES
//     const inputHandler = (event) => {
//         setUpdateClass({ ...updateClass, [event.target.name]: event.target.value });
//     }

//     const scheduleInputHandler = (event) => {
//         const updatedSchedule = [...updateClass.schedule];
//         updatedSchedule[0] = { ...updatedSchedule[0], [event.target.name]: event.target.value }
//         setUpdateClass({ ...updateClass, schedule: updatedSchedule });
//     }

//     const updateCls = async (event) => {
//         try {
//             event.preventDefault();
//             const config = {
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             }
//             const res = await axios.post(`http://localhost:4000/api/classes/update`, updateClass, config);
//             toast(res.data.message);
//             const classRes = await axios.get("http://localhost:4000/api/classes/getAll", {
//                 headers: {
//                     "Authorization": "Bearer " + localStorage.getItem("tokeId")
//                 }
//             });
//             setClasses(classRes.data.result);
//         } catch (error) {
//             console.log("update class  error", error);
//         }
//     }

//     // UPDATE DAYS BY CHECKBOX

//     const inputDayHandler = (event) => {

//         const exsistDays = updateClass.schedule[0]?.day;

//         let updatedDays;
//         if (event.target.checked) {
//             updatedDays = [...new Set([...exsistDays, event.target.name])];
//             // new Set YE DUPLICATE KO HATATA H
//         } else {
//             updatedDays = exsistDays.filter((items) => {
//                 return items !== event.target.name;
//             })
//         }

//         const updatedSchudle = [...updateClass.schedule];
//         updatedSchudle[0] = { ...updatedSchudle[0], day: updatedDays }

//         setUpdateClass(updateClass => ({ ...updateClass, schedule: updatedSchudle }))
//     };
//     // useEffect(()=>{
//     //     console.log("updateClass",updateClass)
//     // },[updateClass])


//     // USER DETAILS
//     useEffect(() => {
//         axios.get('http://localhost:4000/api/auth/getusers', {
//             headers: {
//                 "Authorization": "bearer " + localStorage.getItem('tokeId')
//             }
//         }).then((res) => {
//             if (res.data.result) {
//                 setShowTeacherOption(res.data.result);
//             }
//         }).catch((error) => {
//             toast.error("interval error")
//             console.log("get self", error)
//         });
//     }, []);

//     return (
//         <>
//             <div className="container-fluid">
//                 <div className="container">
//                     <div className='tittle color d-flex justify-content-between'>
//                         <span># Manage Classes</span>
//                         <div>
//                             <Link to="add-class" className='btn btn-primary'>+ Add classes</Link>
//                         </div>
//                     </div>
//                     <div className='d-flex flex-wrap'>
//                         {classes.map((items, index) => {
//                             return (
//                                 <div className='col-sm-4 p-2 ' key={index}>
//                                     <div className="col-sm-12 color pb-2">
//                                         <div className="col-sm-12 tittle color">
//                                             <div className='class-info d-flex justify-content-between'>
//                                                 <p><strong>Start Time : </strong> {items.schedule[0].startTime} </p>
//                                                 <p><strong> Time : </strong> {items.schedule[0].endTime} </p>
//                                             </div>
//                                             <div className='class-info'>
//                                                 <p className=''><strong>Day : </strong> {items.schedule[0].day.join(',')}</p>
//                                             </div>
//                                             <div className='class-info d-flex justify-content-between'>
//                                                 <p><strong>Section : </strong> {items.section} </p>
//                                                 <p><strong>Tittle : </strong>{items.tittle} </p>
//                                             </div>
//                                         </div>
//                                         <div className="d-flex justify-content-between px-3">
//                                             <button onClick={() => editClasses(items._id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop" className='btn btn-info'>Edit</button>
//                                             <button onClick={() => deleteClasses(items._id)} className='btn btn-danger'>Delete</button>
//                                             <Link to={`/overview/classes/${items._id}@qwert`} className='btn btn-primary text-light'>View</Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                 </div>
//             </div>
//             <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//                 <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <form action="" onSubmit={updateCls}>
//                                 <div className="mt-3">
//                                     <label htmlFor="">_id</label>
//                                     <input type="text" value={updateClass?._id} readOnly className='form-control' />
//                                 </div>
//                                 <div className="mt-3">
//                                     <label htmlFor="">Tittle</label>
//                                     <input type="text" name='tittle' value={updateClass?.tittle} onChange={inputHandler} className='form-control' />
//                                 </div>
//                                 <div className="mt-3">
//                                     <label htmlFor="">classCode</label>
//                                     <input type="text" name='classCode' value={updateClass?.classCode} className='form-control' onChange={inputHandler} />
//                                 </div>
//                                 <div className="mt-3">
//                                     <label htmlFor="">section</label>
//                                     <input type="text" name='section' value={updateClass?.section} className='form-control' onChange={inputHandler} />
//                                 </div>
//                                 <div className="mt-3 p-2 select-option">
//                                     <label htmlFor="Day">Day</label>
//                                     <div className='d-flex mt-3'>
//                                         <div className='col-sm-4'><input checked={updateClass?.schedule[0]?.day?.includes('monday')} type="checkbox" className='mx-2' onChange={inputDayHandler} name="monday" id="" /><label htmlFor="">Monday</label></div>
//                                         <div className='col-sm-4'><input checked={updateClass?.schedule[0]?.day?.includes('tuesday')} type="checkbox" className='mx-2' onChange={inputDayHandler} name="tuesday" id="" /><label htmlFor="">Tuesday</label></div>
//                                         <div className='col-sm-4'><input checked={updateClass?.schedule[0]?.day?.includes('wednesday')} type="checkbox" className='mx-2' onChange={inputDayHandler} name="wednesday" id="" /><label htmlFor="">Wednesday</label></div>
//                                     </div>
//                                     <div className="d-flex mt-3">
//                                         <div className='col-sm-4'><input checked={updateClass?.schedule[0]?.day?.includes('thursday')} type="checkbox" className='mx-2' onChange={inputDayHandler} name="thursday" id="" /><label htmlFor="">Thursday</label></div>
//                                         <div className='col-sm-4'><input checked={updateClass?.schedule[0]?.day?.includes('friday')} type="checkbox" className='mx-2' onChange={inputDayHandler} name="friday" id="" /><label htmlFor="">Friday</label></div>
//                                         <div className='col-sm-4'><input checked={updateClass?.schedule[0]?.day?.includes('saturday')} type="checkbox" className='mx-2' onChange={inputDayHandler} name="saturday" id="" /><label htmlFor="">Saturday</label></div>
//                                     </div>
//                                 </div>
//                                 <div className="mt-3">
//                                     <label htmlFor="">startTime</label>
//                                     <input type="text" name='startTime' value={updateClass?.schedule[0]?.startTime} className='form-control' onChange={scheduleInputHandler} />
//                                 </div>
//                                 <div className="mt-3">
//                                     <label htmlFor="">endTime</label>
//                                     <input type="text" name='endTime' value={updateClass?.schedule[0]?.endTime} className='form-control' onChange={scheduleInputHandler} />
//                                 </div>
//                                 {showTeacherOption.role === "admin" ?
//                                     <div className="mt-3">
//                                         <label htmlFor="">teacherId</label>
//                                         <input type="text" name='teacherId' value={updateClass?.teacherId} className='form-control' onChange={inputHandler} />
//                                     </div> : <div className="mt-3">
//                                         <label htmlFor="">teacherId</label>
//                                         <input type="text" readOnly disabled value={showTeacherOption._id} name='teacherId' className='form-control' onChange={inputHandler} />
//                                     </div>}
//                                 <div className="mt-3">
//                                     <label htmlFor="" className='alert alert-info w-100'>students</label>
//                                     <div className='d-flex justify-content-between table'>
//                                         <div>Name</div>
//                                         <div>Roll.No</div>
//                                         <div>Action</div>
//                                     </div>
//                                     {student.map((items, index) => (
//                                         <div className='d-flex p-2 justify-content-between' key={index}>
//                                             <div>{items.name}</div>
//                                             <div>{items._id}</div>
//                                             <div onClick={() => deleteStudents(items._id)} className='btn btn-danger'>Delete</div>
//                                         </div>
//                                     ))}
//                                     <label className='mt-3 btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">+ Add Students</label>

//                                 </div>
//                                 <hr />
//                                 <button type="submit" data-bs-dismiss="modal" className="btn btn-primary mt-3">Update</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h1 className="modal-title fs-5" id="exampleModalLabel">+Add students</h1>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <form action="" onSubmit={addStudentsInClass}>
//                                 <label htmlFor="">Enter Student</label>
//                                 <input type="text" name='students' className='form-control mt-3' onChange={studentHandler} />
//                                 <button type="submit" data-bs-dismiss="modal" className="btn btn-primary mt-3">Save changes</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer />
//         </>
//     )
// }