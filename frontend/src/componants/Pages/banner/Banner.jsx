import React from 'react'
import style from './Banner.module.css';
import { LuPhoneCall } from "react-icons/lu";
export default function Banner() {
  return (
    <div className={style.Banner_section}>
      <div className={style.Banner}>
        <div className="container">
          <img src="https://i.ibb.co/1YvpHhXv/front-view-male-student-green-checkered-shirt-wearing-black-backpack-holding-files-smiling-blue-wall.png" alt="" />
          <div className={style.banner_content}>
            <h1>gowebtech </h1>
            <h1>virtual classroom </h1>
            {/* <h1>training </h1>
            <h1>institute </h1> */}
            <p>"We deliver hands-on, industry-relevant training that bridges the gap between education and real-world success."</p>
            <div className={style.banner_info}>
              <div className={style.media_text}>
                <a className={style.button}>Enroll now</a>
                <h6 className={style.h6}>now open for registration</h6>
              </div>
              <div className={style.call_info}>
              <p>call for more info</p>
               <div>
                <LuPhoneCall className={style.banner_icon} /><span className={style.span}>0000 000 000</span>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
