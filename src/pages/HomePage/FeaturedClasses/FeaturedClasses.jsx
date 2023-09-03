import React, { useEffect, useState } from 'react'
import { CoursesService } from '../../../services/CoursesService'
import PopularCoureses from './PopularCoureses'
import { StarFilled} from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
export default function FeaturedClasses() {
  const [featureCourses, setFeatureCourses] = useState([])
  useEffect(() => { 
    CoursesService.getCoursesList()
    .then((res) => { 
      setFeatureCourses(res.data)
    })
    .catch((err) => { 
      console.log('err: ', err);console.log();
    })
  },[])
  const renderFeatureCourses = () => { 
    return featureCourses.slice(4,5).map((item, index) =>{
      return(
        <NavLink to={`/detail/${item.maKhoaHoc}`}>
          <div key={item.biDanh} className="grid grid-cols-12 gap-3 rounded-md bg-white shadow-sm cursor-pointer">
          <div className="img col-span-12 sm:col-span-4 rounded-md">
            <img className='w-full h-full object-cover rounded-md' src='./img/feaure1.jpg' alt={item.biDanh} />
          </div>
          <div className="col-span-12 sm:col-span-8 p-2 sm:p-6">
            <p className='line-clamp-2 font-semibold md:leading-relaxed md:text-xl text-[#666666]'>{item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
            <p className='mt-2 md:block hidden text-[#666666] font-[300]'>{item.moTa.length > 80 ? item.moTa.slice(0,70) + '...' : item.moTa}</p>
            <p className='md:font-semibold font-light mt-1 sm:mt-3 text-[#666666]'>{item.nguoiTao.hoTen}</p>
            <p className='sm:hidden line-clamp-2 font-semibold md:leading-relaxed md:text-xl text-[#666666] flex items-center'>5.0 <StarFilled className='ml-1 text-yellow-500'/> <StarFilled  className='text-yellow-500'/> <StarFilled  className='text-yellow-500'/> <StarFilled  className='text-yellow-500'/> <StarFilled  className='text-yellow-500'/></p>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2 flex-wrap items-center text-sm pt-2 text-[#666666]">
                <p>13 hours</p>
                <p>·</p>
                <p>32 lectures</p>
              </div>
              <div className="text-lg font-semibold text-[#666666]">
                <p>$14.99</p>
              </div>
            </div>
          </div>
        </div>
        </NavLink>
      )
    })
   }
  return (
    <div className='lg:w-[80%] w-[90%] mx-auto py-3'>
      <div class="sm:my-4 my-3 flex items-end justify-between pt-3">
        <h2 class="text-2xl font-semibold">Featured Classes</h2> 
      </div>
      <div className="pl-3">
        {renderFeatureCourses()}
      </div>
      <PopularCoureses />
    </div>
  )
}
