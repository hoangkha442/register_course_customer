import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import NavBar from '../HomePage/NavBar/NavBar'
import { CoursesService } from '../../services/CoursesService'
import { StarOutlined, StarFilled, StarTwoTone, UsergroupAddOutlined, PlayCircleOutlined, KeyOutlined, DownloadOutlined, QuestionCircleOutlined, SafetyCertificateOutlined, CheckOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'
import { setCourseAddToCart } from '../../redux/coursesSlice'

export default function DetailPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {id} = useParams()
    const [detailCourse, setDetailCourse] = useState()
    console.log('detailCourse: ', detailCourse);
    useEffect(() => { 
        CoursesService.getDetailCourses(id)
        .then((res) => { 
            console.log('res: ', res);
            setDetailCourse(res.data)
        })
        .catch((err) => { 
            console.log('err: ', err);
        })
    },[id])
    const user = useSelector((state) => { 
        return state.userSlice.userInfo
    })
    const handleAddToCart = () => {
        if (user) {
          CoursesService.postRegisterCourses({
            maKhoaHoc: detailCourse.maKhoaHoc,
            taiKhoan: user.taiKhoan,
          })
            .then((res) => {
              dispatch(setCourseAddToCart(detailCourse));
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Added course to cart",
                showConfirmButton: false,
                timer: 1000,
              });
            })
            .catch((err) => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "The course is already in your cart",
                showConfirmButton: false,
                timer: 1000,
              });
            });
        } else {
          navigate("/login");
        }
      };
  return (
    <div className='grid grid-cols-12 overflow-hidden bg-[#f9fafb]'>
      <div className="col-span-2 lg:block hidden pt-[70px] bg-[#f9fafb] fixed top-0 w-[20%] border-r border-r-[#e5e7eb]">
        <NavBar />
      </div>
      <div className="col-span-12 border-l border-l-[#e5e7eb]">
      <div className='pt-[105px] lg:ml-[20%] ml-0'>
        {user ? 
        <div className='lg:px-20 px-10 pb-[70px]'>
        <div className="bg-blue-600 md:rounded-b-lg md:-mt-8 md:pb-8 md:pt-12 p-8 z-10 relative overflow-hidden" style={{background: '#1877f2'}}>
            <div class="lg:w-9/12 relative z-20">
                <div class="uppercase text-gray-200 mb-2 font-semibold text-sm">{detailCourse?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</div>
                        <h1 class="lg:leading-10 lg:text-3xl text-white text-2xl leading-8 font-semibold">The Complete {detailCourse?.tenKhoaHoc} From beginning to Experts for advance</h1>
                        <ul class="flex text-gray-200 gap-4 mt-4 mb-2">
                            <li class="flex items-center">
                                <span class=" bg-yellow-500 mr-2 px-2 rounded text-white font-semiold"> 5.0 </span>
                                <div class="text-yellow-400 flex items-center">
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                </div>
                            </li>
                            <li><div className="flex items-center">
                            <UsergroupAddOutlined /> {detailCourse?.luotXem} Enerolled </div></li>
                        </ul>
                        <ul class="lg:flex items-center text-gray-200">
                            <li> Created by <a href="#" class="text-white fond-bold hover:underline hover:text-white"> {detailCourse?.nguoiTao.hoTen} </a> </li>
                            <li> <span class="lg:block hidden mx-3 text-2xl">·</span> </li>
                            <li> Last updated {detailCourse?.ngayTao}</li>
                        </ul>
                    <img src="/img/course-intro.png" alt="hinhAnh" className='-top-24 absolute -right-72 z-0 hidden lg:block'/>
                    </div>
        </div>
        <div className="lg:flex lg:space-x-4 mt-4">
            <div className="lg:w-8/12 space-y-4">
                <div className="z-20 mb-4 overflow-hidden rounded-md border  bg-white">
                <nav className="">
                    <ul className=" flex items-center justify-between px-5 h-14 flex-wrap font-[600] text-[#8c8d90]">
                        <li className='text-center text-[#2a41e8] border-b-[3px] border-[#2a41e8] px-2 h-14'><a href="#Overview" className='leading-[55px]'>Overview</a></li>
                        <li className='text-center px-2 h-14 hover:text-[#2a41e8] transition-all'><a className='leading-[55px]' href="#curriculum">Curriculum</a></li> 
                        <li className='text-center px-2 h-14 hover:text-[#2a41e8] transition-all'><a className='leading-[55px]' href="#faq">FAQ</a></li>
                        <li className='text-center px-2 h-14 hover:text-[#2a41e8] transition-all'><a className='leading-[55px]' href="#announcement">Announcement</a></li>
                        <li className='text-center px-2 h-14 hover:text-[#2a41e8] transition-all'><a className='leading-[55px]' href="#reviews">Reviews</a></li>
                    </ul>
                </nav>
                </div>
                {/* course description */}
                <div className="p-6 border border-[#e5e7eb] rounded-md bg-white" id="Overview">
                <div className="space-y-7">
                    <div>
                        <h3 className="text-lg font-semibold mb-3"> Description </h3>
                        <p className='text-[#727374] text-[15px]'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                            tincidunt ut
                            laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim laoreet dolore magna
                            aliquam erat
                            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
                            lobortis
                            nisl ut aliquip ex ea commodo consequat
                        </p>
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold mb-3"> What You’ll Learn </h3>
                    <ul className="grid md:grid-cols-2 text-[#727374] text-[15px]">
                        <li className='flex items-center'> <CheckOutlined className='mr-2' />Setting up the environment</li>
                        <li className='flex items-center'> <CheckOutlined className='mr-2' />Advanced HTML Practices</li>
                        <li className='flex items-center'> <CheckOutlined className='mr-2' />Build a portfolio website</li>
                        <li className='flex items-center'> <CheckOutlined className='mr-2' />Responsive Designs</li>
                        <li className='flex items-center'> <CheckOutlined className='mr-2' />Understand HTML Programming</li>
                        <li className='flex items-center'> <CheckOutlined className='mr-2' />Code HTML</li>
                        <li className='flex items-center'> <CheckOutlined className='mr-2' />Start building beautiful websites</li>
                    </ul>
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold mb-3"> Requirements</h3>
                    <ul className="list-disc ml-5 space-y-1 mt-3 text-[#5e5e5e] text-[15px]">
                        <li>Any computer will work: Windows, macOS or Linux</li>
                        <li>Basic programming HTML and CSS.</li>
                        <li>Basic/Minimal understanding of JavaScript</li>
                    </ul>
                    </div>
                    <div>
                    <h3 className="font-medium text-lg mb-2"> Here is exactly what we cover in this course: </h3>
                    <p className='text-[#727374] text-[15px]'> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                        tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                        nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod
                        mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                        sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
                        wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                        aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
                </div>
                {/* course Curriculum */}
                <div id="curriculum">
                    <h3 className="mb-4 text-xl font-semibold"> Course Curriculum </h3>
                    <ul className="p-4 divide-y space-y-3 border border-[#e5e7eb] rounded-md bg-white">
                        <li className=''>
                        <div className="flex items-center justify-between">
                            <a className="text-[#585757] text-[15px] mx-2 font-semibold" href="#">  <div className="mb-1 text-sm font-medium"> Section 1 </div> <span className='text-black text-xl font-semibold'>Html Introduction</span> </a>
                            <div className="cursor-pointer">
                                <UpOutlined />
                            </div>
                        </div>
                        <div className="mt-3 text-base">
                            <ul className="course-curriculum-list font-medium text-[#727374] text-[15px]">
                                <li className="hover:bg-gray-200 hover:text-[#585757] transition-all duration-300 p-2 items-center flex rounded cursor-pointer font-medium">
                                <PlayCircleOutlined  className='mr-3'/>
                                Introduction <span className="text-sm ml-auto"> 4 min </span>
                                </li>
                                <li className="hover:bg-gray-200 p-2 hover:text-[#585757] transition-all duration-300 flex rounded items-center cursor-pointer">
                                    <PlayCircleOutlined  className='mr-3'/>
                                    What is HTML <span className="text-sm ml-auto"> 5 min </span>
                                </li>
                                <li className="hover:bg-gray-200 p-2 hover:text-[#585757] transition-all duration-300 flex rounded items-center cursor-pointer">
                                    <PlayCircleOutlined  className='mr-3'/>
                                    What is a Web page? <span className="text-sm ml-auto"> 8 min </span>
                                </li>
                                <li className="hover:bg-gray-200 p-2 hover:text-[#585757] transition-all duration-300 flex rounded items-center cursor-pointer">
                                    <PlayCircleOutlined  className='mr-3'/>
                                    Your First Web Page 
                                    <a href="#trailer-modal" className="bg-gray-200 ml-4 px-2 py-1 rounded-full text-xs"> Preview </a>
                                    <span className="text-sm ml-auto"> 4 min </span>
                                </li>
                                <li className="hover:bg-gray-200 p-2 hover:text-[#585757] transition-all duration-300 flex rounded items-center cursor-pointer">
                                    <PlayCircleOutlined  className='mr-3'/>
                                    Brain Streak <span className="text-sm ml-auto"> 5 min </span>
                                </li>
                            </ul>
                        </div>
                        </li>
                        <li className="pt-2">
                        <div className="flex items-center justify-between">
                            <a className="text-md mx-2 font-semibold text-[#585757]" href="#"> <div className="mb-1 text-sm font-medium"> Section 2 </div> Your First webpage</a>
                            <div className="cursor-pointer">
                                <DownOutlined />
                            </div>
                        </div>
                        </li>
                        <li className="pt-2">
                            <div className="flex items-center justify-between">
                                <a className="text-[#585757] text-md mx-2 font-semibold" href="#"> <div className="mb-1 text-sm font-medium"> Section 3 </div> Build Complete Webste</a>
                                <div className="cursor-pointer">
                                    <DownOutlined />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* course Faq */} 
                <div id="faq" className="p-5 border border-[#e5e7eb] rounded-md bg-white">
                <h3 className="text-lg font-semibold mb-3"> Course Faq </h3>
                <ul className="divide-y space-y-3">
                    <li className="bg-gray-100 px-4 py-3 rounded-md">
                    <a className="font-semibold text-base flex items-center justify-between" href="#"> Html Introduction  <DownOutlined /></a>
                    </li>
                    <li className="bg-gray-100 px-4 py-3 rounded-md">
                    <a className="font-semibold text-base flex items-center justify-between" href="#"> Your First webpage <DownOutlined /></a>
                    </li>
                    <li className="bg-gray-100 px-4 py-3 rounded-md">
                    <a className="font-semibold text-base flex items-center justify-between" href="#"> Some Special Tags  <DownOutlined /></a>
                    </li>
                    <li className="bg-gray-100 px-4 py-3 rounded-md">
                    <a className="font-semibold text-base flex items-center justify-between" href="#"> Html Introduction  <DownOutlined /></a>
                    </li>
                </ul>
                </div>
                {/* course Announcement */}
                <div id="announcement" className=" p-5  border border-[#e5e7eb] rounded-md bg-white">
                <h3 className="text-base font-semibold mb-3"> Announcement </h3>
                <div className="flex items-center gap-x-4 mb-5">
                    <img src="https://picsum.photos/200/300" alt className="rounded-full shadow w-12 h-12" />
                    <div>
                    <h4 className="-mb-1 text-base"> Stella Johnson</h4>
                    <span className="text-sm"> Instructor <span className="text-gray-500"> 1 year ago </span> </span>
                    </div>
                </div>
                <h4 className="leading-8 text-xl"> Nam liber tempor cum soluta nobis eleifend option congue imperdiet
                    doming id quod  .</h4>
                <p className='text-[#727374] text-[15px]'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                {/* course Reviews */}
                <div id="reviews" className=" p-5 bg-white border border-[#e5e7eb] rounded-md bg-whitep-5">
                <h3 className="text-lg font-semibold mb-3"> Reviews (98) </h3>
                <div className="flex space-x-5 mb-8">
                    <div className="lg:w-1/4 w-full">
                    <div className="bg-blue-100 space-y-1 py-5 rounded-md border border-blue-200 text-center shadow-xs">
                        <h1 className="text-5xl font-semibold">4.8</h1>
                        <div className="flex justify-center">
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#d1d5db]'/>
                        </div>
                        <h5 className="mb-0 mt-1 text-sm"> Course Rating</h5>
                    </div>
                    </div>
                    {/* progress */}
                    <div className="w-2/4 hidden lg:flex flex-col justify-center space-y-5">
                    <div className="w-full h-2.5 rounded-lg bg-gray-300 shadow-xs relative">
                        <div className="w-11/12 h-full rounded-lg bg-gray-800"> </div>
                    </div>
                    <div className="w-full h-2.5 rounded-lg bg-gray-300 shadow-xs relative">
                        <div className="w-4/5 h-full rounded-lg bg-gray-800"> </div>
                    </div>
                    <div className="w-full h-2.5 rounded-lg bg-gray-300 shadow-xs relative">
                        <div className="w-3/5 h-full rounded-lg bg-gray-800"> </div>
                    </div>
                    <div className="w-full h-2.5 rounded-lg bg-gray-300 shadow-xs relative">
                        <div className="w-3/6 h-full rounded-lg bg-gray-800"> </div>
                    </div>
                    <div className="w-full h-2.5 rounded-lg bg-gray-300 shadow-xs relative">
                        <div className="w-1/3 h-full rounded-lg bg-gray-800"> </div>
                    </div>
                    </div>
                    {/* stars */}
                    <div className="w-1/4 hidden lg:flex flex-col justify-center space-y-2">
                    <div className="flex justify-center items-center">
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                        <span className="ml-2"> 95 %</span>
                    </div>
                    <div className="flex justify-center items-center">
                            <StarFilled className='text-[#d1d5db]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                        <span className="ml-2"> 85 %</span>
                    </div>
                    <div className="flex justify-center items-center">
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#585757]'/>
                        <StarFilled className='text-[#585757]'/>
                        <StarFilled className='text-[#585757]'/>
                        <span className="ml-2"> 60 %</span>
                    </div>
                    <div className="flex justify-center items-center">
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#585757]'/>
                        <StarFilled className='text-[#585757]'/>
                        <span className="ml-2"> 50 %</span>
                    </div>
                    <div className="flex justify-center items-center">
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#585757]'/>
                        <span className="ml-2"> 35 %</span>
                    </div>
                    </div>
                </div>
                <div className="space-y-4 my-5">
                    <div className="bg-gray-50 border flex gap-x-4 p-4 relative rounded-md">
                    <img src="https://picsum.photos/200/300" alt className="rounded-full shadow w-10 h-10  shrink-0" />
                    <div className="flex justify-center items-center absolute right-5 top-6 space-x-1 text-yellow-500">
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled />

                    </div>
                    <div>
                        <h4 className="text-base m-0 font-semibold"> Stella Johnson</h4>
                        <span className="text-gray-700 text-sm"> 14th, August 2023 </span>
                        <p className="mt-3 md:ml-0 -ml-16 text-[#727374] text-[15px]">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam ut laoreet dolore
                        magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                        ullamcorper suscipit 
                        </p>
                    </div>
                    </div>
                    <div className="bg-gray-50 border flex gap-x-4 p-4 relative rounded-md">
                    <div className="flex justify-center items-center absolute right-5 top-6 space-x-1 text-yellow-500">
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled className='text-[#d1d5db]'/>
                    </div>
                    <img src="https://picsum.photos/200/300" alt className="rounded-full shadow w-10 h-10 shrink-0" />
                    <div>
                        <h4 className="text-base m-0 font-semibold"> Alex Dolgove</h4>
                        <span className="text-gray-700 text-sm"> 16th, May 2021 </span>
                        <p className="mt-3 md:ml-0 -ml-16 text-[#727374] text-[15px]">
                        elit, sed diam ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim ipsum dolor sit
                        amet, consectetuer adipiscing elit 
                        </p>
                    </div>
                    </div>
                    <div className="bg-gray-50 border flex gap-x-4 p-4 relative rounded-md lg:ml-16">
                    <div className="flex justify-center items-center absolute right-5 top-6 space-x-1 text-yellow-500">
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled className='text-[#d1d5db]'/>
                    </div>
                    <img src="https://picsum.photos/200/300" alt className="rounded-full shadow w-10 h-10 shrink-0" />
                    <div>
                        <h4 className="text-base m-0 font-semibold"> Trap Nation</h4>
                        <span className="text-gray-700 text-sm"> 16th, May 2021 </span>
                        <p className="mt-3 md:ml-0 -ml-16 text-[#727374] text-[15px]">
                        elit, sed diam ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim ipsum dolor sit
                        amet, consectetuer 
                        </p>
                    </div>
                    </div>
                </div>
                <div className="flex justify-center mt-9">
                    <a href="#" className="bg-gray-50 border hover:bg-gray-100 px-4 py-1.5 rounded-full text-sm">More Comments ..</a>
                </div>
                </div>
            </div>
            {/* course intro Sidebar */}
            <div className="lg:w-4/12 space-y-4 lg:mt-0 mt-4">
                <div className=''>
                    <div className="p-5  border border-[#e5e7eb] rounded-md bg-white"> 
                        <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-2 text-[#585757]">
                            <div className="text-3xl font-semibold"> 3.2 </div>
                            <div className='font-[500] text-[#8c8d90]'> Hours </div>
                        </div>
                        <div className="flex flex-col space-y-2 text-[#585757]">
                            <div className="text-3xl font-semibold"> 12,140</div>
                            <div className='font-[500] text-[#8c8d90]'> Students </div>
                        </div>
                        </div>
                        <hr className="-mx-5 border-gray-200 my-4" />
                        <h4 hidden> COURSE INCLUDES</h4>
                        <div className="-m-5 divide-y divide-gray-200 text-sm">
                            <div className="flex items-center px-5 py-3 text-[#727374] text-base">  <PlayCircleOutlined className='mr-3 text-[18px]'/> 13 hours on-demand video </div>
                            <div className="flex items-center px-5 py-3 text-[#727374] text-base">  <KeyOutlined className='mr-3 text-[18px]'/> Full lifetime access </div>
                            <div className="flex items-center px-5 py-3 text-[#727374] text-base">  <DownloadOutlined className='mr-3 text-[18px]'/> 42 downloadable resources </div>
                            <div className="flex items-center px-5 py-3 text-[#727374] text-base"> <QuestionCircleOutlined className='mr-3 text-[18px]'/>Assignments </div>
                            <div className="flex items-center px-5 py-3 text-[#727374] text-base">  <SafetyCertificateOutlined className='mr-3 text-[18px]'/>Certificate of Completion </div>
                        </div>
                    </div>
                <div
                onClick={() => {
                    handleAddToCart();
                  }}
                className="mt-4 cursor-pointer">
                    <a  className="flex items-center justify-center h-9 px-6 rounded-md bg-blue-600 text-white"> Add to Cart </a>
                </div>
                </div>
                <div className="p-5 border border-[#e5e7eb] rounded-md bg-white"> 
                    <div className="flex items-start justify-between">
                        <div>
                        <h4 className="text-lg -mb-0.5 font-semibold"> Related  Courses </h4>
                        </div>
                    </div>
                    <div className="p-1">
                        <a href="#" className="-mx-3 block hover:bg-gray-100 p-2 rounded-md">
                        <div className="flex items-center space-x-3">
                            <img src="/img/course-detail1.jpg" alt className="h-12 object-cover rounded-md w-12" />
                            <div className="line-clamp-2 text-sm font-medium">
                            The Complete JavaScript From beginning to Experts for advance
                            </div>
                        </div>
                        </a>
                        <a href="#" className="-mx-3 block hover:bg-gray-100 p-2 rounded-md">
                        <div className="flex items-center space-x-3">
                            <img src="/img/course-detail2.jpg" alt className="h-12 object-cover rounded-md w-12" />
                            <div className="line-clamp-2 text-sm font-medium"> 
                            The Complete JavaScript From beginning to Experts for advance
                            </div>
                        </div>
                        </a>
                        <a href="#" className="-mx-3 block hover:bg-gray-100 p-2 rounded-md">
                        <div className="flex items-center space-x-3">
                            <img src="/img/course-detail3.jpg" alt className="h-12 object-cover rounded-md w-12" />
                            <div className="line-clamp-2 text-sm font-medium"> 
                            The Complete JavaScript From beginning to Experts for advance
                            </div>
                        </div>
                        </a>
                    </div>
                    <a href="#" className="hover:bg-gray-100 -mb-1.5 mt-0.5 h-8 flex items-center justify-center rounded-md text-blue-400 text-sm"> 
                        See all 
                    </a>
                </div>
            </div>
        </div>

        </div>
        : <>
        <div className='container-80 pb-[70px]'>
        <div className="bg-blue-600 md:rounded-b-lg md:-mt-8 md:pb-8 md:pt-12 p-8 z-10 relative overflow-hidden" style={{background: '#1877f2'}}>
            <div class="lg:w-9/12 relative z-20">
                <div class="uppercase text-gray-200 mb-2 font-semibold text-sm">{detailCourse?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</div>
                        <h1 class="lg:leading-10 lg:text-3xl text-white text-2xl leading-8 font-semibold">The Complete {detailCourse?.tenKhoaHoc} From beginning to Experts for advance</h1>
                        <ul class="flex text-gray-200 gap-4 mt-4 mb-2">
                            <li class="flex items-center">
                                <span class=" bg-yellow-500 mr-2 px-2 rounded text-white font-semiold"> 5.0 </span>
                                <div class="text-yellow-400 flex items-center">
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                </div>
                            </li>
                            <li><div className="flex items-center">
                            <UsergroupAddOutlined /> {detailCourse?.luotXem} Enerolled </div></li>
                        </ul>
                        <ul class="lg:flex items-center text-gray-200">
                            <li> Created by <a href="#" class="text-white fond-bold hover:underline hover:text-white"> {detailCourse?.nguoiTao.hoTen} </a> </li>
                            <li> <span class="lg:block hidden mx-3 text-2xl">·</span> </li>
                            <li> Last updated {detailCourse?.ngayTao}</li>
                        </ul>
                    <img src="/img/course-intro.png" alt="hinhAnh" className='-top-24 absolute -right-72 z-0 hidden lg:block'/>
                    </div>
        </div>
        <div className="lg:flex lg:space-x-4 mt-4">
            <div className="lg:w-8/12 space-y-4">
                <div className="z-20 mb-4 overflow-hidden rounded-md border  bg-white">
                <nav className="">
                    <ul className=" flex items-center justify-between px-5 h-14 flex-wrap font-[600] text-[#8c8d90]">
                        <li className='text-center text-[#2a41e8] border-b-[3px] border-[#2a41e8] px-2 h-14'><a href="#Overview" className='leading-[55px]'>Overview</a></li>
                        <li className='text-center px-2 h-14 hover:text-[#2a41e8] transition-all'><a className='leading-[55px]' href="#curriculum">Curriculum</a></li> 
                        <li className='text-center px-2 h-14 hover:text-[#2a41e8] transition-all'><a className='leading-[55px]' href="#faq">FAQ</a></li>
                        <li className='text-center px-2 h-14 hover:text-[#2a41e8] transition-all'><a className='leading-[55px]' href="#announcement">Announcement</a></li>
                        <li className='text-center px-2 h-14 hover:text-[#2a41e8] transition-all'><a className='leading-[55px]' href="#reviews">Reviews</a></li>
                    </ul>
                </nav>
                </div>
                {/* course description */}
                <div className="p-6 border border-[#e5e7eb] rounded-md bg-white" id="Overview">
                <div className="space-y-7">
                    <div>
                        <h3 className="text-lg font-semibold mb-3"> Description </h3>
                        <p className='text-[#727374] text-[15px]'>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                            tincidunt ut
                            laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim laoreet dolore magna
                            aliquam erat
                            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
                            lobortis
                            nisl ut aliquip ex ea commodo consequat
                        </p>
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold mb-3"> What You’ll Learn </h3>
                    <ul className="grid md:grid-cols-2 text-[#727374] text-[15px]">
                        <li className='flex items-center'> <CheckOutlined className='mr-2' />Setting up the environment</li>
                        <li className='flex items-center'> <CheckOutlined className='mr-2' />Advanced HTML Practices</li>
                        <li className='flex items-center'> <CheckOutlined className='mr-2' />Build a portfolio website</li>
                        <li className='flex items-center'> <CheckOutlined className='mr-2' />Responsive Designs</li>
                        <li className='flex items-center'> <CheckOutlined className='mr-2' />Understand HTML Programming</li>
                        <li className='flex items-center'> <CheckOutlined className='mr-2' />Code HTML</li>
                        <li className='flex items-center'> <CheckOutlined className='mr-2' />Start building beautiful websites</li>
                    </ul>
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold mb-3"> Requirements</h3>
                    <ul className="list-disc ml-5 space-y-1 mt-3 text-[#5e5e5e] text-[15px]">
                        <li>Any computer will work: Windows, macOS or Linux</li>
                        <li>Basic programming HTML and CSS.</li>
                        <li>Basic/Minimal understanding of JavaScript</li>
                    </ul>
                    </div>
                    <div>
                    <h3 className="font-medium text-lg mb-2"> Here is exactly what we cover in this course: </h3>
                    <p className='text-[#727374] text-[15px]'> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                        tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                        nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod
                        mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                        sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
                        wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                        aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
                </div>
                {/* course Curriculum */}
                <div id="curriculum">
                    <h3 className="mb-4 text-xl font-semibold"> Course Curriculum </h3>
                    <ul className="p-4 divide-y space-y-3 border border-[#e5e7eb] rounded-md bg-white">
                        <li className=''>
                        <div className="flex items-center justify-between">
                            <a className="text-[#585757] text-[15px] mx-2 font-semibold" href="#">  <div className="mb-1 text-sm font-medium"> Section 1 </div> <span className='text-black text-xl font-semibold'>Html Introduction</span> </a>
                            <div className="cursor-pointer">
                                <UpOutlined />
                            </div>
                        </div>
                        <div className="mt-3 text-base">
                            <ul className="course-curriculum-list font-medium text-[#727374] text-[15px]">
                                <li className="hover:bg-gray-200 hover:text-[#585757] transition-all duration-300 p-2 items-center flex rounded cursor-pointer font-medium">
                                <PlayCircleOutlined  className='mr-3'/>
                                Introduction <span className="text-sm ml-auto"> 4 min </span>
                                </li>
                                <li className="hover:bg-gray-200 p-2 hover:text-[#585757] transition-all duration-300 flex rounded items-center cursor-pointer">
                                    <PlayCircleOutlined  className='mr-3'/>
                                    What is HTML <span className="text-sm ml-auto"> 5 min </span>
                                </li>
                                <li className="hover:bg-gray-200 p-2 hover:text-[#585757] transition-all duration-300 flex rounded items-center cursor-pointer">
                                    <PlayCircleOutlined  className='mr-3'/>
                                    What is a Web page? <span className="text-sm ml-auto"> 8 min </span>
                                </li>
                                <li className="hover:bg-gray-200 p-2 hover:text-[#585757] transition-all duration-300 flex rounded items-center cursor-pointer">
                                    <PlayCircleOutlined  className='mr-3'/>
                                    Your First Web Page 
                                    <a href="#trailer-modal" className="bg-gray-200 ml-4 px-2 py-1 rounded-full text-xs"> Preview </a>
                                    <span className="text-sm ml-auto"> 4 min </span>
                                </li>
                                <li className="hover:bg-gray-200 p-2 hover:text-[#585757] transition-all duration-300 flex rounded items-center cursor-pointer">
                                    <PlayCircleOutlined  className='mr-3'/>
                                    Brain Streak <span className="text-sm ml-auto"> 5 min </span>
                                </li>
                            </ul>
                        </div>
                        </li>
                        <li className="pt-2">
                        <div className="flex items-center justify-between">
                            <a className="text-md mx-2 font-semibold text-[#585757]" href="#"> <div className="mb-1 text-sm font-medium"> Section 2 </div> Your First webpage</a>
                            <div className="cursor-pointer">
                                <DownOutlined />
                            </div>
                        </div>
                        </li>
                        <li className="pt-2">
                            <div className="flex items-center justify-between">
                                <a className="text-[#585757] text-md mx-2 font-semibold" href="#"> <div className="mb-1 text-sm font-medium"> Section 3 </div> Build Complete Webste</a>
                                <div className="cursor-pointer">
                                    <DownOutlined />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* course Faq */} 
                <div id="faq" className="p-5 border border-[#e5e7eb] rounded-md bg-white">
                <h3 className="text-lg font-semibold mb-3"> Course Faq </h3>
                <ul className="divide-y space-y-3">
                    <li className="bg-gray-100 px-4 py-3 rounded-md">
                    <a className="font-semibold text-base flex items-center justify-between" href="#"> Html Introduction  <DownOutlined /></a>
                    </li>
                    <li className="bg-gray-100 px-4 py-3 rounded-md">
                    <a className="font-semibold text-base flex items-center justify-between" href="#"> Your First webpage <DownOutlined /></a>
                    </li>
                    <li className="bg-gray-100 px-4 py-3 rounded-md">
                    <a className="font-semibold text-base flex items-center justify-between" href="#"> Some Special Tags  <DownOutlined /></a>
                    </li>
                    <li className="bg-gray-100 px-4 py-3 rounded-md">
                    <a className="font-semibold text-base flex items-center justify-between" href="#"> Html Introduction  <DownOutlined /></a>
                    </li>
                </ul>
                </div>
                {/* course Announcement */}
                <div id="announcement" className=" p-5  border border-[#e5e7eb] rounded-md bg-white">
                <h3 className="text-base font-semibold mb-3"> Announcement </h3>
                <div className="flex items-center gap-x-4 mb-5">
                    <img src="https://picsum.photos/200/300" alt className="rounded-full shadow w-12 h-12" />
                    <div>
                    <h4 className="-mb-1 text-base"> Stella Johnson</h4>
                    <span className="text-sm"> Instructor <span className="text-gray-500"> 1 year ago </span> </span>
                    </div>
                </div>
                <h4 className="leading-8 text-xl"> Nam liber tempor cum soluta nobis eleifend option congue imperdiet
                    doming id quod  .</h4>
                <p className='text-[#727374] text-[15px]'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                {/* course Reviews */}
                <div id="reviews" className=" p-5 bg-white border border-[#e5e7eb] rounded-md bg-whitep-5">
                <h3 className="text-lg font-semibold mb-3"> Reviews (98) </h3>
                <div className="flex space-x-5 mb-8">
                    <div className="lg:w-1/4 w-full">
                    <div className="bg-blue-100 space-y-1 py-5 rounded-md border border-blue-200 text-center shadow-xs">
                        <h1 className="text-5xl font-semibold">4.8</h1>
                        <div className="flex justify-center">
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#d1d5db]'/>
                        </div>
                        <h5 className="mb-0 mt-1 text-sm"> Course Rating</h5>
                    </div>
                    </div>
                    {/* progress */}
                    <div className="w-2/4 hidden lg:flex flex-col justify-center space-y-5">
                    <div className="w-full h-2.5 rounded-lg bg-gray-300 shadow-xs relative">
                        <div className="w-11/12 h-full rounded-lg bg-gray-800"> </div>
                    </div>
                    <div className="w-full h-2.5 rounded-lg bg-gray-300 shadow-xs relative">
                        <div className="w-4/5 h-full rounded-lg bg-gray-800"> </div>
                    </div>
                    <div className="w-full h-2.5 rounded-lg bg-gray-300 shadow-xs relative">
                        <div className="w-3/5 h-full rounded-lg bg-gray-800"> </div>
                    </div>
                    <div className="w-full h-2.5 rounded-lg bg-gray-300 shadow-xs relative">
                        <div className="w-3/6 h-full rounded-lg bg-gray-800"> </div>
                    </div>
                    <div className="w-full h-2.5 rounded-lg bg-gray-300 shadow-xs relative">
                        <div className="w-1/3 h-full rounded-lg bg-gray-800"> </div>
                    </div>
                    </div>
                    {/* stars */}
                    <div className="w-1/4 hidden lg:flex flex-col justify-center space-y-2">
                    <div className="flex justify-center items-center">
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                        <span className="ml-2"> 95 %</span>
                    </div>
                    <div className="flex justify-center items-center">
                            <StarFilled className='text-[#d1d5db]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                            <StarFilled className='text-[#585757]'/>
                        <span className="ml-2"> 85 %</span>
                    </div>
                    <div className="flex justify-center items-center">
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#585757]'/>
                        <StarFilled className='text-[#585757]'/>
                        <StarFilled className='text-[#585757]'/>
                        <span className="ml-2"> 60 %</span>
                    </div>
                    <div className="flex justify-center items-center">
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#585757]'/>
                        <StarFilled className='text-[#585757]'/>
                        <span className="ml-2"> 50 %</span>
                    </div>
                    <div className="flex justify-center items-center">
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#d1d5db]'/>
                        <StarFilled className='text-[#585757]'/>
                        <span className="ml-2"> 35 %</span>
                    </div>
                    </div>
                </div>
                <div className="space-y-4 my-5">
                    <div className="bg-gray-50 border flex gap-x-4 p-4 relative rounded-md">
                    <img src="https://picsum.photos/200/300" alt className="rounded-full shadow w-10 h-10  shrink-0" />
                    <div className="flex justify-center items-center absolute right-5 top-6 space-x-1 text-yellow-500">
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled />

                    </div>
                    <div>
                        <h4 className="text-base m-0 font-semibold"> Stella Johnson</h4>
                        <span className="text-gray-700 text-sm"> 14th, August 2023 </span>
                        <p className="mt-3 md:ml-0 -ml-16 text-[#727374] text-[15px]">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam ut laoreet dolore
                        magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                        ullamcorper suscipit 
                        </p>
                    </div>
                    </div>
                    <div className="bg-gray-50 border flex gap-x-4 p-4 relative rounded-md">
                    <div className="flex justify-center items-center absolute right-5 top-6 space-x-1 text-yellow-500">
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled className='text-[#d1d5db]'/>
                    </div>
                    <img src="https://picsum.photos/200/300" alt className="rounded-full shadow w-10 h-10 shrink-0" />
                    <div>
                        <h4 className="text-base m-0 font-semibold"> Alex Dolgove</h4>
                        <span className="text-gray-700 text-sm"> 16th, May 2021 </span>
                        <p className="mt-3 md:ml-0 -ml-16 text-[#727374] text-[15px]">
                        elit, sed diam ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim ipsum dolor sit
                        amet, consectetuer adipiscing elit 
                        </p>
                    </div>
                    </div>
                    <div className="bg-gray-50 border flex gap-x-4 p-4 relative rounded-md lg:ml-16">
                    <div className="flex justify-center items-center absolute right-5 top-6 space-x-1 text-yellow-500">
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled/>
                        <StarFilled className='text-[#d1d5db]'/>
                    </div>
                    <img src="https://picsum.photos/200/300" alt className="rounded-full shadow w-10 h-10 shrink-0" />
                    <div>
                        <h4 className="text-base m-0 font-semibold"> Trap Nation</h4>
                        <span className="text-gray-700 text-sm"> 16th, May 2021 </span>
                        <p className="mt-3 md:ml-0 -ml-16 text-[#727374] text-[15px]">
                        elit, sed diam ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim ipsum dolor sit
                        amet, consectetuer 
                        </p>
                    </div>
                    </div>
                </div>
                <div className="flex justify-center mt-9">
                    <a href="#" className="bg-gray-50 border hover:bg-gray-100 px-4 py-1.5 rounded-full text-sm">More Comments ..</a>
                </div>
                </div>
            </div>
            {/* course intro Sidebar */}
            <div className="lg:w-4/12 space-y-4 lg:mt-0 mt-4">
                <div className=''>
                    <div className="p-5  border border-[#e5e7eb] rounded-md bg-white"> 
                        <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-2 text-[#585757]">
                            <div className="text-3xl font-semibold"> 3.2 </div>
                            <div className='font-[500] text-[#8c8d90]'> Hours </div>
                        </div>
                        <div className="flex flex-col space-y-2 text-[#585757]">
                            <div className="text-3xl font-semibold"> 12,140</div>
                            <div className='font-[500] text-[#8c8d90]'> Students </div>
                        </div>
                        </div>
                        <hr className="-mx-5 border-gray-200 my-4" />
                        <h4 hidden> COURSE INCLUDES</h4>
                        <div className="-m-5 divide-y divide-gray-200 text-sm">
                            <div className="flex items-center px-5 py-3 text-[#727374] text-base">  <PlayCircleOutlined className='mr-3 text-[18px]'/> 13 hours on-demand video </div>
                            <div className="flex items-center px-5 py-3 text-[#727374] text-base">  <KeyOutlined className='mr-3 text-[18px]'/> Full lifetime access </div>
                            <div className="flex items-center px-5 py-3 text-[#727374] text-base">  <DownloadOutlined className='mr-3 text-[18px]'/> 42 downloadable resources </div>
                            <div className="flex items-center px-5 py-3 text-[#727374] text-base"> <QuestionCircleOutlined className='mr-3 text-[18px]'/>Assignments </div>
                            <div className="flex items-center px-5 py-3 text-[#727374] text-base">  <SafetyCertificateOutlined className='mr-3 text-[18px]'/>Certificate of Completion </div>
                        </div>
                    </div>
                <div className="mt-4">
                    <NavLink to='/login'>
                        <a href="course-watch.html" className="flex items-center justify-center h-9 px-6 rounded-md bg-blue-600 text-white"> Enroll Now </a>
                    </NavLink>
                </div>
                </div>
                <div className="p-5 border border-[#e5e7eb] rounded-md bg-white"> 
                    <div className="flex items-start justify-between">
                        <div>
                        <h4 className="text-lg -mb-0.5 font-semibold"> Related  Courses </h4>
                        </div>
                    </div>
                    <div className="p-1">
                        <a href="#" className="-mx-3 block hover:bg-gray-100 p-2 rounded-md">
                        <div className="flex items-center space-x-3">
                            <img src="/img/course-detail1.jpg" alt className="h-12 object-cover rounded-md w-12" />
                            <div className="line-clamp-2 text-sm font-medium">
                            The Complete JavaScript From beginning to Experts for advance
                            </div>
                        </div>
                        </a>
                        <a href="#" className="-mx-3 block hover:bg-gray-100 p-2 rounded-md">
                        <div className="flex items-center space-x-3">
                            <img src="/img/course-detail2.jpg" alt className="h-12 object-cover rounded-md w-12" />
                            <div className="line-clamp-2 text-sm font-medium"> 
                            The Complete JavaScript From beginning to Experts for advance
                            </div>
                        </div>
                        </a>
                        <a href="#" className="-mx-3 block hover:bg-gray-100 p-2 rounded-md">
                        <div className="flex items-center space-x-3">
                            <img src="/img/course-detail3.jpg" alt className="h-12 object-cover rounded-md w-12" />
                            <div className="line-clamp-2 text-sm font-medium"> 
                            The Complete JavaScript From beginning to Experts for advance
                            </div>
                        </div>
                        </a>
                    </div>
                    <a href="#" className="hover:bg-gray-100 -mb-1.5 mt-0.5 h-8 flex items-center justify-center rounded-md text-blue-400 text-sm"> 
                        See all 
                    </a>
                </div>
            </div>
        </div>

        </div></>}
    </div>
      </div>
    </div>
    
  )
}
