import React, { useEffect, useState } from "react";
import { CoursesService } from "../../../services/CoursesService";
import { Card } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import "./Courses.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  setCourseAddToCart,
  setCoursesListWishList,
} from "../../../redux/coursesSlice";
const { Meta } = Card;

export default function PopularCoureses() {
  const [PopularCoureses, setPopularCoureses] = useState([]);
  useEffect(() => {
    CoursesService.getCoursesListPopular()
      .then((res) => {
        setPopularCoureses(res.data);
      })
      .catch((err) => {
        console.log("err: ", err);
        console.log();
      });
  }, []);
  const user = useSelector((state) => {
    return state.userSlice.userInfo;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderPopularCoureses = () => {
    return PopularCoureses.slice(1, 4).map((item, index) => {
      return (
        <div
          index={index}
          className="rounded-md bg-white shadow-sm cursor-pointer relative"
        >
          <figure class="rounded-md movie-item hover:before:left-[125%] relative overflow-hidden cursor-pointe">
            <div className="img col-span-4 rounded-md">
              <img
                className="w-[320px] h-[175px] object-cover rounded-md"
                src={item.hinhAnh}
                alt={item.biDanh}
              />
            </div>
            <div className="p-4">
              <p className="font-semibold line-clamp-2 text-[#666666]">
                {item.danhMucKhoaHoc.tenDanhMucKhoaHoc}
              </p>
              <div className="flex space-x-2 items-center text-sm pt-1 text-[#666666]">
                <p>23 hours</p>
                <p>·</p>
                <p>40 lectures</p>
              </div>
              <div className="pt-1 flex items-center justify-between">
                <p className="font-semibold text-[#666666]">
                  {item.nguoiTao.hoTen}
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
                    {item.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                  </h2>
                  <h3 className="text-gray-100 font-[500]">
                    Whether you're a beginner taking your first steps into the
                    world of Code ...
                  </h3>
                  <h4 class="flex items-center justify-between mt-4 mb-8 font-[500] text-gray-100">
                    Like :
                    <div className="text-white hover:text-red-500 transition-all duration-500 cursor-pointer text-xl">
                      <i
                        onClick={() => {
                          handleDispatchCourseWishList(item);
                        }}
                        class="fa fa-heart"
                      ></i>
                    </div>
                  </h4>
                  <div className="flex justify-between">
                    <div className="">
                      <button
                        onClick={() => {
                          handleAddToCart(item.maKhoaHoc, item);
                        }}
                        className="px-3 py-1 text-white bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] hover:bg-gradient-to-tl hover:from-[#ef4444] hover:to-[#fcd34d] transition-all duration-500 rounded-md"
                      >
                        Add To Cart
                      </button>
                    </div>
                    <div className="">
                      <NavLink to={`/detail/${item?.maKhoaHoc}`}>
                        <button className="px-3 py-1 text-white bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] hover:bg-gradient-to-tl hover:from-[#ef4444] hover:to-[#fcd34d] transition-all duration-500 rounded-md">
                          Detail
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      );
    });
  };
  const handleDispatchCourseWishList = (item) => {
    if (user) {
      console.log("item: ", item);
      dispatch(setCoursesListWishList(item));
    } else {
      navigate("/login");
    }
  };
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
  return (
    <div id="popularCourses">
      <div class="sm:my-4 my-3 flex items-end justify-between pt-8">
        <h2 class="text-2xl font-semibold"> Popular Classes </h2>
        <NavLink to="/course-list">
          <a href="#" class="text-[#2a41e8] sm:block hidden">
            See all
          </a>
        </NavLink>
      </div>
      <div className="grid grid-cols-3 gap-5 pl-3">
        {renderPopularCoureses()}
      </div>
    </div>
  );
}
