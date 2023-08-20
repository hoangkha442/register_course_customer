import React from 'react'
import { useSelector } from 'react-redux'

export default function CheckOut() {
    const user = useSelector((state) => { 
        return state.userSlice.userInfo
    })
    const listCoursesRegister = useSelector((state) => {
        return state.coursesSlice.coursesListRegister;
    });
    const handleRenderCoursesCheckOut = () => { 
        return listCoursesRegister.map((item, index) => { 
            return(
                <div className=""></div>
            )
        })
     }
  return (
    <div>CheckOut</div>
  )
}
