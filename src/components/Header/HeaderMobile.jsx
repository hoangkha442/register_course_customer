import React, { useState } from "react";
import "./SearchForm.css";
import { Button, Modal, message, Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userLocalStorage } from "../../services/LocalService";
import "./HamburgerBar.css";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  UserAddOutlined,
  FolderOpenOutlined,
  PlayCircleOutlined,
  PayCircleOutlined,
  WechatOutlined,
  FundOutlined,
  UnorderedListOutlined,
  CreditCardOutlined,
  DownOutlined,
  HeartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
export default function HeaderMobile() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
  const items = [
    {
      label: (
        <NavLink to="/">
          <span className="text-[15px] font-[500] tracking-wider text-[#585757]">
            Home
          </span>
        </NavLink>
      ),
      key: "mail",
      icon: (
        <div className="rounded-md w-8 h-8 bg-gradient-to-tl from-[#f9a8d4] to-[#ef4444] text-2xl justify-center">
          <HomeOutlined
            style={{ fontSize: "16px", textAlign: "center" }}
            className="text-white"
          />
        </div>
      ),
    },
    {
      label: (
        <NavLink to="/course-list">
          <span className="text-[15px] font-[500] tracking-wider] text-[#585757]">
            Courses
          </span>
        </NavLink>
      ),
      key: "Courses",
      icon: (
        <div className="rounded-md w-8 h-8 bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] text-2xl justify-center">
          <PlayCircleOutlined
            style={{ fontSize: "18px", textAlign: "center" }}
            className="text-white"
          />
        </div>
      ),
    },
    {
      label: (
        <NavLink to="/check-out">
          <span className="text-[15px] font-[500] tracking-wider] text-[#585757]">
            Cart
          </span>
        </NavLink>
      ),
      key: "Cart",
      icon: (
        <div className="rounded-md w-8 h-8 bg-gradient-to-tl from-[#c4b5fd] to-[#3b82f6] text-2xl justify-center">
          <ShoppingCartOutlined
            style={{ fontSize: "18px", textAlign: "center" }}
            className="text-white"
          />
        </div>
      ),
    },
    {
      label: (
        <div className="">
          {" "}
          {user ? (
            <button
              onClick={() => {
                setTimeout(() => {
                  navigate("/profile");
                  window.location.reload();
                }, 500);
              }}
            >
              <span className="text-[15px] font-[500] tracking-wider text-[#585757]">
                Account
              </span>
            </button>
          ) : (
            <NavLink to="/login">
              <span className="text-[15px] font-[500] tracking-wider text-[#585757]">
                Account
              </span>
            </NavLink>
          )}
        </div>
      ),
      key: "Account",
      icon: (
        <div className="rounded-md w-8 h-8 bg-gradient-to-tl from-[#6ee7b7] to-[#10b981] text-2xl justify-center">
          <UserAddOutlined
            style={{ fontSize: "18px", textAlign: "center" }}
            className="text-white"
          />
        </div>
      ),
    },
    {
      label: (
        <NavLink to="/wish-list/">
          <span className="text-[15px] font-[500] tracking-wider text-[#585757]">
            Favorites
          </span>
        </NavLink>
      ),
      key: "Favorites",
      icon: (
        <div className="rounded-md w-8 h-8 bg-gradient-to-tl from-[#f9a8d4] to-[#ef4444] text-2xl justify-center">
          <HeartOutlined
            style={{ fontSize: "16px", textAlign: "center" }}
            className="text-white"
          />
        </div>
      ),
    },
    {
      label: (
        <NavLink to="/user-courses">
          <span className="text-[15px] font-[500] tracking-wider text-[#585757]">
          Awaiting approval
          </span>
        </NavLink>
      ),
      key: "AwaitingApproval",
      icon: (
        <div className="rounded-md w-8 h-8 bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] text-2xl justify-center">
          <FundOutlined 
            style={{ fontSize: "16px", textAlign: "center" }}
            className="text-white"
          />
        </div>
      ),
    },
  ];
  const pages = [
    {
      label: (
        <a href="#FeaturedClasses">
          <span className="text-[15px] font-[500] tracking-wider text-[#585757]">
            Best Seller
          </span>
        </a>
      ),
      key: "Pricing",
      icon: (
        <div className="rounded-md w-8 h-8 text-2xl justify-center">
          <CreditCardOutlined
            style={{ fontSize: "18px", textAlign: "center" }}
            className="text-[#585757] font-bold"
          />
        </div>
      ),
    },
    {
      label: (
        <a href="#categories">
          <span className="text-[15px] font-[500] tracking-wider] text-[#585757]">
            Categories
          </span>
        </a>
      ),
      key: "Help",
      icon: (
        <div className="rounded-md w-8 h-8 text-2xl justify-center">
          <UnorderedListOutlined
            style={{ fontSize: "18px", textAlign: "center" }}
            className="text-[#585757"
          />
        </div>
      ),
    },
    {
      label: (
        <div
          onClick={() => {
            message.warning("Feature not updated!");
          }}
          className="flex justify-between items-center w-full"
        >
          <span className="text-[15px] font-[500] tracking-wider] text-[#585757]">
            Forum
          </span>
          <span className="text-[#11b981] bg-[#d1fae5] text-xs font-[500] px-2 py-1 rounded-3xl">
            New
          </span>
        </div>
      ),
      key: "Forum",
      icon: (
        <div
          onClick={() => {
            message.warning("Feature not updated!");
          }}
          className="rounded-md w-8 h-8 text-2xl justify-center"
        >
          <WechatOutlined
            style={{ fontSize: "18px", textAlign: "center" }}
            className="text-[#585757]"
          />
        </div>
      ),
    },
    {
      label: (
        <span
          onClick={() => {
            message.warning("Feature not updated!");
          }}
          className="text-[15px] w-full font-[500] tracking-wider] text-[#585757]"
        >
          Cart list
        </span>
      ),
      key: "CartList",
      icon: (
        <div
          onClick={() => {
            message.warning("Feature not updated!");
          }}
          className="rounded-md w-8 h-8 text-2xl justify-center"
        >
          <FolderOpenOutlined
            style={{ fontSize: "18px", textAlign: "center" }}
            className="text-[#585757]"
          />
        </div>
      ),
    },
    {
      label: (
        <span
          onClick={() => {
            message.warning("Feature not updated!");
          }}
          className="text-[15px] font-[500] tracking-wider] text-[#585757]"
        >
          Payments
        </span>
      ),
      key: "Payments",
      icon: (
        <div
          onClick={() => {
            message.warning("Feature not updated!");
          }}
          className="rounded-md w-8 h-8 text-2xl justify-center"
        >
          <PayCircleOutlined
            style={{ fontSize: "18px", textAlign: "center" }}
            className="text-[#585757]"
          />
        </div>
      ),
    },
  ];
  const [showModalTailwind, setShowModalTailwind] = React.useState(false);
  const [showModalTailwind2, setShowModalTailwind2] = React.useState(false);
  return (
    <div className="fixed w-full z-50 bg-white backdrop-blur-[40px]">
      <div className="overlay absolute w-full h-full blur-[40px]"></div>
      {user ? (
        <>
          <header className="bg-transparent flex items-center px-2 sm:px-5 border-b-[#e8ebed] border-b sticky right-0 top-0 z-20">
            <div className="logo w-[300px] h-[72px] flex flex-1 items-center">
              <Button type="primary" onClick={showModal}>
                <div class="space-y-2">
                  <span class="block w-8 h-0.5 bg-gray-800"></span>
                  <span class="block w-8 h-0.5 bg-gray-800"></span>
                  <span class="block w-5 h-0.5 bg-gray-800"></span>
                </div>
              </Button>
              <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div onClick={handleOk} className="mt-3 top-0 h-full bg-white">
                  <Menu
                    className="my-2 bg-white"
                    onClick={onClick}
                    selectedKeys={[current]}
                    items={items}
                  />
                  <div className="border-t" id="menu-2">
                    <div className="pl-2">
                      <p className="text-[#333333] mt-3 text-xl font-semibold">
                        Pages
                      </p>
                      <Menu className="my-2 bg-white" items={pages} />
                    </div>
                  </div>
                  <div className="border-t">
                    <div className="pl-2">
                      <div className="flex items-center justify-between flex-wrap mt-3 cursor-pointer">
                        <p className="text-[#585757] text-base font-semibold">
                          Development
                        </p>
                        <span>
                          <DownOutlined
                            style={{ fontSize: "14px", textAlign: "center" }}
                            className="text-[#585757] font-bold"
                          />
                        </span>
                      </div>
                      <div className="flex items-center justify-between flex-wrap mt-3 cursor-pointer">
                        <p className="text-[#585757] text-base font-semibold">
                          Authentication
                        </p>
                        <DownOutlined
                          style={{ fontSize: "14px", textAlign: "center" }}
                          className="text-[#585757] font-bold"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="side_foot_links text-xs pt-5">
                    <ul className="flex flex-wrap">
                      <li className="pr-2">
                        <a href=""> About</a>
                      </li>
                      <li className="pr-2">
                        <a href=""> Blog</a>
                      </li>
                      <li className="pr-2">
                        <a href=""> Careers</a>
                      </li>
                      <li className="pr-2">
                        <a href=""> Support</a>
                      </li>
                      <li className="pr-2">
                        <a href=""> Contact Us </a>
                      </li>
                      <li className="pr-2">
                        <a href=""> Developer</a>
                      </li>
                      <li className="pr-2">
                        <a href=""> Terms of service</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Modal>
              <a
                onClick={() => {
                  navigate("/");
                }}
              >
                <img className="w-40" src="./img/logo-mobile.png" alt="" />
              </a>
            </div>
            <div className="flex items-center justify-end h-[72px]">
              <div className="flex items-center space-x-5">
                {listRegisterCourses.length === 0 ? (
                  <button
                    className="sm:block hidden"
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
                    className="relative z-10 sm:block hidden"
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
                  className="sm:block hidden"
                >
                  <HeartOutlined className="text-2xl" />
                </button>
                <button
                  onClick={() => setShowModalTailwind2(true)}
                  className="lg:hidden block"
                >
                  <SearchOutlined className="text-2xl" />
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
                                      navigate("/check-out");
                                      setTimeout(() => {
                                        window.location.reload();
                                      }, 200);
                                    }}
                                    className="flex py-2 px-4 text-[#616161] text-[14px] font-[400] items-center space-x-3 cursor-pointer hover:bg-[#f1f3f4] hover:text-black transition-all duration-500"
                                  >
                                    <p className="">My Cart</p>
                                  </a>
                                </div>
                              </li>
                              <li>
                                <a
                                  onClick={() => {
                                    message.warning("Feature not updated!");
                                  }}
                                  className="flex py-2 px-4 text-[#616161] text-[14px] items-center space-x-3 cursor-pointer hover:bg-[#f1f3f4] hover:text-black transition-all duration-500"
                                >
                                  <p className="">Writing Blogs</p>
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={() => {
                                    message.warning("Feature not updated!");
                                  }}
                                  className="flex py-2 px-4 text-[#616161] text-[14px] items-center space-x-3 cursor-pointer hover:bg-[#f1f3f4] hover:text-black transition-all duration-500"
                                >
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
                                <a
                                  onClick={() => {
                                    navigate("/profile");
                                    setTimeout(() => {
                                      window.location.reload();
                                    }, 200);
                                  }}
                                  className="flex py-2 px-4 text-[#616161] text-[14px] items-center space-x-3 cursor-pointer hover:bg-[#f1f3f4] hover:text-black transition-all duration-500"
                                >
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
            {showModalTailwind2 ? (
              <>
                <div
                  onClick={() => setShowModalTailwind(false)}
                  className="h-screen justify-center mt-14 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                  <div className="relative top-0 left-0 w-full max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="p-5 rounded-t w-full flex-1">
                        <form
                          onSubmit={handleSearch}
                          className="border-[#020d18] relative"
                          id="searchCourses"
                        >
                          <input
                            onChange={handleOnchange}
                            required
                            className="font-[300] border-[2px] border-[#e8e8e8] rounded-3xl w-[100%] pl-9 h-10 overflow-hidden focus:outline-none"
                            type="text"
                            placeholder=" Quick search for anything.."
                          />
                          <button className="search-form"></button>
                        </form>
                      </div>
                      <div className="text-right mb-3 mr-5">
                        <button
                          className="cursor-pointer rounded-md bg-red-500 text-white py-1 px-3"
                          onClick={() => setShowModalTailwind2(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </header>
        </>
      ) : (
        <>
          <header className="flex items-center px-8 border-b-[#e8ebed] border-b sticky right-0 top-0 z-20">
            <div className="logo w-[300px] h-[72px] flex flex-1 items-center">
              <Button type="primary" onClick={showModal}>
                <div class="space-y-2">
                  <span class="block w-8 h-0.5 bg-gray-800"></span>
                  <span class="block w-8 h-0.5 bg-gray-800"></span>
                  <span class="block w-5 h-0.5 bg-gray-800"></span>
                </div>
              </Button>
              <a href="#" className="">
                <img className="w-32" src="./img/logo-mobile.png" alt="" />
              </a>
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
                  onClick={() => setShowModalTailwind2(true)}
                  className="lg:hidden block"
                >
                  <SearchOutlined className="text-2xl" />
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
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <div className="mt-3 top-0 h-full bg-white">
                <Menu
                  className="my-2 bg-white"
                  onClick={onClick}
                  selectedKeys={[current]}
                  items={items}
                />
                <div className="border-t" id="menu-2">
                  <div className="pl-2">
                    <p className="text-[#333333] mt-3 text-xl font-semibold">
                      Pages
                    </p>
                    <Menu className="my-2 bg-white" items={pages} />
                  </div>
                </div>
                <div className="border-t">
                  <div className="pl-2">
                    <div className="flex items-center justify-between flex-wrap mt-3 cursor-pointer">
                      <p className="text-[#585757] text-base font-semibold">
                        Development
                      </p>
                      <span>
                        <DownOutlined
                          style={{ fontSize: "14px", textAlign: "center" }}
                          className="text-[#585757] font-bold"
                        />
                      </span>
                    </div>
                    <div className="flex items-center justify-between flex-wrap mt-3 cursor-pointer">
                      <p className="text-[#585757] text-base font-semibold">
                        Authentication
                      </p>
                      <DownOutlined
                        style={{ fontSize: "14px", textAlign: "center" }}
                        className="text-[#585757] font-bold"
                      />
                    </div>
                  </div>
                </div>
                <div class="side_foot_links text-xs pt-5">
                  <ul className="flex flex-wrap">
                    <li className="pr-2">
                      <a href=""> About</a>
                    </li>
                    <li className="pr-2">
                      <a href=""> Blog</a>
                    </li>
                    <li className="pr-2">
                      <a href=""> Careers</a>
                    </li>
                    <li className="pr-2">
                      <a href=""> Support</a>
                    </li>
                    <li className="pr-2">
                      <a href=""> Contact Us </a>
                    </li>
                    <li className="pr-2">
                      <a href=""> Developer</a>
                    </li>
                    <li className="pr-2">
                      <a href=""> Terms of service</a>
                    </li>
                  </ul>
                </div>
              </div>
            </Modal>
            {showModalTailwind2 ? (
              <>
                <div
                  onClick={() => setShowModalTailwind(false)}
                  className="h-screen justify-center mt-14 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                  <div className="relative top-0 left-0 w-full max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="p-5 rounded-t w-full flex-1">
                        <form
                          onSubmit={handleSearch}
                          className="border-[#020d18] relative"
                          id="searchCourses"
                        >
                          <input
                            onChange={handleOnchange}
                            required
                            className="font-[300] border-[2px] border-[#e8e8e8] rounded-3xl w-[100%] pl-9 h-10 overflow-hidden focus:outline-none"
                            type="text"
                            placeholder=" Quick search for anything.."
                          />
                          <button className="search-form"></button>
                        </form>
                      </div>
                      <div className="text-right mb-3 mr-5">
                        <button
                          className="cursor-pointer rounded-md bg-red-500 text-white py-1 px-3"
                          onClick={() => setShowModalTailwind2(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </header>
        </>
      )}
    </div>
  );
}
