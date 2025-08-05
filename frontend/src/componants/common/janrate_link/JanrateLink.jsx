import React from 'react'

export default function JanrateLink() {
       const createMeeting = () => {
               const meetLink = "https://meet.google.com/new";
               window.open(meetLink, "_blank");
          }
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="container">
                    <div className='tittle color d-flex justify-content-between'>
                        <span># Jarate Link</span>
                    </div>
                       
                         <div className='d-flex justify-content-between mt-4'>
                  <div className='col-sm-5'>
                    <button onClick={createMeeting} className='btn btn-primary'>Generat Link</button>
                  </div>
                </div>
                </div>
            </div>
        </React.Fragment>
    )
}
