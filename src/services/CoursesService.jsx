import { https } from "./Config";

export const getCoursesList = () => {
  return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`);
};
export const getDetailCourses = (id) => {
  return https.get(`/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`);
};

export const getCourseListPagination = (currentPage, sizePage) => {
  return https.get(
    `/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${currentPage}&pageSize=${sizePage}&MaNhom=GP01`
  );
};
export const postRegisterCourses = (data) => {
  return https.post("/api/QuanLyKhoaHoc/DangKyKhoaHoc", data);
};
export const postCancelCourses = (data) => {
  return https.post("/api/QuanLyKhoaHoc/HuyGhiDanh", data);
};
