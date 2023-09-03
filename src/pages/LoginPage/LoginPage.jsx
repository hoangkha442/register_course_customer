import { Form, Input, message } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserService } from '../../services/UserService';
import { setLogin } from '../../redux/userSlice';
import { userLocalStorage } from '../../services/LocalService';
import Swal from 'sweetalert2';
import NavBar from '../HomePage/NavBar/NavBar';
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
export default function LoginPage() {
  const onFinish = (values) => {
    UserService.postLogin(values)
    .then((res) => { 
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      // Đẩy data lên redux
      dispatch(setLogin(res.data)); 
      // lưu xuống localStorages => giữ trạng thái đăng nhập sau khi load trang
      userLocalStorage.set(res.data)
      setTimeout(() => {
        navigate('/')
        window.location.reload()
      },1000)
    })
    .catch((err) => { 
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to login",
        showConfirmButton: false,
        timer: 1500,
    });
      message.error('Login failed!')
    })
  };
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const user = useSelector((state) => { 
    return state.userSlice.userInfo
   })
   useEffect(() => { 
    if(user){
      navigate('/')
    }
    })
  return (
  <div className='relative h-max-content min-h-screen w-full bg-cover bg-white flex overflow-hidden'>
    <div className="absolute w-full h-full bg-[#e5e7eb]"></div>
      <div className="pt-[70px] fixed h-screen top-0 w-[20%] bg-white flex-shrink-0  border-r border-r-[#e5e7eb]">
        <NavBar />
      </div>
      <div className="min-h-screen w-[80%] ml-auto"> 
      <div className='py-[105px]'>
      <div className="relative flex flex-col justify-center overflow-hidden">
            <div className="w-full p-4 m-auto bg-white rounded-xl shadow-xl md:max-w-lg">
              <div className="flex items-center justify-center">
                <div className="h-14 w-14">
                  <img onClick={() => { 
                    navigate('/')
                   }} className='cursor-pointer object-cover w-full h-full' src="./img/logo_login.png" alt="hinhAnh" />
                </div>
              </div>
              <h1 className="text-3xl mt-4 font-semibold text-center text-black">
                Login to COURSEPLUS
              </h1>
              <Form className='mt-6'
                name="basic"
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                label="Account"
                  className='mb-2'
                  name="taiKhoan"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md "/>
                </Form.Item>
                <Form.Item
                  label="Password"
                  className='mb-2'
                  name="matKhau"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </Form.Item>

                  <Form.Item>
                    <p className='text-[#000000c0] text-[12px] mt-2 font-[500] transition-all duration-500 hover:text-[#f77259]'>Your continued use of this website means that you agree to our <span onClick={() => { 
                      message.error('This feature has not been implemented yet!')
                     }} className=' cursor-pointer underline'>terms of use</span>.</p>
                  </Form.Item>
                <Form.Item
                  className='mt-3'
                >
                  <button type='submit' className="font-[500] w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#f64a6e] rounded-md hover:bg-[#f77259] focus:outline-none focus:bg-[#f77259]">
                    Log in
                  </button>
                </Form.Item>
              </Form>
              <p className="mt-8 text-xs font-light text-center text-gray-700">
                Don't have an account?
                <NavLink
                  to="/register"
                  className="font-medium text-[#f64a6e] hover:underline ml-2"
                >
                  Sign up
                </NavLink>
              </p>
            </div>
          </div>
      </div>
    </div>
  </div>
  )
}
