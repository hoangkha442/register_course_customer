const USER_LOCAL = "USER_LOCAL";
const COURSES_LIST_REGISTER = "COURSES_LIST_REGISTER";
const WISHLIST = "WISHLIST";

// đặt 1 key dung chung để setItem
export const userLocalStorage = {
  set: (userData) => {
    // convert dữ liệu từ Ob sang json
    let userJSON = JSON.stringify(userData);
    // lưu xuống local
    localStorage.setItem(USER_LOCAL, userJSON);
  },
  get: () => {
    //lấy dữ liệu lên
    let userJSON = localStorage.getItem(USER_LOCAL);
    if (userJSON) {
      return JSON.parse(userJSON);
    } else {
      return null;
    }
  },
  remove: () => {
    localStorage.removeItem(USER_LOCAL);
  },
};

export const coursesListRegisterStorage = {
  set: (coursesData) => {
    // convert dữ liệu từ Ob sang json
    let coursesListRegisterJSON = JSON.stringify(coursesData);
    // lưu xuống local
    localStorage.setItem(COURSES_LIST_REGISTER, coursesListRegisterJSON);
  },
  get: () => {
    //lấy dữ liệu lên
    let coursesListRegisterJSON = localStorage.getItem(COURSES_LIST_REGISTER);
    if (coursesListRegisterJSON) {
      return JSON.parse(coursesListRegisterJSON);
    } else {
      return [];
    }
  },
  remove: () => {
    localStorage.removeItem(COURSES_LIST_REGISTER);
  },
};

export const wishListStorage = {
  set: (coursesData) => {
    // convert dữ liệu từ Ob sang json
    let wishListJSON = JSON.stringify(coursesData);
    // lưu xuống local
    localStorage.setItem(WISHLIST, wishListJSON);
  },
  get: () => {
    //lấy dữ liệu lên
    let wishListJSON = localStorage.getItem(WISHLIST);
    if (wishListJSON) {
      return JSON.parse(wishListJSON);
    } else {
      return [];
    }
  },
  remove: () => {
    localStorage.removeItem(WISHLIST);
  },
};
