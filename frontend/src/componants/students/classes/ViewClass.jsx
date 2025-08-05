import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const api = import.meta.env.VITE_API_BASE_URL;

export default function ViewClass() {
    const userId = useParams();
    const [classes, setClasses] = useState([]);

    // GET CLASSes 
    useEffect(() => {
        axios.get(`${api}/classes/showClassIncludeStudents/${userId.id}`,
            {
                headers: { "Authorization": "bearer " + localStorage.getItem("tokeId") }
            }
        ).then((res) => {
            setClasses(res.data.result);
        }).catch((error) => console.log(error));
    }, []);


    const joinMeeting = (id,joinId) => {
        if (!id) {
            return alert("not class")
        }
        if(joinId == false){
            return toast.error("class not scheduled ");
        }
        window.open(id, "_blank");
    }

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="container">
                    <div className='tittle color'>
                        # View classes
                    </div>
                    <div className="d-flex flex-wrap mt-4">
                        {classes.map((items, index) => (

                            <div key={index} className="col-sm-4 p-2 ">
                                <div className=" cols-sm-12 tittle color">
                                    <div className='class-info d-flex justify-content-between'>
                                        <p><strong>Tittle : </strong> {items.tittle} </p>
                                        {items?.joinRoom == true ? 
                                        <button className='btn btn-info' onClick={() => joinMeeting(items?.meeting,items?.joinRoom)}>join class</button>
                                        : "" }
                                    </div>
                                    <div className='class-info d-flex justify-content-between mt-3'>
                                        <p><strong>Start Time : </strong> {items.schedule[0].startTime} </p>
                                        <p><strong>End Time : </strong> {items.schedule[0].endTime} </p>
                                        <p><strong>classcode : </strong> {items.classCode} </p>
                                    </div>
                                    <div className='tex-center t-3 w-100'>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
