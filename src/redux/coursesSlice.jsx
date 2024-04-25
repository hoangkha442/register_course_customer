import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  coursesListRegisterStorage,
  wishListStorage,
} from "../services/LocalService";
import Swal from "sweetalert2";

const initialState = {
  coursesListWishList: wishListStorage.get(),
  coursesListRegister: coursesListRegisterStorage.get(),
};

const coursesSlice = createSlice({
  name: "coursesSlice",
  initialState,
  reducers: {
    setCoursesListWishList: (state, action) => {
      let newCoursesListWishList = [...state.coursesListWishList];
      const index = newCoursesListWishList.findIndex(course => course.class_id === action.payload.class_id);
      if (index === -1) {
        newCoursesListWishList.push(action.payload);
        message.success("Đã thêm môn học vào danh sách yêu thích!");
      } else {
        newCoursesListWishList.splice(index, 1);
        message.success("Đã xóa môn học khỏi danh sách yêu thích!");
      }
      state.coursesListWishList = newCoursesListWishList;
      wishListStorage.set(newCoursesListWishList);
    },
    // đăng kí ghi danh , danh sách khóa học
    setRegisterCoursesList: (state, action) => {
      let newCoursesListRegister = [...state.coursesListRegister];
      let index = newCoursesListRegister.findIndex((course) => {
        return course.maKhoaHoc === action.payload.maKhoaHoc;
      });
      if (index === -1) {
        let newCourseRegister = {
          ...action.payload,
          giaHienTai: 16999000,
          giaKhuyenMai: 15999000,
        };
        newCoursesListRegister.push(newCourseRegister);
        state.coursesListRegister = newCoursesListRegister;
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Đã xóa ${index}`,
          showConfirmButton: false,
          timer: 1500,
        });
        newCoursesListRegister.splice(index, 1);
        state.coursesListRegister = newCoursesListRegister;
      }
      coursesListRegisterStorage.set(newCoursesListRegister);
    },
    // hủy ghi danh
    // setDeleteCoursesListRegister: (state, action) => {
    //   let newCoursesListRegister = [...state.coursesListRegister];
    //   let index = newCoursesListRegister.findIndex((course) => {
    //     return course.maKhoaHoc === action.payload.maKhoaHoc;
    //   });
    //   if (index !== -1) {
    //     newCoursesListRegister.splice(index, 1);
    //     state.coursesListRegister = newCoursesListRegister;
    //     Swal.fire({
    //       position: "center",
    //       icon: "success",
    //       title: "Đã xóa môn học khỏi giỏ hàng!",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   }
    //   coursesListRegisterStorage.set(newCoursesListRegister);
    // },


    setCourseAddToCart: (state, action) => {
      let newCourseAddToCart = [...state.coursesListRegister];
      let index = newCourseAddToCart.findIndex(course => course.class_id === action.payload.class_id);
      if (index === -1) {
        let courseAddToCart = {
          ...action.payload
        };
        newCourseAddToCart.push(courseAddToCart);
        state.coursesListRegister = newCourseAddToCart;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đã thêm môn học vào giỏ hàng!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Môn học đã có trong giỏ hàng!",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      coursesListRegisterStorage.set(newCourseAddToCart);
    },
    // hủy setCourseAddToCart
    setDeleteAddToCart: (state, action) => {
      let newCoursesListAddToCart = [...state.coursesListRegister];
      let index = newCoursesListAddToCart.findIndex(course => course.class_id === action.payload.class_id);
      if (index !== -1) {
        newCoursesListAddToCart.splice(index, 1);
        state.coursesListRegister = newCoursesListAddToCart;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đã xóa môn học khỏi giỏ hàng!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      coursesListRegisterStorage.set(newCoursesListAddToCart);
    },
  },
});

export const {
  setCoursesListWishList,
  setRegisterCoursesList,
  setDeleteCoursesListRegister,
  setCourseAddToCart,
  setDeleteAddToCart,
} = coursesSlice.actions;

export default coursesSlice.reducer;
