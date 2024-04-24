import { https } from "./Config";
// CoursesService
export const CoursesService = {
  getCoursesList: () => {
    return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP15`);
  },
  getClassWithMostRegistrations: () => { 
    return https.get('/class/most-registrations')
  },
  getCoursesListPopular: () => {
    return https.get(`/class/popular-classes`);
  },
  getDetailCourses: (value) => {
    return https.get(`/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${value}`);
  },
  getCourseListPagination: (currentPage, sizePage) => {
    return https.get(
      `/class/pagination?page=${currentPage}&pageSize=${sizePage}`
    );
  },
  getCategorySubject: () => { 
    return https.get('/subject')
  }
  ,  
  getCourseOnCategory: () => { 
    return https.get(`/class`)
   }
  ,
  postRegisterCourses: (data) => {
    return https.post("/api/QuanLyKhoaHoc/DangKyKhoaHoc", data);
  },
  postCancelCourses: (data) => {
    return https.post("/api/QuanLyKhoaHoc/HuyGhiDanh", data);
  }
  ,
  postCourses: (data) => {
    return https.post("/api/QuanLyKhoaHoc/ThemKhoaHoc", data);
  },
  postCoursesPicture: (data) => {
    return https.post('/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh', data);
  }
}

