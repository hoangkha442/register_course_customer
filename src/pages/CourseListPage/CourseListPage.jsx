import React, { useEffect, useState } from "react";
import { CoursesService } from "../../services/CoursesService";
import { applyMiddleware } from "redux";
import NavBar from "../HomePage/NavBar/NavBar";
import { Button, Card, Pagination } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import "./CourseListPage.css";
import ImageError from "../../asset/img/err.jpg";
import ImageError1 from "../../asset/img/err1.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseAddToCart,
  setCoursesListWishList,
} from "../../redux/coursesSlice";
import Swal from "sweetalert2";
import { UserService } from "../../services/UserService";
import { fetchCartByUserId } from "../CheckOut/cartSlice";
import { BASE_URL_IMG } from "../../services/Config";

export default function CourseListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fallbackImage, setFallbackImage] = useState("");
  const [listCourses, setListCourses] = useState(null);
  console.log('listCourses: ', listCourses);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizeItem, setSizeItem] = useState(8);
  const [userInfo, setUserInfo] = useState()
  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render CourseListPage
  useEffect(() => {
    CoursesService.getCourseListPagination(currentPage, sizeItem)
      .then((res) => {
        setListCourses(res.data);
      })
      .catch((err) => { 
        console.log("err: ", err);
      });
  }, [currentPage, sizeItem]);

  // set ảnh lỗi sẽ loạt vào
  const handleErrorImage = () => {
    setFallbackImage(ImageError);
  };
  // dispatch courses wish list
  const user = useSelector((state) => {
    return state.userSlice.userInfo;
  });

  useEffect(() => {
    UserService.getMyInfor().then((res) => { 
      setUserInfo(res.data)
     }).catch((err) => { 
      console.log('err: ', err);
      })
  }, []);
  const handleAddToCart = (course) => {
    if (user) {
      const itemWithUser = {user_id: userInfo.user_id, class_id: course.class_id, quantity: 1}
      UserService.postCart(itemWithUser).then((res) => { 
        Swal.fire({
          position: "center",
          icon: "success",
          title: 'Khóa học đã được thêm vào giỏ hàng!',
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(fetchCartByUserId(userInfo.user_id));
      }).catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
    } else {
      navigate("/login");
    }
  };

  const handleDispatchCourseWishList = (item) => {
    if (user) {
      dispatch(setCoursesListWishList(item));
    } else {
      navigate("/login");
    }
  };
  const handleRenderListCourse = () => {
    return listCourses?.data?.map((item) => {
      return (
        <div key={item.class_id} className="shadow-sm bg-white rounded-md">
          <figure class="rounded-md movie-item hover:before:left-[125%] relative overflow-hidden cursor-pointe">
            <img
              className="w-[320px] cursor-pointer h-[175px] object-cover rounded-md"
              src={BASE_URL_IMG +  item.picture}
              alt={item.biDanh}
            />
            <NavLink to={`/detail/${item?.class_id}`}>
              <figcaption className="overlay absolute left-0 bottom-0 w-full h-[100%] opacity-0 bg-overlay hover:opacity-100 transition-all duration-1000">
                <div className="figcaption-btn w-[80%] h-[30%]">
                  <Button className="text-white border-none rounded-3xl bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] font-[500] hover:text-white uppercase flex items-center">
                    <span>Xem chi tiết</span>
                    <i class="fa fa-angle-right ml-1 text-[10px] mt-[2px] font-bold"></i>
                  </Button>
                </div>
              </figcaption>
            </NavLink>
          </figure>
          <div className="rounded-md p-4">
            <p class="font-semibold line-clamp-2 text-[#666666]">
              {item.class_name}
            </p>
            <div className="flex space-x-2 items-center text-sm pt-1 text-[#666666]">
              {item.schedule}
            </div>
            <div className="flex justify-between items-center  text-sm pt-1 text-[#727374]">
              <p className="font-[500]">Thích</p>
              <div className=" transition-all duration-300 cursor-pointer">
                <i
                  class="fa fa-heart text-xl"
                  onClick={() => {
                    handleDispatchCourseWishList(item);
                  }}
                />
              </div>
            </div>
            <div className="mt-2">
              <button
                onClick={() => {
                  handleAddToCart(item);
                }}
                className="text-white w-full text-center py-1 border-none rounded bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] hover:bg-gradient-to-tl hover:from-[#ef4444] hover:to-[#fcd34d] transition-all duration-500 font-[500] uppercase flex items-center justify-center"
              >
                <span className="hover:text-white text-[15px]">
                  Thêm vào giỏ hàng
                </span>
                <i class="fa fa-angle-right ml-1 text-[10px] mt-[2px] font-bold"></i>
              </button>
            </div>
          </div>
        </div>
      );
    });
  };
  return (

        <div className="container-90 py-[105px]">
        <p className="mb-5 shadow-md text-center md:text-4xl text-3xl md:tracking-wider tracking-wide md:font-bold font-[600]">
        Các môn học hiện tại
                  </p>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            {handleRenderListCourse()}
          </div>
          <div className="mt-4 text-center">
                <Pagination defaultCurrent={1} current={currentPage} onChange={onChange} total={listCourses?.totalPage * 10}/>
          </div>
        </div>
  );
}
