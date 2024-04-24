import React, { useEffect, useState } from "react";
import { CoursesService } from "../../../services/CoursesService";
import { NavLink, useNavigate } from "react-router-dom";
import "./Courses.css";
import { useDispatch, useSelector } from "react-redux";
import { setCourseAddToCart, setCoursesListWishList } from "../../../redux/coursesSlice";
import { UserService } from "../../../services/UserService";

export default function PopularCourses() {
  const [popularCourses, setPopularCourses] = useState([]);
  const user = useSelector(state => state.userSlice.userInfo);
  const [userInfo, setUserInfo] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    UserService.getMyInfor().then((res) => { 
      setUserInfo(res.data)
     }).catch((err) => { 
      console.log('err: ', err);
      })
    CoursesService.getCoursesListPopular()
      .then(res => setPopularCourses(res.data))
      .catch(err => console.error("Error fetching popular courses: ", err));
  }, []);
  const handleDispatchCourseWishList = (item) => {
    if (user) {
      if (userInfo && userInfo.full_name) {
        const itemWithUser = {...item, full_name: userInfo.full_name};
        dispatch(setCoursesListWishList(itemWithUser));
      } else {
        console.error('User information not available');
      }
    } else {
      navigate("/login");
    }
  };
  

  const handleAddToCart = (course) => {
    if (user) {
      if (userInfo && userInfo.full_name) {
        const itemWithUser = {...course, full_name: userInfo.full_name};
          dispatch(setCourseAddToCart(itemWithUser));
      }
    } else {
      navigate("/login");
    }
  };

  const renderPopularCourses = () => popularCourses.map(course => (
    <div
          index={course?.class_id}
          className="rounded-md bg-white shadow-sm cursor-pointer relative"
        >
          <figure class="rounded-md movie-item hover:before:left-[125%] relative overflow-hidden cursor-pointe">
            <div className="img col-span-4 rounded-md">
              <img
                className="w-full lg:w-[320px] h-[175px] object-cover rounded-md"
                src={course?.hinhAnh}
                alt={course?.class_name}
              />
            </div>
            <div className="p-4">
              <p className="font-semibold line-clamp-2 text-[#666666]">
                {course?.subjects?.subject_name}
              </p>
              <div className="flex space-x-2 items-center text-sm pt-1 text-[#666666]">
                {course?.schedule}
              </div>
              <div className="pt-1 flex items-center justify-between">
                <p className="font-semibold text-[#666666]">
                  {course?.users?.full_name}
                </p>
                <div className="text-lg font-semibold text-[#666666]">
                  <p>$14.99</p>
                </div>
              </div>
            </div>
            <figcaption className="overlay absolute left-0 bottom-0 w-full h-[100%] opacity-0 bg-overlay-popular hover:opacity-100 transition-all duration-1000">
              <div class="px-[19px] py-[30px]">
                <div>
                  <h2 class="font-bold text-xl mb-5 text-white">
                    {course?.subjects?.subject_name}
                  </h2>
                  <h3 className="text-gray-100">
                    {course?.description?.length > 80 ? `${course?.description.slice(0,70)}...` : course?.description}
                  </h3>
                  <h4 class="flex items-center justify-between mt-4 mb-8 font-[500] text-gray-100">
                    yêu thích :
                    <div className="text-white hover:text-red-500 transition-all duration-500 cursor-pointer text-xl">
                      <i
                        onClick={() => {
                          handleDispatchCourseWishList(course);
                        }}
                        class="fa fa-heart"
                      ></i>
                    </div>
                  </h4>
                  <div className="flex justify-between">
                    <div className="">
                      <button
                        onClick={() => {
                          handleAddToCart(course);
                        }}
                        className="px-3 py-1 text-white bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] hover:bg-gradient-to-tl hover:from-[#ef4444] hover:to-[#fcd34d] transition-all duration-500 rounded-md"
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                    <div className="">
                      <NavLink to={`/detail/${course?.class_id}`}>
                        <button className="px-3 py-1 text-white bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] hover:bg-gradient-to-tl hover:from-[#ef4444] hover:to-[#fcd34d] transition-all duration-500 rounded-md">
                          Mô tả
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
  ));

  return (
    <div className="popular-courses-container">
      <div className="header flex justify-between items-center pt-8 pb-2">
        <h2 className="text-2xl font-semibold">Các khóa học phổ biến</h2>
        <NavLink to="/course-list" className="see-all-link">
          Xem thêm
        </NavLink>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 pl-3">
        {renderPopularCourses()}
      </div>
    </div>
  );
}
