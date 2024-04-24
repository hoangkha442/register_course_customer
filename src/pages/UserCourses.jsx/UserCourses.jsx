import React, { useEffect, useState } from "react";
import NavBar from "../HomePage/NavBar/NavBar";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserService } from "../../services/UserService";
import moment from "moment/moment";
import Swal from "sweetalert2";

export default function UserCourses() {
  const [userCourse, setUserCourse] = useState([]);
  const user = useSelector((state) => {
    return state.userSlice.userInfo;
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) return navigate("/login");
    UserService.postUserInfor()
      .then((res) => {
        setUserCourse(res.data.chiTietKhoaHocGhiDanh);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);
  const handleUnsubcribe = (courseCode) => { 
    UserService.postUnsubcribeCourse({'maKhoaHoc': courseCode, 'taiKhoan': user?.taiKhoan})
    .then((res) => { 
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Unsubcribe Success!",
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((err) => { 
      console.log('err: ', err);
    })
  }
  //  RENDER COURSES REGISTERED
  const myCoursesRegister = () => {
    return userCourse?.map((item, index) => {
      return (
        <section key={index} className="text-gray-600 body-font mt-8 sm:mt-5 rounded-lg bg-white shadow-sm">
          <div className="container px-3 py-3 mx-auto flex flex-col">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <NavLink className='cursor-pointer' to={`/detail/${item?.maKhoaHoc}`}>

                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center border   text-gray-400">
                  <img
                    src={item?.hinhAnh}
                    className="object-cover w-full h-full  rounded-full"
                    alt={item?.hinhAnh}
                  />
                </div>
                </NavLink>
                <div className="flex flex-col items-center text-center justify-center">
                <NavLink className='cursor-pointer' to={`/detail/${item?.maKhoaHoc}`}>

                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                    {item?.maKhoaHoc}
                  </h2>
</NavLink>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4" />
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <NavLink className='cursor-pointer' to={`/detail/${item?.maKhoaHoc}`}>

                <p className="leading-relaxed text-lg mb-4 text-gray-800 ">
                  {item?.tenKhoaHoc}
                </p>
                <p className="">{item?.moTa}</p>
                <p>{moment(item?.ngayTao).format("DD/MM/YYYY")}</p>
</NavLink>
                <div className="mt-3 text-center sm:text-end">
                  <button
                    onClick={() => {
                      handleUnsubcribe(item?.maKhoaHoc);
                    }}
                    className="px-2 py-1 bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] hover:from-[#ef4444] hover:to-[#fcd34d] rounded-lg font-[700] text-gray-800"
                  >
                    Unsubcribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      );
    });
  };
  return (
        <div className="py-[105px]">
          <div className="container-90">
            <p className="mb-2 text-4xl font-bold">
              Các môn học đang được đăng ký
            </p>
            <p className="font-[500] mb-2"><span className="font-bold">{userCourse?.length}</span> môn học</p>
            <section class="text-gray-600 body-font">
              <div class="px-5 py-5 mx-auto ">
                <div class="">{myCoursesRegister()}</div>
              </div>
            </section>
          </div>
        </div>
  );
}
