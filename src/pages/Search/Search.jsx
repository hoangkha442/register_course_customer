import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { CoursesService } from "../../services/CoursesService";
import { Button, Card, Pagination } from "antd";
import NavBar from "../HomePage/NavBar/NavBar";
import {
  setCourseAddToCart,
  setCoursesListWishList,
} from "../../redux/coursesSlice";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
const { Meta } = Card;
export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams([]);
  const [listCourses, setListCourses] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      console.log("item: ", item);
      dispatch(setCoursesListWishList(item));
    } else {
      navigate("/login");
    }
  };
  // console.log('searchParams: ', searchParams.get('q'));
  useEffect(() => {
    if (searchParams.get("q")) {
      CoursesService.getCoursesListPopular()
        .then((res) => {
          setListCourses(res.data);
        })
        .catch((err) => {
          console.log("err: ", err);
      });
    }
  }, [searchParams]);
  const listSearchCoursesValues = listCourses.filter((course) => {
    return course.tenKhoaHoc
      .toLowerCase()
      .includes(searchParams.get("q").toLowerCase());
  });
  // khi không tìm thấy kết quả nào
  console.log("listSearchCoursesValues: ", listSearchCoursesValues);
  const renderNoResultSearch = () => {
    return <h1>No result is found</h1>;
  };
  return (
    <div className="">
      <div className="h-max-content min-h-screen w-full bg-cover bg-white flex overflow-hidden">
        <div className="pt-[70px] fixed h-screen top-0 w-[20%] bg-white flex-shrink-0  border-r border-r-[#e5e7eb]">
          <NavBar />
        </div>
        <div className="min-h-screen w-[80%] ml-auto bg-[#f9fafb]">
          <div className="py-[105px]">
            <div className="flex flex-col text-start w-full mb-14 container-90">
              <h1 className="sm:text-4xl text-2xl font-bold title-font text-gray-900">
                {listSearchCoursesValues.length} results for "
                {searchParams.get("q")}"
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
            </div>
            {listSearchCoursesValues.length !== 0 ? (
              <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 container-90">
                {listSearchCoursesValues.map((item) => {
                  return (
                    <div>
                      <div
                        key={item.maKhoaHoc}
                        className="shadow-sm bg-white rounded-md"
                      >
                        <figure class="rounded-md movie-item hover:before:left-[125%] relative overflow-hidden cursor-pointe">
                          <img
                            className="w-[320px] cursor-pointer h-[175px] object-cover rounded-md"
                            src={item.hinhAnh}
                            alt={item.biDanh}
                          />
                          <NavLink to={`/detail/${item?.maKhoaHoc}`}>
                            <figcaption className="overlay absolute left-0 bottom-0 w-full h-[100%] opacity-0 bg-overlay hover:opacity-100 transition-all duration-1000">
                              <div className="figcaption-btn w-[80%] h-[30%]">
                                <Button className="text-white border-none rounded-3xl bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] font-[500] hover:text-white uppercase flex items-center">
                                  <span>view Detail</span>
                                  <i class="fa fa-angle-right ml-1 text-[10px] mt-[2px] font-bold"></i>
                                </Button>
                              </div>
                            </figcaption>
                          </NavLink>
                        </figure>
                        <div className="rounded-md p-4">
                          <p class="font-semibold line-clamp-2 text-[#666666]">
                            {item.tenKhoaHoc}
                          </p>
                          <div className="flex space-x-2 items-center text-sm pt-1 text-[#666666]">
                            <p>23 hours</p>
                            <p>·</p>
                            <p>40 lectures</p>
                          </div>
                          <div className="flex justify-between items-center  text-sm pt-1 text-[#727374]">
                            <p className="font-[500]">Like</p>
                            <div className="hover:text-red-600 transition-all duration-300 cursor-pointer">
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
                                handleAddToCart(item.maKhoaHoc, item);
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
                    </div>
                  );
                })}
              </div>
            ) : (
              renderNoResultSearch()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
