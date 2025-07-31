// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom'
// import Login from './componants/login/Login.jsx';
// import Navbar from './componants/navber/Navbar.jsx';
// import Footer from './componants/footer/Footer.jsx';
// import Forget from './componants/login/Forget.jsx';
// import Page from './componants/Pages/Page.jsx';
// import Students from './componants/students/Students.jsx';
// import Teachers from './componants/teachers/Teachers.jsx';
// import Admin from './componants/admin/Admin.jsx';
// import Student_profile from './componants/common/profile/Student_profile.jsx';
// import Student_dashboard from './componants/students/Student_dashboard.jsx';
// import Change_password from './componants/common/profile/Change_password.jsx';
// import ManageClasses from './componants/common/classes/ManageClasses.jsx';
// import AddClasses from './componants/common/classes/AddClasses.jsx';
// import ShowStudents from './componants/teachers/showstudents/ShowStudents.jsx';
// import ShowTeachers from './componants/admin/users/ShowTeachers.jsx';
// import ShowStudent from './componants/admin/users/ShowStudent.jsx';
// import SearchClasses from './componants/common/classes/SearchClasses.jsx';
// import ViewStudents from './componants/common/classes/ViewStudents.jsx';
// import ViewClasses from './componants/common/classes/ViewClasses.jsx';
// import Dashboard from './componants/common/dashboard/Dashboard.jsx';
// import ErrorPage from './componants/common/error/ErrorPage.jsx';
// import ViewClass from './componants/students/classes/ViewClass.jsx';
// import Home from './componants/admin/Home.jsx';
// import Present from './componants/common/Attendance/Present.jsx';
// import ViewAttendanceClass from './componants/common/Attendance/ViewAttendanceClass.jsx';
// import SearchAttendanceClass from './componants/common/Attendance/SearchAttendanceClass.jsx';
// import SearchStudents from './componants/common/Attendance/SearchStudents.jsx';


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//     <Routes>
//       <Route path='/' element={<App/>}>
//         <Route index element={<Page/>}></Route>
//       <Route path='/login' element={<Login/>}></Route>
//       <Route path='/forget' element={<Forget/>}></Route>
//       </Route>

//       {/*students dashboard */}
//     {/* <Route path='students' element={<Students/>}> */}
//     <Route path='overview' element={<Dashboard/>}>
//       {/* <Route index element={<Dashboard/>}></Route> */}
//       {/* <Route index element={<Student_dashboard/>}></Route> */} its workin
//       <Route path='profile' element={<Student_profile/>}></Route>
//       <Route path='change-password' element={<Change_password/>}></Route>
//       <Route path='/overview/view-class/:id@qywvsg' element={<ViewClass/>}></Route>
//     </Route>
    
//     <Route path='/overview' element={<Dashboard/>}>
//     {/* <Route path='/teachers' element={<Teachers/>}> */}
//       <Route path='change-password' element={<Change_password/>}></Route>
//       <Route path='profile' element={<Student_profile/>}></Route>
//       <Route path='classes/:id' element={<ManageClasses/>}></Route>
//       <Route path='classes/:id/add-class' element={<AddClasses/>}></Route>
//       <Route path='ShowStuden' element={<ShowStudents/>}></Route>
//       <Route path='searchClasses' element={<SearchClasses/>}></Route>
//     </Route>
//     {/* <Route path='/admin' element={<Admin/>}> */}
//     <Route path='/overview' element={<Dashboard/>}>
//       {/* <Route index element={<Home/>}></Route> */}
//       <Route path='classes/:id' element={<ManageClasses/>}></Route>
//       <Route path='classes/:id/add-class' element={<AddClasses/>}></Route>
//       <Route path='profile' element={<Student_profile/>}></Route>
//       <Route path='change-password' element={<Change_password/>}></Route>
//       <Route path='searchClasses' element={<SearchClasses/>}></Route>
//       <Route path='ShowStudens' element={<ShowStudent/>}></Route>
//       <Route path='/overview/classes/:id@qwert' element={<ViewClasses/>}></Route>
//       <Route path='/overview/Students/:id@qwert' element={<ViewStudents/>}></Route>
//       <Route path='ShowTeachers' element={<ShowTeachers/>}></Route>
//       <Route path='Attendance' element={<Present/>}></Route>
//       <Route path='/overview/attendance/:id@qwert' element={<ViewAttendanceClass/>}></Route>
//       <Route path='/overview/showattendance/:id@qwert' element={<SearchAttendanceClass/>}></Route>
//       <Route path='searchattendance' element={<SearchStudents/>}></Route>
//     </Route>
//     {/* wrong route */}
//     <Route path='*' element={<ErrorPage/>} ></Route>
//     </Routes>
//     </BrowserRouter>
//     {/* <App /> */}
//   </StrictMode>,
// )






import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '../src/componants/students/Students.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Lazy-loaded components
const Login = lazy(() => import('./componants/login/Login.jsx'));
const Forget = lazy(() => import('./componants/login/Forget.jsx'));
const Page = lazy(() => import('./componants/Pages/Page.jsx'));
const Students = lazy(() => import('./componants/students/Students.jsx'));
const Teachers = lazy(() => import('./componants/teachers/Teachers.jsx'));
const Admin = lazy(() => import('./componants/admin/Admin.jsx'));
const Student_profile = lazy(() => import('./componants/common/profile/Student_profile.jsx'));
const Student_dashboard = lazy(() => import('./componants/students/Student_dashboard.jsx'));
const Change_password = lazy(() => import('./componants/common/profile/Change_password.jsx'));
const ManageClasses = lazy(() => import('./componants/common/classes/ManageClasses.jsx'));
const AddClasses = lazy(() => import('./componants/common/classes/AddClasses.jsx'));
const ShowStudents = lazy(() => import('./componants/teachers/showstudents/ShowStudents.jsx'));
const ShowTeachers = lazy(() => import('./componants/admin/users/ShowTeachers.jsx'));
const ShowStudent = lazy(() => import('./componants/admin/users/ShowStudent.jsx'));
const SearchClasses = lazy(() => import('./componants/common/classes/SearchClasses.jsx'));
const ViewStudents = lazy(() => import('./componants/common/classes/ViewStudents.jsx'));
const ViewClasses = lazy(() => import('./componants/common/classes/ViewClasses.jsx'));
const Dashboard = lazy(() => import('./componants/common/dashboard/Dashboard.jsx'));
const ErrorPage = lazy(() => import('./componants/common/error/ErrorPage.jsx'));
const ViewClass = lazy(() => import('./componants/students/classes/ViewClass.jsx'));
const Home = lazy(() => import('./componants/admin/Home.jsx'));
const Present = lazy(() => import('./componants/common/Attendance/Present.jsx'));
const ViewAttendanceClass = lazy(() => import('./componants/common/Attendance/ViewAttendanceClass.jsx'));
const SearchAttendanceClass = lazy(() => import('./componants/common/Attendance/SearchAttendanceClass.jsx'));
const SearchStudents = lazy(() => import('./componants/common/Attendance/SearchStudents.jsx'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Page />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forget' element={<Forget />} />
          </Route>

          {/* Students Dashboard */}
          <Route path='/overview' element={<Dashboard />}>
            {/* <Route index element={<Dashboard />} /> */}
            {/* <Route index element={<Student_dashboard />} /> */}
            <Route path='profile' element={<Student_profile />} />
            <Route path='change-password' element={<Change_password />} />
            <Route path='/overview/view-class/:id@qywvsg' element={<ViewClass />} />
          </Route>

          <Route path='/overview' element={<Dashboard />}>
            <Route path='change-password' element={<Change_password />} />
            <Route path='profile' element={<Student_profile />} />
            <Route path='classes/:id' element={<ManageClasses />} />
            <Route path='classes/:id/add-class' element={<AddClasses />} />
            <Route path='ShowStuden' element={<ShowStudents />} />
            <Route path='searchClasses' element={<SearchClasses />} />
          </Route>

          <Route path='/overview' element={<Dashboard />}>
            <Route path='classes/:id' element={<ManageClasses />} />
            <Route path='classes/:id/add-class' element={<AddClasses />} />
            <Route path='profile' element={<Student_profile />} />
            <Route path='change-password' element={<Change_password />} />
            <Route path='searchClasses' element={<SearchClasses />} />
            <Route path='ShowStudens' element={<ShowStudent />} />
            <Route path='/overview/classes/:id@qwert' element={<ViewClasses />} />
            <Route path='/overview/Students/:id@qwert' element={<ViewStudents />} />
            <Route path='ShowTeachers' element={<ShowTeachers />} />
            <Route path='Attendance' element={<Present />} />
            <Route path='/overview/attendance/:id@qwert' element={<ViewAttendanceClass />} />
            <Route path='/overview/showattendance/:id@qwert' element={<SearchAttendanceClass />} />
            <Route path='searchattendance' element={<SearchStudents />} />
          </Route>

          {/* Wrong route */}
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);

