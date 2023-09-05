import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { CoursesService } from "../../services/CoursesService";
import { Button, Card, Pagination } from "antd";
import NavBar from "../HomePage/NavBar/NavBar";
import {
  StarFilled,
  CheckOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Tooltip } from "@material-tailwind/react";

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
  const renderNoResultSearch = () => {
    return (
      <div className="container-90">
        <p className="sm:text-3xl tracking-wider text-2xl font-bold title-font text-gray-900">
          Sorry, we couldn't find any results for "{searchParams.get("q")}"
        </p>
        <p className="sm:text-xl text-base font-bold title-font text-gray-900 my-5">
          Try adjusting your search. Here are some ideas:
        </p>
        <ul className="ml-5">
          <li className="list-disc">
            Make sure all words are spelled correctly
          </li>
          <li className="list-disc">Try different search terms</li>
          <li className="list-disc">Try more general search terms</li>
        </ul>
      </div>
    );
  };
  return (
    <div className="">
      <div className="h-max-content min-h-screen w-full bg-cover bg-white flex overflow-hidden">
        <div className="pt-[70px] lg:block hidden fixed h-screen top-0 w-[20%] bg-white flex-shrink-0  border-r border-r-[#e5e7eb]">
          <NavBar />
        </div>
        <div className="min-h-screen w-full lg:w-[80%] ml-auto bg-[#f9fafb]">
          <div className="py-[105px]">
            {listSearchCoursesValues.length !== 0 ? (
              <div className="container-90">
                <div className="flex flex-col text-start w-full mb-5">
                  <h1 className="sm:text-3xl tracking-wider text-2xl font-bold title-font text-gray-900">
                    {listSearchCoursesValues.length} results for "
                    {searchParams.get("q")}"
                  </h1>
                </div>
                {listSearchCoursesValues.map((item) => {
                  return (
                    <div className="cursor-pointer">
                      <div
                        className="lg:flex flex-row space-x-0 lg:space-y-0 space-y-5 lg:space-x-5 py-5 border-b"
                        key={item.maKhoaHoc}
                      >
                        <div
                          onClick={() => {
                            navigate(`/detail/${item?.maKhoaHoc}`);
                          }}
                          className="lg:w-64 w-full md:h-96 h-60 lg:h-36 flex-shrink-0 border"
                        >
                          <img
                            className="object-cover h-full w-full rounded-sm"
                            src={item.hinhAnh}
                            alt={item.tenKhoaHoc}
                          />
                        </div>
                        <div className="text-base w-full">
                          <Tooltip
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                            placement="bottom-end"
                            className="bg-white shadow-md"
                            content={
                              <div className="text-black p-5">
                                <p>What you’ll learn</p>
                                <ul>
                                  <li className="flex items-center">
                                    <CheckOutlined className="mr-2" />
                                    Skills that will allow you to apply for jobs
                                    like: Web Developer, Software Developer,
                                    Front End Developer, Javascript Developer,
                                    and Full Stack Developer
                                  </li>
                                  <li className="flex items-center">
                                    <CheckOutlined className="mr-2" />
                                    Learn modern technologies that are ACTUALLY
                                    being used behind tech companies in 2023
                                  </li>
                                  <li className="flex items-center">
                                    <CheckOutlined className="mr-2" />
                                    Build 10+ real world Web Development
                                    projects you can show off
                                  </li>
                                </ul>
                                <p class="font-semibold mt-1 text-[#2d2d2d]">
                                  CREATED BY:
                                  {item.nguoiTao.hoTen === null
                                    ? "Incognito"
                                    : item.nguoiTao.hoTen}
                                </p>
                                <p className="font-semibold mt-1 text-[#2d2d2d]">
                                  DATE CREATE: {item.ngayTao}
                                </p>
                              </div>
                            }
                          >
                            <div
                              onClick={() => {
                                navigate(`/detail/${item?.maKhoaHoc}`);
                              }}
                              className=""
                            >
                              <div className="flex items-center justify-between">
                                <p className="font-semibold md:leading-relaxed md:text-[18px] text-[#2d2d2d]">
                                  {item.tenKhoaHoc}
                                </p>
                                <div class="text-lg lg:block hidden font-semibold text-[#2d2d2d]">
                                  <p>₫15,999,000</p>
                                </div>
                              </div>
                              <div className="flex justify-between my-1">
                                <p className="md:block text-sm hidden text-[#2d2d2d] font-[300] pr-36">
                                  {item.moTa.length > 80
                                    ? item.moTa.slice(0, 100) + "..."
                                    : item.moTa +
                                      "Grafana from Basic to ADVANCE level; Complete Guide to Master DevOps Monitoring & Alerting"}
                                </p>
                                <div class="text-xs lg:block hidden  line-through font-semibold text-[#2d2d2d]">
                                  <p>₫16,999,000</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <p className="font-semibold md:leading-relaxed text-base text-[#2d2d2d] flex items-center">
                                  4.8
                                  <div class="text-yellow-600 flex items-center ml-2">
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                  </div>
                                </p>
                                <div className="flex items-center text-base text-[#2d2d2d]">
                                  <UsergroupAddOutlined /> {item.luotXem}{" "}
                                  Enerolled
                                </div>
                              </div>
                              <div class="flex items-center justify-between">
                                <div class="flex space-x-2 items-center text-sm pt-1 text-[#2d2d2d]">
                                  <p>13 hours</p>
                                  <p>·</p>
                                  <p>32 lectures</p>
                                  <p>·</p>
                                  <p>All levels</p>
                                </div>
                              </div>
                              <div className="flex space-x-3 items-center lg:hidden">
                                <div class="text-lg font-semibold text-[#2d2d2d]">
                                  <p>₫15,999,000</p>
                                </div>
                                <div class="text-xs  line-through font-semibold text-[#2d2d2d]">
                                  <p>₫16,999,000</p>
                                </div>
                              </div>
                            </div>
                          </Tooltip>
                          <div className="lg:mt-1 mt-3  flex justify-end space-x-2">
                            <div className="hover:text-red-600 text-[#666666] w-10 text-center leading-10 h-10 rounded-full hover:border-red-500  border transition-all duration-300 cursor-pointer">
                              <i
                                class="fa fa-heart text-xl"
                                onClick={() => {
                                  handleDispatchCourseWishList(item);
                                }}
                              />
                            </div>
                            <button
                              onClick={() => {
                                handleAddToCart(item.maKhoaHoc, item);
                              }}
                              className="text-white text-center w-full lg:w-[20%] py-1 border-none rounded bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] hover:bg-gradient-to-tl hover:from-[#ef4444] hover:to-[#fcd34d] transition-all duration-500 font-[500] uppercase flex items-center justify-center"
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
