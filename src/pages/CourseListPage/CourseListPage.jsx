import React, { useEffect, useState } from 'react'
import { CoursesService } from '../../services/CoursesService';
import { applyMiddleware } from 'redux';
import NavBar from '../HomePage/NavBar/NavBar';
import { Button, Card, Pagination } from "antd";
import { NavLink, useNavigate } from 'react-router-dom';
import './CourseListPage.css'
import ImageError from "../../asset/img/err.jpg";
import ImageError1 from "../../asset/img/err1.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { setCoursesListWishList } from '../../redux/coursesSlice';

const { Meta } = Card;
export default function CourseListPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [listCourses, setListCourses] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizeItem, setSizeItem] = useState(10);
  const [fallbackImage, setFallbackImage] = useState("");
  const onChange = (pageNumber, pageSize) => {
        setCurrentPage(pageNumber);
        setSizeItem(pageSize);
  };
    // Render CourseListPage
  useEffect(() => { 
        CoursesService.getCourseListPagination(currentPage,sizeItem)
        .then((res) => { 
          console.log('res: ', res.data);
          setListCourses(res.data)
        })
        .catch((err) => { 
          console.log('err: ', err);
        })
  },[currentPage, sizeItem])
  useEffect(() => { 
    
   }, [])
    // set ảnh lỗi sẽ loạt vào
  const handleErrorImage = () => {
    setFallbackImage(ImageError);
  };
  // dispatch courses wish list
  const user = useSelector((state) => { 
    return state.userSlice.userInfo
  })
  const handleDispatchCourseWishList = (item) => {
    if (user) {
      console.log('item: ', item);
      dispatch(setCoursesListWishList(item));
    } else {
      navigate('/login')
    }
  };
  const handleRenderListCourse = () => { 
    return listCourses?.items?.map((item) => { 
      return (
        <Card
          key={item?.maKhoaHoc}
          className="bg-[#233a50] border-none"
          hoverable
          cover={[
            <NavLink to={`/detail/${item?.maKhoaHoc}/#`}>
              <figure className="movie-item w-full hover:before:left-[125%] relative overflow-hidden cursor-pointer">
                {/* className="md:h-[200px] w-full object-center rounded" */}
                <img
                  className="w-full h-60 object-cover"
                  src={fallbackImage || item?.hinhAnh}
                  alt="product image"
                  onError={handleErrorImage}
                />
                <figcaption className="overlay absolute left-0 bottom-0 w-full h-[100%] opacity-0 bg-overlay hover:opacity-100 transition-all">
                  <div className="figcaption-btn w-[80%] h-[30%]">
                    <Button className="text-white border-none rounded-3xl bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] font-[500] uppercase flex items-center">
                      <span>Add to cart</span>
                      <i class="fa fa-angle-right ml-1 text-[10px] mt-[2px] font-bold"></i>
                    </Button>
                    <div className="mt-2">
                </div>
                  </div>
                </figcaption>
              </figure>
            </NavLink>,
          ]}
        >
          <Meta
            className=""
            title={
              item?.danhMucKhoaHoc?.tenDanhMucKhoaHoc
            }
            description={[
              <div>
                <div className='flex justify-between items-center text-[#727374]'>
                  <p className='font-[500]'>Like</p>
                  <div className=" hover:text-red-600 transition-all duration-300">
                    <i class="fa fa-heart text-xl" 
                    onClick={() => {
                      handleDispatchCourseWishList(item);
                    }} />
                  </div>
                </div>
              </div>
            ]}
            />
        </Card>
      )
      })
  }
  return (
    <div className='h-max-content min-h-screen w-full bg-cover bg-white flex overflow-hidden'>
      <div className="pt-[70px] fixed h-screen top-0 w-[20%] bg-white flex-shrink-0  border-r border-r-[#e5e7eb]">
        <NavBar />
      </div>
      <div className="min-h-screen w-[80%] ml-auto"> 
      <div className='py-[105px]'>
        <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-3 container-90">
            {handleRenderListCourse()}
        </div>
        <div className="mt-4 text-center">
            <Pagination
              defaultCurrent={1}
              current={currentPage}
              total={listCourses?.totalCount}
              onChange={onChange}
            />
          </div>
      </div>
      </div>
      
    </div>
   
  )
}
