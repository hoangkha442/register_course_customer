import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserTemplate from "./Templates/UserTemplate/UserTemplate";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import WishList from "./pages/WishList/WishList";
import CourseListPage from "./pages/CourseListPage/CourseListPage";
import CheckOut from "./pages/CheckOut/CheckOut";
import UserProfile from "./pages/UserProfile/UserProfile";
import Search from "./pages/Search/Search";
import CoursesOnCategory from "./pages/HomePage/Categories/CoursesOnCategory";
import Spinner from "./components/Spinner/Spinner";
import UserCourses from "./pages/UserCourses.jsx/UserCourses";

function App() {
  return (
    <div>
      <Spinner />
      <Router>
        <Routes>
          <Route path="/" element={<UserTemplate />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/course-list" element={<CourseListPage />} />
            <Route path="/wish-list" element={<WishList />} />
            <Route path="/check-out" element={<CheckOut />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/user-courses" element={<UserCourses />} />
            <Route
              path="/caterogy/:tenMonHoc"
              element={<CoursesOnCategory />}
            />
          </Route>
        </Routes>
        {/* ADMIN  */}
      </Router>
    </div>
  );
}

export default App;
