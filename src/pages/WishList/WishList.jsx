import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "../HomePage/NavBar/NavBar";
import { Button, Card, Pagination } from "antd";
import { CoursesService } from "../../services/CoursesService";
import Swal from "sweetalert2";
import {
  setCourseAddToCart,
  setCoursesListWishList,
} from "../../redux/coursesSlice";
const { Meta } = Card;

export default function WishList() {
  const coursesWishLish = useSelector((state) => {
    return state.coursesSlice.coursesListWishList;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // dispatch courses wish list
  const user = useSelector((state) => {
    return state.userSlice.userInfo;
  });
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  const handleAddToCart = (items, cart) => {
    if (user) {
          dispatch(setCourseAddToCart(cart));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Added course to cart",
            showConfirmButton: false,
            timer: 1000,
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
  const renderWishList = () => {
    return coursesWishLish.map((item, index) => {
      return (
        <div key={item.class_id} className="shadow-sm bg-white rounded-md">
          <figure class="rounded-md movie-item hover:before:left-[125%] relative overflow-hidden cursor-pointe">
            <img
              className="w-[320px] cursor-pointer h-[175px] object-cover rounded-md"
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
              {item.class_name}
            </p>
            <div className="flex space-x-2 items-center text-sm pt-1 text-[#666666]">
              {item.schedule}
            </div>
            <div className="flex justify-between items-center  text-sm pt-1 text-[#727374]">
              <p className="font-[500]">Thích</p>
              <div className="text-red-600 transition-all duration-300 cursor-pointer">
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

        <div className="bg-[#f9fafb]">
          <div className="py-[105px]">
            <div className="">
              {user ? (
                <>
                  {coursesWishLish.length === 0 ? (
                    <div className="container-90">
                      <p className="mb-2 text-4xl tracking-wider font-bold">
                        Danh sách khóa học yêu thích
                      </p>
                      <p className="font-[500] mb-2">
                        <span className="font-bold">{coursesWishLish.length}</span> môn học trong danh sách yêu thích
                      </p>
                      <div className="shadow-md text-center bg-white">
                        <div className="w-60 h-44 mx-auto text-center mb-9">
                          <img
                            className="h-full object-cover"
                            src="/img/empty-shopping-cart-v2.jpg"
                            alt="hinhAnh"
                          />
                        </div>
                        <p className="mb-9">
                          {/* Your favorites list is empty. Keep shopping to find a
                          course! */}
                          Danh sách hiện tại đang trống. <br /> Tiếp tục tìm môn học yêu thích của bạn!
                        </p>
                        <button
                          onClick={() => {
                            setTimeout(() => {
                              navigate("/");
                            }, 300);
                          }}
                          className="mb-20 font-[500] px-3 py-1 rounded-md bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] hover:bg-gradient-to-tl hover:from-[#ef4444] hover:to-[#fcd34d] text-base text-white"
                        >
                          Xem thêm các môn học
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className=" container-90">
                      <p className="mb-1 text-4xl tracking-wider font-bold">
                        Danh sách môn học yêu thích
                      </p>
                      <p className="font-[500] mb-2">
                        <span className="font-bold">{coursesWishLish.length}</span> môn học trong danh sách yêu thích
                      </p>
                      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-3 mt-5">
                        {renderWishList()}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <> {navigate("/login")}</>
              )}
            </div>
          </div>
        </div>
  );
}
