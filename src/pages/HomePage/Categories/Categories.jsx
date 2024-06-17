import React from "react";
import { useEffect } from "react";
import { CoursesService } from "../../../services/CoursesService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  useEffect(() => {
    CoursesService.getCategorySubject()
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);
  function removeVietnameseAccents(str) {
    const accents = 'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ';
    const nonAccents = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd';
    
    return str.split('').map((char) => {
      const index = accents.indexOf(char);
      return index !== -1 ? nonAccents[index] : char;
    }).join('');
  }
  const RenderCategory = () => { 
    return category.map((s, index) => { 
      return (
        <div
        key={s.subject_id}
          onClick={() => {
            navigate(`/caterogy/${s.subject_name}`);
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
          <p className="mt-2 text-base font-bold text-[#666666]">{s.subject_name}</p>
        </div>
      )  
    })
  }
  return (
    <div id="categories" className="lg:w-[80%] mx-auto w-[90%] py-[55px]">
      <h2 class="text-2xl font-semibold mb-5"> Danh mục môn học </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 pl-3">
        {RenderCategory()}
      </div>
    </div>
  );
}
