// import React from 'react'
// import style from './Features.module.css';

// export default function Features() {
//   return (
//     <>
//       <div className="container-fluid">
//         <div className="container">
//           <div>features</div>
//         </div>
//       </div>
//     </>
//   )
// }

// VirtualClassroomFeatures.js
import React, { useState } from "react";
import { Nav, Tab, Row, Col, Button } from "react-bootstrap";
import { FaChalkboardTeacher, FaVideo, FaShareSquare, FaUsers, FaPlay, FaRegCircle, FaFileAlt, FaPlug } from "react-icons/fa";

const features = [
  { key: "whiteboard", icon: <FaChalkboardTeacher />, label: "Online whiteboard", description: "Share various types of learning resources..." },
  { key: "video", icon: <FaVideo />, label: "Video-conference", description: "High quality video calls for classes..." },
  { key: "screen", icon: <FaShareSquare />, label: "Screen-sharing", description: "Share your screen with students..." },
  { key: "breakout", icon: <FaUsers />, label: "Breakout rooms", description: "Split into smaller discussion rooms..." },
  { key: "media", icon: <FaPlay />, label: "Media player", description: "Play educational videos within session..." },
  { key: "recording", icon: <FaRegCircle />, label: "Recording", description: "Record full session for later access..." },
  { key: "template", icon: <FaFileAlt />, label: "Session templates", description: "Use pre-made templates for faster setup..." },
  { key: "lti", icon: <FaPlug />, label: "LTI Integrations", description: "Connect with LMS using LTI..." },
];

const Features = () => {
  const handleClick = () => {
  const meetLink = "https://meet.google.com/new"; // This always creates a new meet, but opens for the current user only
  window.open(meetLink, "_blank");
};



  const calendar = google.calendar({version: 'v3', auth: oAuth2Client});

const event = {
  summary: 'Test Meeting',
  start: {dateTime: '2025-08-04T10:00:00+05:30'},
  end: {dateTime: '2025-08-04T10:30:00+05:30'},
  conferenceData: {
    createRequest: {
      requestId: 'sample123',
      conferenceSolutionKey: {
        type: 'hangoutsMeet',
      },
    },
  },
};

calendar.events.insert({
  calendarId: 'primary',
  resource: event,
  conferenceDataVersion: 1,
}, (err, res) => {
  if (err) return console.error('Error: ', err);
  const meetLink = res.data.hangoutLink;
  console.log('Google Meet link:', meetLink);
});
  return (
    <Tab.Container defaultActiveKey="whiteboard">
      <button onClick={handleClick}>Generate Google Meet Link</button>


    <a href="https://meet.google.com/new" target="_blank">
  <button>Create Google Meet</button>
</a>
      {/* <Row className="p-4">
        <Col sm={3} className="border-end">
          <Nav variant="pills" className="flex-column">
            {features.map((f) => (
              <Nav.Item key={f.key}>
                <Nav.Link eventKey={f.key} className="d-flex align-items-center gap-2">
                  {f.icon}
                  {f.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <Button variant="success" className="mt-4 w-100">GET 30-DAYS FREE TRIAL</Button>
        </Col>

        <Col sm={9}>
          <Tab.Content>
            {features.map((f) => (
              <Tab.Pane eventKey={f.key} key={f.key}>
                <h4 className="text-success">{f.label}</h4>
                <p>{f.description}</p>

                {f.key === "whiteboard" && (
                  <div className="d-flex gap-4 mt-4">
                    <img src="/images/whiteboard-screenshot.png" alt="Whiteboard" className="img-fluid w-50 rounded shadow" />
                    <div>
                      <img src="/images/laptop-frame.png" alt="Laptop" className="img-fluid rounded" />
                      <blockquote className="blockquote mt-3">
                        <p className="mb-0 fst-italic text-muted">
                          "It was fairly 2 to start using the system. I like the whiteboard the most. It helped me get prepared for school."
                        </p>
                        <footer className="blockquote-footer">Nicky, 9-year-old pupil</footer>
                      </blockquote>
                    </div>
                  </div>
                )}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row> */}
    </Tab.Container>
  );
};

export default Features;
