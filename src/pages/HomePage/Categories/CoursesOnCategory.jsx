import React from "react";
import { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { CoursesService } from "../../../services/CoursesService";
import { useState } from "react";
import { setCourseAddToCart, setCoursesListWishList } from "../../../redux/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import Swal from "sweetalert2";

export default function CoursesOnCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([])
  let { tenMonHoc } = useParams();
  const user = useSelector((state) => {
    return state.userSlice.userInfo;
  });
  const handleAddToCart = (items, cart) => {
    if (user) {
      CoursesService.postRegisterCourses({
        maKhoaHoc: items,
        taiKhoan: user.taiKhoan,
      })
        .then((res) => {
          dispatch(setCourseAddToCart(cart));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Added course to cart",
            showConfirmButton: false,
            timer: 1000,
          });
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "The course is already in your cart",
            showConfirmButton: false,
            timer: 1000,
          });
        });
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
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await CoursesService.getCourseOnCategory();
        const filteredCourses = res?.data.filter(c => c.subjects && c.subjects.subject_name.includes(tenMonHoc));
        setCourses(filteredCourses);
      } catch (err) {
        console.log('Error fetching courses:', err);
      }
    }
    fetchData();
  }, [tenMonHoc])
  const renderCourses = () => { 
    return courses.map((item, index) => { 
      return(
        <div className="shadow-sm bg-white rounded-md">
          <figure class="rounded-md movie-item hover:before:left-[125%] relative overflow-hidden cursor-pointe">
            <img
              className="sm:w-[320px] w-full cursor-pointer h-[175px] object-cover rounded-md"
              src={item.hinhAnh}
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
              {/* {item.danhMucKhoaHoc.tenDanhMucKhoaHoc} */}
            </p>
            <div className="flex space-x-2 items-center text-sm pt-1 text-[#666666]">
              {item.schedule}
            </div>
            <div className="flex justify-between items-center  text-sm pt-1 text-[#727374]">
              <p className="font-[500]">Thích</p>
              <div className=" hover:text-red-600 transition-all duration-300 cursor-pointer">
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
                  handleAddToCart(item.class_id, item);
                }}
                className="text-white w-full text-center py-1 border-none rounded bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] hover:bg-gradient-to-tl hover:from-[#ef4444] hover:to-[#fcd34d] transition-all duration-500 font-[500] uppercase flex items-center justify-center"
              >
                <span className="hover:text-white text-[15px]">
                  Add to cart
                </span>
                <i class="fa fa-angle-right ml-1 text-[10px] mt-[2px] font-bold"></i>
              </button>
            </div>
          </div>
        </div>
      )
    })
   }

   const getSlogan = (tenMonHoc) => {
    if(tenMonHoc === "Toán"){
      return "Nơi logic gặp sáng tạo"
    }else if(tenMonHoc === "Vật lý"){
      return "Vận động vĩnh cửu, tìm hiểu không ngừng"
    }else if(tenMonHoc === "Hóa học"){
      return "Phản ứng mọi lúc, khám phá mọi nơi"
    }
    else if(tenMonHoc === "Tiếng Anh"){
      return "Cầu nối bạn với thế giới."
    }
    else if(tenMonHoc === "Sinh học"){
      return "Hiểu biết sự sống, bảo vệ tương lai."
    }
    else if(tenMonHoc === "Ngữ văn"){
      return "Câu chuyện của chúng ta, qua từng trang sách."
    }
   }
  return (
      <div className="h-max-content min-h-screen w-full bg-cover bg-white flex overflow-hidden">
        <div className="pt-[70px] lg:block hidden fixed h-screen top-0 w-[20%] bg-white flex-shrink-0  border-r border-r-[#e5e7eb]">
          <NavBar />
        </div>
        <div className="min-h-screen w-full lg:w-[80%] ml-auto bg-[#f9fafb]">
          <div className="py-[105px] px-10">
            <p className="mb-6 text-4xl tracking-wider font-bold">Lớp {tenMonHoc}</p>
            <p className="font-[500] mb-4 ">{getSlogan(tenMonHoc)}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pl-3">
              {renderCourses()}
            </div>
          </div>
        </div>
      </div>
  );
}
