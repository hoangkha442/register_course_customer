import { https } from "./Config";
// CoursesService
export const CoursesService = {
  getCoursesList: () => {
    return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP05`);
  }
  ,getCoursesListPopular: () => {
    return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`);
  },
  getDetailCourses: (id) => {
    return https.get(`/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`);
  },
  getCourseListPagination: (currentPage, sizePage) => {
    return https.get(
      `/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${currentPage}&pageSize=${sizePage}&MaNhom=GP01`
    );
  },
  getCategory: () => { 
    return https.get('/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc')
   }
  ,  
  getCourseOnCategory: (data) => { 
    return https.get(`/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${data}&MaNhom=GP01`)
   }
  ,
  postRegisterCourses: (data) => {
    return https.post("/api/QuanLyKhoaHoc/DangKyKhoaHoc", data);
  },
  postCancelCourses: (data) => {
    return https.post("/api/QuanLyKhoaHoc/HuyGhiDanh", data);
  }
}

