import React from 'react'

export default function Terms_condition() {
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="container">
                    <div className='tittle color d-flex justify-content-between'>
                        <span># Terms Conditions</span>
                    </div>

                    <div className="mt-3 p-2">
                        <div>
                            <strong>Late Entry Policy</strong>
                            <p>1. Students will not be allowed to join the class if they are more than 5 minutes late from the scheduled start time. Please ensure timely attendance to avoid missing the session.</p>
                        </div>

                        <div>
                            <strong>Personal Information Sharing Policy</strong>
                            <p>2. Students are strictly prohibited from sharing any personal information (e.g. phone number, email, address, or social media handles) with other users through the platform. Violations may lead to suspension or account restrictions.</p>
                        </div>
                        <div>
                            <strong>Class Limit Policy</strong>
                            <p>3. Each student is allowed to attend a maximum of 8 online classes. After this limit is reached, further access will be restricted unless additional classes are granted by the admin or renewed as per your package.</p>
                        </div>
                        <div>
                            <strong>Monthly Offline Test Policy</strong>
                            <p>4. All students must appear for at least one offline test every month. Attendance in monthly offline tests is mandatory for academic evaluation and progress tracking.</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
