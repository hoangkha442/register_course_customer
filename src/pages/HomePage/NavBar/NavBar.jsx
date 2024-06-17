
import React, { useState } from "react";
import {
  HomeOutlined,
  HeartOutlined,
  UserAddOutlined,
  FolderOpenOutlined,
  PlayCircleOutlined,
  ShoppingCartOutlined,
  PayCircleOutlined,
  WechatOutlined,
  FundOutlined,
  UnorderedListOutlined,
  CreditCardOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Menu, message } from "antd";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useSelector } from "react-redux";

export default function NavBar() {
  const [current, setCurrent] = useState("mail");
  const navigate = useNavigate();
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const user = useSelector((state) => {
    return state.userSlice.userInfo;
  });

  const items = [
    {
      label: (
        <NavLink to="/">
          <span className="text-[15px] font-[500] tracking-wider text-[#585757]">
            Trang chủ
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
            Khóa học
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
            Giỏ hàng
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
          {user ? (
            <button
              onClick={() => {
                navigate("/profile");
                
              }}
            >
              <span className="text-[15px] font-[500] tracking-wider text-[#585757]">
                Tài khoản
              </span>
            </button>
          ) : (
            <NavLink to="/login">
              <span className="text-[15px] font-[500] tracking-wider text-[#585757]">
                Tài khoản
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
            Danh sách yêu thích
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
            Khóa học hiện tại
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
  return (
    <div
      className="px-5 bg-white scroll-bar scroll-smooth scroll-navbar"
      style={{ overflowY: "scroll", height: "100%" }}
    >
      <div className="mt-3 top-0  h-screen bg-white">
        <Menu
          className="my-2 bg-white"
          onClick={onClick}
          selectedKeys={[current]}
          items={items}
        />
        <div className="border-t" id="menu-2">
          <div className="pl-2">
            <p className="text-[#333333] mt-3 text-xl font-semibold">Pages</p>
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
    </div>
  );
}