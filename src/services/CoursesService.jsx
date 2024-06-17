// CoursesService.js
import { https } from "./Config";

// CoursesService
export const CoursesService = {
  getCoursesList: () => {
    return https.get(`/class`);
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
  },
  getCourseOnCategory: () => {
    return https.get(`/class`)
  },

  // POST COURSE REGISTER
  postCoursesRegister: (data) => {
    return https.post('/course-registration', data);
  },
  postMultipleCoursesRegister: (data) => {
    return https.post('/course-registration/multiple', data);
  },
  deleteMultipleCartItems: (data) => {
    return https.delete('/cart/multiple', { data });
  }
}
