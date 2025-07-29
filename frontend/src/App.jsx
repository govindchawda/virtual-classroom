
import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './componants/footer/Footer'
import Navbar from './componants/navber/Navbar'

function App() {

  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
