import { https } from "./Config";
export const UserService = {
  postLogin: (data) => {
    return https.post("/auth/login", data);
  },
  postRegister: (data) => {
    return https.post("/auth/signup", data);
  },
  postUserInfor: () => {
    return https.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
  },
  postUnsubcribeCourse: (data) => { 
    return https.post("/api/QuanLyKhoaHoc/HuyGhiDanh", data);
   }
  ,
  getMyInfor : () => { 
    return https.get('/user/my-info')
  },
  putUserInfor: (data) => {
    return https.put(`/user/update-profile`, data);
  },
  getUserListPagination: (currentPage, sizePage) => {
    return https.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=GP10&page=${currentPage}&pageSize=${sizePage}`
    );
  },
  deleteUser: (userName) => { 
    return https.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${userName}`)
   },

   // CART
  postCart: (data) => { 
    return https.post("/cart", data)
  },
  getCartByUserId: (userId) => {
    return https.get(`/cart/user/${userId}`)
  },
  deleteCartByID: (id) => {
    return https.delete(`/cart/${id}`)
  }
}

