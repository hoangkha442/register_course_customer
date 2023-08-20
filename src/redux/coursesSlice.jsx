import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import { coursesListRegisterStorage } from '../services/LocalService';

const initialState = {
  coursesListWishList: [],
  coursesListRegister: coursesListRegisterStorage.get(),
}

const coursesSlice = createSlice({
  name: 'coursesSlice',
  initialState,
  reducers: {
    setCoursesListWishList: (state, action) => {
      let newCoursesListWishList = [...state.coursesListWishList];
      const index = newCoursesListWishList.findIndex((course, index) => {
        return course.maKhoaHoc === action.payload.maKhoaHoc;
      });
      if (index == -1) {
        let newCourseWishList = { ...action.payload };
        newCoursesListWishList.push(newCourseWishList);
        message.success("Add From WishList");
        state.coursesListWishList = newCoursesListWishList;
      } else {
        newCoursesListWishList.splice(index, 1);
        message.success("Remove From WishList");
        state.coursesListWishList = newCoursesListWishList;
      }
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
          giaHienTai: 599,
          giaKhuyenMai: 399,
        };
        newCoursesListRegister.push(newCourseRegister);
        state.coursesListRegister = newCoursesListRegister;
      } else {
        newCoursesListRegister.splice(index, 1);
        state.coursesListRegister = newCoursesListRegister;
      }
      coursesListRegisterStorage.set(newCoursesListRegister);
    },
    // hủy ghi danh
    setDeleteCoursesListRegister: (state, action) => {
      let newCoursesListRegister = [...state.coursesListRegister];
      let index = newCoursesListRegister.findIndex((course) => {
        return course.maKhoaHoc === action.payload.maKhoaHoc;
      });

      if (index !== -1) {
        newCoursesListRegister.splice(index, 1);
        state.coursesListRegister = newCoursesListRegister;
      }
      coursesListRegisterStorage.set(newCoursesListRegister);
    },
    setCourseAddToCart: (state, action) => {
      let newCourseAddToCart = [...state.coursesListRegister];
      let index = newCourseAddToCart.findIndex((course) => {
        return course.maKhoaHoc === action.payload.maKhoaHoc;
      });
      if (index === -1) {
        let courseAddToCart = {
          ...action.payload,
          giaHienTai: 599,
          giaKhuyenMai: 399,
        };
        newCourseAddToCart.push(courseAddToCart);
        state.coursesListRegister = newCourseAddToCart;
      } else {
        return;
      }
      coursesListRegisterStorage.set(newCourseAddToCart);
    },
  }
});

export const {setCoursesListWishList, setRegisterCoursesList, setDeleteCoursesListRegister, setCourseAddToCart} = coursesSlice.actions

export default coursesSlice.reducer
