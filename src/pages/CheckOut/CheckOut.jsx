import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CoursesService } from "../../services/CoursesService";
import { UserService } from "../../services/UserService";
import { fetchCartByUserId, deleteCartItem } from "./cartSlice";
import { BASE_URL_IMG } from "../../services/Config";

export default function CheckOut() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const user = useSelector((state) => state.userSlice.userInfo);
  const cart = useSelector((state) => state.cart.items);
  const [selectedItems, setSelectedItems] = useState(cart);

  useEffect(() => {
    if (user) {
      UserService.getMyInfor()
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchCartByUserId(userInfo.user_id));
    }
  }, [userInfo, dispatch]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) return navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    setSelectedItems(cart);
  }, [cart]);

  // Handle item selection
  const handleSelectItem = (item) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((i) => i !== item)
        : [...prevSelectedItems, item]
    );
  };

  // Render Course List
  const handleRenderCoursesCheckOut = () => {
    return cart.map((item, index) => (
      <div className="" key={index}>
        <section className="text-gray-600 bg-white">
          <div className="h-full flex flex-wrap items-center shadow-sm border p-4 rounded-lg">
            <input
              type="checkbox"
              className="mr-4"
              checked={selectedItems.includes(item)}
              onChange={() => handleSelectItem(item)}
            />
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={BASE_URL_IMG + item?.classes?.picture || ""}
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">
                {item?.classes?.class_name}
              </h2>
              <p className="text-gray-500">Giáo viên: {item?.users?.full_name}</p>
            </div>
            <div className="flex-grow sm:mt-0 mt-3 text-end">
              <div className="">
                <span className="line-through mr-2 font-[500]">
                  {(item?.classes?.price * item?.quantity * 100).toLocaleString("de-DE")}
                </span>
                <span className="no-underline font-bold text-xl text-red-500">
                  {(item?.classes?.price * item?.quantity * 100).toLocaleString("de-DE")}
                  <span className="text-sm"> VNĐ</span>
                </span>
              </div>
              <button
                className="text-red-400 font-bold"
                onClick={() => handleDeleteCoursesListRegister(item)}
              >
                Xóa
              </button>
            </div>
          </div>
        </section>
      </div>
    ));
  };

  // Unsubscribe
  const handleDeleteCoursesListRegister = (item) => {
    dispatch(deleteCartItem(item.cart_id)).then(() => {
      dispatch(fetchCartByUserId(userInfo.user_id));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Xóa thành công!",
        showConfirmButton: false,
        timer: 1000,
      });
    });
  };

  function getFormattedDate(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  }

  // Thanh toán thành công
  const handleCheckOutFinish = () => {
    const formattedDate = getFormattedDate(new Date());
    const registrations = selectedItems.map((item) => ({
      student_id: item.users.user_id,
      class_id: item.classes.class_id,
      registration_date: formattedDate,
      study_status: "Chờ phê duyệt",
    }));

    CoursesService.postMultipleCoursesRegister({ registrations })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thanh toán thành công!",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          selectedItems.forEach((item) => {
            dispatch(deleteCartItem(item.cart_id));
          });
          dispatch(fetchCartByUserId(userInfo.user_id));
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Delete selected cart items
  const handleDeleteSelected = () => {
    const cartIds = selectedItems.map((item) => item.cart_id);
    CoursesService.deleteMultipleCartItems({ cartIds })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Selected items deleted successfully!",
          showConfirmButton: false,
          timer: 1000,
        });
        dispatch(fetchCartByUserId(userInfo.user_id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePriceCurrent = () => {
    return cart.reduce((acc, course) => {
      return acc + parseFloat(course.classes.price) * course.quantity * 100;
    }, 0);
  };

  const handlePriceDiscount = () => {
    return selectedItems.reduce((acc, course) => {
      return acc + parseFloat(course.classes.price) * course.quantity * 100;
    }, 0);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {!user ? (
        <NavLink to="/login"></NavLink>
      ) : (
        <>
          {cart.length === 0 ? (
            <div className="w-[80%] py-20 flex flex-col items-center">
              <p className="mb-4 text-2xl font-bold text-gray-800">Giỏ hàng</p>
              <p className="text-base font-medium mb-4">
                <span className="font-bold">{cart.length}</span> môn học trong giỏ hàng
              </p>
              <div className="shadow-lg p-8 rounded-lg text-center bg-white w-full">
                <div className="w-60 h-44 mx-auto mb-6">
                  <img
                    className="h-full w-full object-cover rounded"
                    src="/img/empty-shopping-cart-v2.jpg"
                    alt="Empty Cart"
                  />
                </div>
                <p className="mb-6 text-gray-600">
                  Giỏ hàng của bạn đang trống. Tiếp tục tìm thêm các môn học khác!
                </p>
                <button
                  onClick={() => {
                    setTimeout(() => {
                      navigate("/");
                    }, 300);
                  }}
                  className="mb-4 px-6 py-3 rounded-lg bg-gradient-to-tl from-yellow-400 to-red-400 hover:from-red-400 hover:to-yellow-400 text-white font-semibold"
                >
                  Các môn học
                </button>
              </div>
            </div>
          ) : (
            <div className="container mx-auto py-24 px-10">
              <p className="mb-2 text-xl font-semibold text-gray-700">Giỏ hàng</p>
              <p className="text-base font-medium mb-4">
                {cart.length} môn học trong giỏ hàng
              </p>
              <div
                className="flex flex-wrap rounded-lg bg-white"
                style={{
                  boxShadow: "0 2px 1px rgba(0, 0, 0, 0.05)",
                  borderTop: "3px solid #8CDDCD",
                }}
              >
                <div className="p-4 lg:w-2/3 w-full space-y-4">
                  {handleRenderCoursesCheckOut()}
                </div>
                <div className="p-4 lg:w-1/3 w-full">
                  <div className="bg-white shadow-md border p-6 rounded-lg">
                    <div className="flex justify-between mb-4">
                      <p className="text-3xl font-bold">Tổng</p>
                      <p className="font-bold text-red-500 text-2xl">
                        {handlePriceDiscount().toLocaleString()}
                        <span className="text-lg"> VNĐ</span>
                      </p>
                    </div>
                    <p className="line-through text-end text-gray-500">
                      {handlePriceCurrent().toLocaleString()}
                      <span> VNĐ</span>
                    </p>
                    <div className="mt-6 border-t pt-4">
                      <p className="text-lg font-semibold mb-4">
                        Phương thức thanh toán
                      </p>
                      <div className="flex items-center mb-4">
                        <input
                          type="radio"
                          id="cash"
                          name="payment"
                          value="cash"
                          checked={paymentMethod === "cash"}
                          onChange={() => handlePaymentMethodChange("cash")}
                          className="mr-2"
                        />
                        <label htmlFor="cash" className="text-gray-700">
                          Tiền mặt
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="bank"
                          name="payment"
                          value="bank"
                          checked={paymentMethod === "bank"}
                          onChange={() => handlePaymentMethodChange("bank")}
                          className="mr-2"
                        />
                        <label htmlFor="bank" className="text-gray-700">
                          Chuyển khoản
                        </label>
                      </div>
                    </div>
                    <div className="text-end mt-6">
                      <button
                        onClick={handleCheckOutFinish}
                        className="w-full px-4 py-2 bg-gradient-to-tl from-yellow-400 to-red-400 rounded-lg font-semibold text-white"
                      >
                        Thanh toán
                      </button>
                      {selectedItems.length > 0 && (
                        <button
                          onClick={handleDeleteSelected}
                          className="w-full mt-4 px-4 py-2 bg-gradient-to-tl from-red-400 to-yellow-400 rounded-lg font-semibold text-white"
                        >
                          Xóa mục đã chọn
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
