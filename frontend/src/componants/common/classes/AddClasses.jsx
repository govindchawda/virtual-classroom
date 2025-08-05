import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
const api = import.meta.env.VITE_API_BASE_URL;

export default function AddClasses() {
  const userObjectId = useParams();
  const[showTeacherOption, setShowTeacherOption] = useState([]);
  const [student, setStudent] = useState([]);
  const [showStudent, setShowStudent] = useState([])
  const [showOption, setShowOption] = useState(false);
  const [multipleDays, setMultipleDays] = useState([]);
  const [classes, setClasses] = useState({
    tittle: "",
    classCode: "",
    meeting: "",
    teacherId: "",
    students: [],
    schedule: [
      {
        day: "",
        startTime: "",
        endTime: ""
      }
    ]
  });

  // GET THE VALUE FROM INPUTES
  const inputHandler = (event) => {
    setClasses({ ...classes, [event.target.name]: event.target.value });
  }

  // ADD SCHUDLE TIME
  const scheduleHandler = (event) => {
    setShowOption(showOption == true ? false : true);
    if (["startTime", "endTime"].includes(event.target.name)) {
      const updatedSchedule = [...classes.schedule];
      updatedSchedule[0][event.target.name] = event.target.value;
      setClasses({ ...classes, schedule: updatedSchedule })
    } else {

    }
  }

  // ADD DAYS 
  const [day, setDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });

  const inputDayHandler = (event) => {
    const updatedDays = { ...day, [event.target.name]: event.target.checked };
    setDays(updatedDays);  //ISSE SETDAYS UPDATE HO RHA H

    const selectedDays = Object.entries(updatedDays);

    const daysArray = selectedDays.filter(([key, value]) => {
      return value === true
    })

    const FinalDay = daysArray.map(([key, value]) => {
      return key
    })
    setMultipleDays(FinalDay);

    setClasses(classes => ({ ...classes, schedule: [{ ...classes.schedule[0], day: FinalDay }] }))
  }

  // ADD STUDENTS INTO CLASS
  const addStudents = (event) => {
    setStudent([event.target.value]);
  }

  const addstudentinclass = async (event) => {
    try {
      event.preventDefault();
      const duplicateStudent = classes.students.includes(student);
        if (duplicateStudent) {
       toast.error("Student already exists in the class");
      return;
    }
      const updatestudents = [...classes.students, student];
      setClasses(prev => ({ ...prev, students: updatestudents }));
      let res = await axios.get(`${api}/auth/getStudents/${updatestudents}`, {
        headers: {
          "authorization": "bearer " + localStorage.getItem("tokeId")
        }
      })
      toast(res.data.message);
      setShowStudent(res.data.result);
    } catch (error) {
      console.log("add student in class", error);
    }
  }

  // DELETE STUDENTS FROM CLASSES
  const deleteStudents = (id) => {
    const updatedStudents = classes.students.filter((studentId) => {
      return studentId != id
    });
    setClasses(prev => ({ ...prev, students: updatedStudents }));

    const updatedShowStudent = showStudent.filter((student) => {
      return student._id !== id
    });
    setShowStudent(updatedShowStudent);
  }

  // add teacher id direct
  useEffect(() => {
  if (showTeacherOption?._id && showTeacherOption?.role !== "admin") {
    setClasses(prev => ({ ...prev, teacherId: showTeacherOption._id }));
  }
}, [showTeacherOption]);


  // ADD NEW CLASSES
  const AddClass = async (event) => {
    try {
      if(!classes?.teacherId){
        alert(showTeacherOption?._id);
         setClasses(prev => ({ ...prev, teacherId: showTeacherOption?._id }))
      }
      event.preventDefault();
      console.log("classes",classes)
      const res = await axios.post(`${api}/classes/create`, classes, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "bearer " + localStorage.getItem('tokeId')
        }
      });
      toast(res.data.message)
    } catch (error) {
      console.log("add class error", error);
    }
  }

  // USER DETAILS
  useEffect(()=>{
    axios.get(`${api}/auth/getusers`,{
      headers:{
        "Authorization": "bearer "+localStorage.getItem('tokeId')
      }
    }).then((res)=>{
      if(res.data.result) {
        setShowTeacherOption(res.data.result);
      }
    }).catch((error)=>{
      toast.error("interval error")
       console.log("get self",error)
      });
  },[]);

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className='tittle color d-flex justify-content-between'>
            <span># ADD Classes</span>
            <div>
              <Link to={`/overview/classes/${userObjectId.id}`} className='btn btn-primary'> Manage classes</Link>
            </div>
          </div>

          <form onSubmit={AddClass} className='dflex  flex-wrap'>
            <div className="mt-3 col-sm-12 col-lg-6 p-2">
              <label htmlFor="">Tittle</label>
              <input type="text" name='tittle' onChange={inputHandler} className='form-control' />
            </div>
            <div className="mt-3 col-sm-12 col-lg-6 p-2">
              <label htmlFor="">classCode</label>
              <input type="text" name='classCode' className='form-control' onChange={inputHandler} />
            </div>
            <div className="mt-3 col-sm-12 col-lg-6 p-2">
              <label htmlFor="">meeting</label>
              <input type="text" name='meeting' className='form-control' onChange={inputHandler} />
            </div>
            {showTeacherOption.role === "admin" ?
            <div className="mt-3 col-sm-12 col-lg-6 p-2">
              <label htmlFor="">teacherId</label>
              <input type="text" name='teacherId' className='form-control' onChange={inputHandler} />
            </div>
              :  <div className="mt-3 col-sm-12 col-lg-6 p-2">
              <label htmlFor="">teacherId</label>
              <input type="text" disabled name='teacherId' value={showTeacherOption._id} className='form-control' onChange={inputHandler} />
            </div> }
            <div className="mt-3 col-sm-12 p-2">
              <label htmlFor="">Day</label>
              <div className='d-flex flex-wrap mt-3'>
                <div className='col-sm-4 col-lg-2 '><input checked={day.monday} type="checkbox" className='mx-2' onChange={inputDayHandler} name="monday" id="" /><label htmlFor="">Monday</label></div>
                <div className='col-sm-4 col-lg-2 '><input checked={day.tuesday} type="checkbox" className='mx-2' onChange={inputDayHandler} name="tuesday" id="" /><label htmlFor="">Tuesday</label></div>
                <div className='col-sm-4 col-lg-2 '><input checked={day.wednesday} type="checkbox" className='mx-2' onChange={inputDayHandler} name="wednesday" id="" /><label htmlFor="">Wednesday</label></div>
                <div className='col-sm-4 col-lg-2 '><input checked={day.thursday} type="checkbox" className='mx-2' onChange={inputDayHandler} name="thursday" id="" /><label htmlFor="">Thursday</label></div>
                <div className='col-sm-4 col-lg-2 '><input checked={day.friday} type="checkbox" className='mx-2' onChange={inputDayHandler} name="friday" id="" /><label htmlFor="">Friday</label></div>
                <div className='col-sm-4 col-lg-2'><input checked={day.saturday} type="checkbox" className='mx-2' onChange={inputDayHandler} name="saturday" id="" /><label htmlFor="">Saturday</label></div>
              </div>
            </div>
            <div className="mt-3 col-sm-12 col-lg-6 p-2">
              <label htmlFor="">startTime</label>
              <input type="text" name='startTime' className='form-control' onChange={scheduleHandler} />
            </div>
            <div className="mt-3 col-sm-12 col-lg-6 p-2">
              <label htmlFor="">endTime</label>
              <input type="text" name='endTime' className='form-control' onChange={scheduleHandler} />
            </div>
            <div className="mt-3 col-sm-12">
              <label htmlFor="" className='alert alert-info w-100'>students</label>
              <div className='mediaFonts d-flex justify-content-between table'>
                <div >Name</div>
                <div >Roll.No</div>
                <div >Action</div>
              </div>
              {showStudent.map((items, index) => (
                <div className='mediaFonts d-flex p-2 justify-content-between align-items-center' key={index}>
                  <div >{items.name}</div>
                  <div>{items._id}</div>
                  <div  onClick={() => deleteStudents(items._id)} className='btn btn-danger'>Delete</div>
                </div>
              ))}
              <label className='mt-3 btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">+ Add Students</label>

            </div>
            <hr />
            <button type="submit" data-bs-dismiss="modal" className="btn btn-primary mt-3">ADD class</button>
          </form>
        </div>
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">+Add students</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form action="" onSubmit={addstudentinclass}>
                <label htmlFor="">Enter Student</label>
                <input type="text" name='students' onChange={addStudents} className='form-control mt-3' />
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