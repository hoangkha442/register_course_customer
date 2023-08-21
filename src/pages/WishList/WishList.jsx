import React from "react";
import { useSelector } from "react-redux";
import { Button, Card, Pagination } from "antd";
import { NavLink } from "react-router-dom";
import NavBar from "../HomePage/NavBar/NavBar";
const { Meta } = Card;

export default function WishList() {
  const coursesWishLish = useSelector((state) => {
      return state.coursesSlice.coursesListWishList;
  });
    console.log('coursesWishLish: ', coursesWishLish);
  const renderWishList = () => { 
    return coursesWishLish.map((item, index) => { 
        return(
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
                  src={ item?.hinhAnh}
                  alt="img"
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
    <div className="">
      <div className='h-max-content min-h-screen w-full bg-cover bg-white flex overflow-hidden'>
      <div className="pt-[70px] fixed h-screen top-0 w-[20%] bg-white flex-shrink-0  border-r border-r-[#e5e7eb]">
        <NavBar />
      </div>
      <div className="min-h-screen w-[80%] ml-auto">
      <div className='py-[105px]'>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 container-90">
            {renderWishList()}
        </div>
    </div>   
     </div>
      
    </div>
    {/* <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 container-90 pt-[70px]">
        <div className="">
            {renderWishList()}
        </div>
    </div> */}
    </div>
  )
}
