import { https } from "./Config";
// CoursesService
export const CoursesService = {
  getCoursesList: () => {
    return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP15`);
  }
  ,getCoursesListPopular: () => {
    return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP15`);
  },
  getDetailCourses: (value) => {
    return https.get(`/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${value}`);
  },
  getCourseListPagination: (currentPage, sizePage) => {
    return https.get(
      `/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${currentPage}&pageSize=${sizePage}&MaNhom=GP15`
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
  },
  postCourses: (data) => {
    return https.post("/api/QuanLyKhoaHoc/ThemKhoaHoc", data);
  },
  postCoursesPicture: (data) => {
    return https.post('/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh', data);
  }
}

