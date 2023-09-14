import { https } from "./Config";
export const UserService = {
  postLogin: (data) => {
    return https.post("/api/QuanLyNguoiDung/DangNhap", data);
  },
  postRegister: (data) => {
    return https.post("/api/QuanLyNguoiDung/DangKy", data);
  },
  postUserInfor: () => {
    return https.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
  },
  postUnsubcribeCourse: (data) => { 
    return https.post("/api/QuanLyKhoaHoc/HuyGhiDanh", data);
   }
  ,
  putUserInfor: (data) => {
    return https.put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
  },
  getUserListPagination: (currentPage, sizePage) => {
    return https.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=GP10&page=${currentPage}&pageSize=${sizePage}`
    );
  },
  deleteUser: (userName) => { 
    return https.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${userName}`)
   }
}

