import React from "react";
import { useEffect } from "react";
import { CoursesService } from "../../../services/CoursesService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  useEffect(() => {
    CoursesService.getCategory()
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);
  return (
    <div id="categories" className="lg:w-[80%] mx-auto w-[90%] py-[55px]">
      <h2 class="text-2xl font-semibold mb-5"> Categories </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 pl-3">
        <div
          onClick={() => {
            navigate("/caterogy/BackEnd");
          }}
          className="cursor-pointer"
        >
          <div className="w-full md:h-72 h-48 max-w-xs overflow-hidden bg-cover bg-no-repeat">
            <img
              className="object-cover w-full h-full rounded-md max-w-xs transition duration-300 ease-in-out hover:scale-110"
              src="/img/caterogy1.jpg"
              alt="hinhAnh"
            />
          </div>
          <p className="mt-2 text-base font-bold text-[#666666]">BackEnd</p>
        </div>
        <div
          onClick={() => {
            navigate("/caterogy/Design");
          }}
          className="cursor-pointer"
        >
          <div className="w-full md:h-72 h-48 max-w-xs overflow-hidden bg-cover bg-no-repeat">
            <img
              className="object-cover w-full h-full rounded-md max-w-xs transition duration-300 ease-in-out hover:scale-110"
              src="/img/caterogy2.jpg"
              alt="hinhAnh"
            />
          </div>
          <p className="mt-2 text-base font-bold text-[#666666]">Design</p>
        </div>
        <div
          onClick={() => {
            navigate("/caterogy/DiDong");
          }}
          className="cursor-pointer"
        >
          <div className="w-full md:h-72 h-48 max-w-xs overflow-hidden bg-cover bg-no-repeat">
            <img
              className="object-cover w-full h-full rounded-md max-w-xs transition duration-300 ease-in-out hover:scale-110"
              src="/img/caterogy3.jpg"
              alt="hinhAnh"
            />
          </div>
          <p className="mt-2 text-base font-bold text-[#666666]">
            Mobile Programing
          </p>
        </div>
        <div
          onClick={() => {
            navigate("/caterogy/FrontEnd");
          }}
          className="cursor-pointer"
        >
          <div className="w-full md:h-72 h-48 max-w-xs overflow-hidden bg-cover bg-no-repeat">
            <img
              className="object-cover h-full w-full rounded-md max-w-xs transition duration-300 ease-in-out hover:scale-110"
              src="/img/caterogy4.jpg"
              alt="hinhAnh"
            />
          </div>
          <p className="mt-2 text-base font-bold text-[#666666]">FrontEnd</p>
        </div>
        <div
          onClick={() => {
            navigate("/caterogy/FullStack");
          }}
          className="cursor-pointer"
        >
          <div className="w-full md:h-72 h-48 max-w-xs overflow-hidden bg-cover bg-no-repeat">
            <img
              className="object-cover h-full w-full rounded-md max-w-xs transition duration-300 ease-in-out hover:scale-110"
              src="/img/caterogy5.jpg"
              alt="hinhAnh"
            />
          </div>
          <p className="mt-2 text-base font-bold text-[#666666]">FullStack</p>
        </div>
        <div
          onClick={() => {
            navigate("/caterogy/TuDuy");
          }}
          className="cursor-pointer"
        >
          <div className="w-full md:h-72 h-48 max-w-xs overflow-hidden bg-cover bg-no-repeat">
            <img
              className="object-cover w-full h-full rounded-md max-w-xs transition duration-300 ease-in-out hover:scale-110"
              src="/img/caterogy6.jpg"
              alt="hinhAnh"
            />
          </div>
          <p className="mt-2 text-base font-bold text-[#666666]">Logical</p>
        </div>
      </div>
    </div>
  );
}
