import React, { useEffect, useState } from "react";
import { CoursesService } from "../../services/CoursesService";
import { Card } from "antd";
import { NavLink } from "react-router-dom";
import './Courses.css'
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
  const renderPopularCoureses = () => {
    return PopularCoureses.slice(1, 4).map((item, index) => {
      return (
        <div
          index={index}
          className="rounded-md bg-white shadow-sm cursor-pointer relative"
        >
          <div className="absolute cursor-default rounded-md w-full h-full bg-gradient-to-tl from-[#c4b5fd] to-[#3b82f6]  opacity-0 hover:opacity-100 transition-all duration-500">
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
                  <i class="fa fa-heart"></i>
                  </div>
                </h4>
                <div className="flex justify-between">
                    <div className="">
                      <button className="px-3 py-1 text-white border-[#c4b5fd] border bg-gradient-to-tl from-[#3b82f6] to-[#c4b5fd] rounded-sm">Add To Cart</button>
                    </div>
                    <div className="">
                      <NavLink to={`/detail/${item?.maKhoaHoc}`}>
                      <button className="px-3 py-1 text-white border-[#c4b5fd] border bg-gradient-to-tl from-[#3b82f6] to-[#c4b5fd] rounded-md">Detail</button>
                      </NavLink>
                    </div>
                </div>
              </div>
            </div>
          </div>
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
        </div>
      );
    });
  };
  return (
    <div>
      <div class="sm:my-4 my-3 flex items-end justify-between pt-8">
        <h2 class="text-2xl font-semibold"> Popular Classes </h2>
        <a href="#" class="text-[#2a41e8] sm:block hidden">
          See all
        </a>
      </div>
      <div className="grid grid-cols-3 gap-5 pl-3">
        {renderPopularCoureses()}
      </div>
    </div>
  );
}
