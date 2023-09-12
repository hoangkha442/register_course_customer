import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../HomePage/NavBar/NavBar";
import { NavLink, useNavigate } from "react-router-dom";
import { setDeleteCoursesListRegister } from "../../redux/coursesSlice";
import Swal from "sweetalert2";
import { CoursesService } from "../../services/CoursesService";
import { coursesListRegisterStorage } from "../../services/LocalService";

export default function CheckOut() {
  const user = useSelector((state) => {
    return state.userSlice.userInfo;
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) return navigate("/login");
  }, []);
  const listCoursesRegister = useSelector((state) => {
    return state.coursesSlice.coursesListRegister;
  });
  const dispatch = useDispatch();
  // Render Course List
  const handleRenderCoursesCheckOut = () => {
    return listCoursesRegister.map((item, index) => {
      return (
        <div className="" key={index}>
          <section className="text-gray-600 bg-white">
            <div className="h-full flex flex-wrap items-center shadow-sm border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={item.hinhAnh}
              />
              <div className="flex-grow">
                <h2 className="text-gray-900 title-font font-medium">
                  {item.tenKhoaHoc}
                </h2>
                <p className="text-gray-500">by: {item.nguoiTao.hoTen}</p>
                <h2 className="text-gray-900 title-font font-medium">
                  {item.luotXem} Lectures
                </h2>
              </div>
              <div className="flex-grow sm:mt-0 mt-3 text-end">
                <div className="">
                  <span className="line-through mr-2 font-[500]">
                    {item.giaHienTai.toLocaleString()}
                  </span>
                  <span className="no-underline font-bold text-xl text-red-500">
                    {item.giaKhuyenMai.toLocaleString()}{" "}
                    <span className="text-sm">VNĐ</span>
                  </span>
                </div>
                <button
                  className="text-red-400 font-bold"
                  onClick={() => {
                    handleDeleteCoursesListRegister(item);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </section>
        </div>
      );
    });
  };
  // Unsubscribe
  const handleDeleteCoursesListRegister = (item) => {
    CoursesService.postCancelCourses({
      maKhoaHoc: item.maKhoaHoc,
      taiKhoan: user.taiKhoan,
    })
      .then((res) => {
        dispatch(setDeleteCoursesListRegister(item));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Unsubscribe success!",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "The course has actually been canceled !",
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };
  // thanh toán thành công
  const handleCheckOutFinish = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Payment Success !",
      showConfirmButton: false,
      timer: 1000,
    });
    setTimeout(() => {
      coursesListRegisterStorage.remove();
      window.location.reload();
    }, 1000);
  };
  const handlePriceCurrent = () => {
    return listCoursesRegister.reduce((acc, course) => {
      return acc + course.giaHienTai;
    }, 0);
  };
  const handlePriceDiscount = () => {
    return listCoursesRegister.reduce((acc, course) => {
      return acc + course.giaKhuyenMai;
    }, 0);
  };
  return (
    <div className="">
      {!user ? (
        <NavLink to="/login"></NavLink>
      ) : (
        <div className="h-max-content min-h-screen w-full bg-cover flex overflow-hidden bg-[#f9fafb]">
          <div className="pt-[70px] lg:block hidden fixed h-screen top-0 w-[20%] bg-white flex-shrink-0  border-r border-r-[#e5e7eb]">
            <NavBar />
          </div>
          <div className="min-h-screen lg:w-[80%] w-full ml-auto">
            <div className="py-[105px]">
              {listCoursesRegister.length == 0 ? (
                <div className="container-90">
                  <p className="mb-8 text-4xl tracking-wider font-bold">
                    Shopping Cart
                  </p>
                  <p className="font-[500] mb-2">
                    {listCoursesRegister.length} Courses in cart
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
                      Your cart is empty. Keep shopping to find a course!
                    </p>
                    <button
                      onClick={() => {
                        setTimeout(() => {
                          navigate("/");
                        }, 300);
                      }}
                      className="mb-20 font-[500] px-3 py-1 rounded-md bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] hover:bg-gradient-to-tl hover:from-[#ef4444] hover:to-[#fcd34d] text-base text-white"
                    >
                      Keep Shopping
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="container-90">
                    <p className="mb-8 text-4xl tracking-wider font-bold">
                      Shopping Cart
                    </p>
                    <p className="font-[500] mb-2">
                      {listCoursesRegister.length} Courses in cart
                    </p>
                    <div className="flex flex-wrap">
                      <div className="p-2 lg:w-2/3 w-full space-y-2">
                        {handleRenderCoursesCheckOut()}
                      </div>
                      <div className="p-2 lg:w-1/3 w-full">
                        <div className="bg-white shadow-sm border p-4 rounded-lg">
                          <div className="flex justify-between">
                            <p className="text-2xl font-bold">Total</p>
                            <p className="font-bold text-red-500 text-xl">
                              {handlePriceDiscount().toLocaleString()}{" "}
                              <span className="text-sm">VNĐ</span>
                            </p>
                          </div>
                          <p className="line-through text-end">
                            {handlePriceCurrent().toLocaleString()}{" "}
                            <span>VNĐ</span>
                          </p>
                          <div className="text-end mt-3">
                            <button
                              onClick={() => {
                                handleCheckOutFinish();
                              }}
                              className="w-full px-2 py-1 bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] rounded-lg font-[700] text-gray-800"
                            >
                              Pay
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
