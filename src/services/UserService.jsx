import { https } from "./Config";
export const UserService = {
  postLogin: (data) => {
    return https.post("/api/QuanLyNguoiDung/DangNhap", data);
  },
  postRegister: (data) => {
    return https.post("/api/QuanLyNguoiDung/DangKy", data);
  },
  postUserInfor: (data) => {
    return https.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan", data);
  },
  putUserInfor: (data) => {
    return https.put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
  }
}

