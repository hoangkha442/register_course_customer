import React, { useState } from "react";
import "./SearchForm.css";
import { Button, Modal, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userLocalStorage } from "../../services/LocalService";
import {
  ShoppingCartOutlined,
  MailOutlined,
  BellOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";

export default function HeaderDesktop() {
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");
  const user = useSelector((state) => {
    return state.userSlice.userInfo;
  });
  const handleLogout = () => {
    navigate("/login");
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout successful!",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      userLocalStorage.remove();
      window.location.reload();
    });
  };
  const listRegisterCourses = useSelector((state) => {
    return state.coursesSlice.coursesListRegister;
  });
  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search?q=${searchItem}`);
  };
  const handleOnchange = (event) => {
    let { value } = event.target;
    console.log("event.target: ", event.target.value);
    setSearchItem(value);
  };
  const [showModalTailwind, setShowModalTailwind] = React.useState(false);
  return (
    <div className="fixed w-full z-40 bg-transparent backdrop-blur-[40px]">
      <div className="overla absolute w-full h-full blur-[40px]"></div>
      {user ? (
        <>
          <header className="bg-transparent flex items-center px-5 border-b-[#e8ebed] border-b sticky right-0 top-0 z-20">
            <div className="logo w-[300px] h-[72px] flex flex-1 items-center">
              <a
                onClick={() => {
                  navigate("/");
                }}
                className=""
              >
                <img className="w-40" src="./img/logo.png" alt="" />
              </a>
            </div>
            <div className="flex items-center justify-center flex-1 h-[72px]">
              <form
                onSubmit={handleSearch}
                className="border-[#020d18] relative"
                id="searchCourses"
              >
                <input
                  onChange={handleOnchange}
                  required
                  className="font-[300] border-[2px] border-[#e8e8e8] rounded-3xl pr-24 pl-9 h-10 overflow-hidden  focus:outline-none"
                  type="text"
                  placeholder=" Quick search for anything.."
                />
                <button className="search-form"></button>
              </form>
            </div>
            <div className="flex items-center justify-end flex-1 h-[72px]">
              <div className="flex items-center space-x-5">
                {listRegisterCourses.length === 0 ? (
                  <button
                    onClick={() => {
                      navigate("/check-out");
                    }}
                  >
                    <ShoppingCartOutlined className="text-2xl" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/check-out");
                    }}
                    className="relative z-10"
                  >
                    <div className="absolute -top-1 -right-3 w-5 h-5 leading-5 bg-gradient-to-r from-[#fcaa4d] to-[#ef4444] rounded-full text-white text-xs font-bold z-20 text-center align-middle">
                      {listRegisterCourses.length}
                    </div>
                    <ShoppingCartOutlined className="text-2xl" />
                  </button>
                )}
                <button
                  onClick={() => {
                    navigate("/wish-list");
                  }}
                >
                  <HeartOutlined className="text-2xl" />
                </button>
                <div className="">
                  <button
                    type="primary"
                    onClick={() => setShowModalTailwind(true)}
                  >
                    <img
                      alt="avatar"
                      className="w-8 h-8 mr-4 rounded-full ring-2 ring-offset-4 ring-red-500 ring-offset-red-200"
                      src="https://source.unsplash.com/40x40/?portrait?1"
                    />
                  </button>
                  {showModalTailwind ? (
                    <>
                      <div
                        onClick={() => setShowModalTailwind(false)}
                        className="h-screen justify-center mt-14 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                      >
                        <div className="relative top-0 right-0 w-[270px] ml-auto mr-5 max-w-3xl">
                          {/*content*/}
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                              <div className="flex items-center">
                                <img
                                  alt="avatar"
                                  className="w-8 h-8 mr-4 rounded-full ring-2 ring-offset-4 ring-red-500 ring-offset-red-200"
                                  src="https://source.unsplash.com/40x40/?portrait?1"
                                />
                                <div className="flex flex-col">
                                  <p className="font-[600] text-[#333] leading-5 text-base">
                                    {user.hoTen}
                                  </p>
                                  <p className="text-[#959595] text-[12.5px]">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/*body*/}
                            <ul className="relative">
                              <li className="my-1">
                                <div className="border-b border-solid border-slate-200 rounded-t">
                                  <a
                                    onClick={() => {
                                      navigate("/profile");
                                      setTimeout(() => {
                                        window.location.reload();
                                      }, 200)
                                    }}
                                    className="flex py-2 px-4 text-[#616161] text-[14px] font-[400] items-center space-x-3 cursor-pointer hover:bg-[#f1f3f4] hover:text-black transition-all duration-500"
                                  >
                                    <p className="">My Account</p>
                                  </a>
                                </div>
                              </li>
                              <li>
                                <a onClick={() => { 
                                  message.warning('Feature not updated!')
                                 }} className="flex py-2 px-4 text-[#616161] text-[14px] items-center space-x-3 cursor-pointer hover:bg-[#f1f3f4] hover:text-black transition-all duration-500">
                                  <p className="">Writing Blogs</p>
                                </a>
                              </li>
                              <li>
                                <a onClick={() => { 
                                  message.warning('Feature not updated!')
                                 }} className="flex py-2 px-4 text-[#616161] text-[14px] items-center space-x-3 cursor-pointer hover:bg-[#f1f3f4] hover:text-black transition-all duration-500">
                                  <p className="">My Posts</p>
                                </a>
                              </li>
                              <li className="">
                                <div className="border-b border-solid border-slate-200 rounded-t">
                                    <NavLink to="/wish-list/#">
                                  <a className="flex py-2 px-4 text-[#616161] text-[14px] font-[400] items-center space-x-3 cursor-pointer hover:bg-[#f1f3f4] hover:text-black transition-all duration-500">
                                      <p className="">Wishlish</p>
                                  </a>
                                    </NavLink>
                                </div>
                              </li>
                              <li>
                                <a onClick={() => { 
                                  navigate('/profile')
                                  setTimeout(() => {
                                    window.location.reload();
                                  }, 200)
                                 }} className="flex py-2 px-4 text-[#616161] text-[14px] items-center space-x-3 cursor-pointer hover:bg-[#f1f3f4] hover:text-black transition-all duration-500">
                                  <p className="">Account Settings</p>
                                </a>
                              </li>
                            </ul>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                              <button
                                onClick={() => {
                                  handleLogout();
                                }}
                                className="rounded-md bg-red-500 text-white py-1 px-3"
                              >
                                Log Out
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </header>
        </>
      ) : (
        <>
          <header className="flex items-center px-8 border-b-[#e8ebed] border-b sticky right-0 top-0 z-20">
            <div className="logo w-[300px] h-[72px] flex flex-1 items-center">
              <a href="#" className="">
                <img className="w-40" src="./img/logo.png" alt="" />
              </a>
            </div>
            <div className="flex items-center justify-center flex-1">
            <form
                onSubmit={handleSearch}
                className="border-[#020d18] relative"
                id="searchCourses"
              >
                <input
                  onChange={handleOnchange}
                  required
                  className="font-[300] border-[2px] border-[#e8e8e8] rounded-3xl pr-24 pl-9 h-10 overflow-hidden  focus:outline-none"
                  type="text"
                  placeholder=" Quick search for anything.."
                />
                <button className="search-form"></button>
              </form>
            </div>
            <div className="flex items-center justify-end flex-1">
              <div className="flex items-center space-x-5">
                <button onClick={() => { 
                  navigate('/login')
                 }}>
                  <ShoppingCartOutlined className="text-2xl sm:block hidden"/>
                </button>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <HeartOutlined className="text-2xl sm:block hidden" />
                </button>
                <button
                  onClick={() => {
                    setTimeout(() => {
                      navigate("/login");
                    }, 500);
                  }}
                >
                  <img
                    className="w-8 h-8 object-cover"
                    src="./img/user_login.png"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </header>
        </>
      )}
    </div>
  );
}
