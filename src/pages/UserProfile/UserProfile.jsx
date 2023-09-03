import React, { useEffect, useState } from 'react'
import NavBar from '../HomePage/NavBar/NavBar'
import { Button, Checkbox, Form, Input, Select, message } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { UserService } from '../../services/UserService';
import { userLocalStorage } from '../../services/LocalService';

export default function UserProfile() {
  const navigate = useNavigate()
  const user = useSelector((state) => { 
    return state.userSlice.userInfo
  });
  const regexNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/;
  const regexName = /^(?=.*[a-zA-Z]).{1,20}$/;
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>/?]).{1,20}$/;
  const onFinish = (values) => {
    const userProfile = {...values,maLoaiNguoiDung: 'GV',
    maNhom: "GP01", taiKhoan: user.taiKhoan}
    UserService.putUserInfor(userProfile)
        .then((res) => {
          navigate('/login');
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Update Success",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => { 
            window.location.reload();
            userLocalStorage.remove()
          })
        })
        .catch((err) => {
          console.log('err: ', err);
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${err.response.data} please try again !`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='h-max-content min-h-screen w-full bg-cover bg-white flex overflow-hidden relative'>
        <div className="absolute w-full h-full bg-[#e5e7eb]"></div>
          <div className="pt-[70px] lg:block hidden fixed h-screen top-0 w-[20%] bg-white flex-shrink-0  border-r border-r-[#e5e7eb]">
            <NavBar />
          </div>
          <div className="min-h-screen lg:w-[80%] w-full ml-auto"> 
            <div className='py-[90px]'>
            <div className="container-80">
              <div className="relative flex flex-col justify-cente overflow-hidden">
                <div className="w-full lg:mt-0 mt-10 p-6 m-auto bg-white rounded-md shadow-xl md:max-w-lg">
                  <h1 className="text-3xl mt-4 font-semibold text-center text-black">
                    Profile & Settings
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
                    {/* UserName */}
                    <Form.Item
                      label="USERNAME"
                      className='mb-2'
                      name="taiKhoan"
                    >
                      <Input disabled placeholder={user.taiKhoan} className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md "/>
                    </Form.Item>
                    <Form.Item
                      label="FullName"
                      className='mb-2'
                      name="hoTen"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your FullName!',
                        },
                        {
                          pattern: regexName,
                          message: 'Must have at least one letter & limit of 20 words!',
                        }
                      ]}
                    >
                      <Input placeholder={user.hoTen} className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md "/>
                    </Form.Item>
                    
                    {/* Password  */}
                    <Form.Item
                      label="Password"
                      className='mb-2'
                      name="matKhau"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                        {
                          pattern: regexPassword,
                          message: 'Must contain at least one digit, both uppercase and lowercase letters, a special character, and must not exceed 20 characters',
                        }
                      ]}
                    >
                      <Input.Password placeholder='**********' className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </Form.Item>
                    {/* Email  */}
                    <Form.Item
                      label="Email"
                      className='mb-2'
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your email!',
                        },
                        {
                          pattern: regexEmail,
                          message: 'Email invalidate',
                        }
                      ]}
                    >
                      <Input placeholder={user.email} className="w-full px-4 py-2  bg-white border rounded-md  focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </Form.Item>
                    {/* Phone  */}
                    <Form.Item
                      label="Phone"
                      className='mb-2'
                      name="soDt"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your phone!',
                        },
                        {
                          pattern: regexNumber,
                          message: 'Must be a number',
                        }
                      ]}
                    >
                      <Input placeholder={user.soDT} className="w-full px-4 py-2  bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </Form.Item>
                    {/* Phone  */}
                    <Form.Item
                      label="maLoaiNguoiDung"
                      className='mb-2 hidden'
                      name="maLoaiNguoiDung"
                    >
                      <input value='hocVien' disabled className="w-full px-4 py-2 bg-white border rounded-md  focus:outline-none focus:ring focus:ring-opacity-40" />
                    </Form.Item>
                    {/* BUTTON */}
                    <Form.Item
                      className='mt-6'
                    >
                      <button type='submit' className=" text-base w-full px-4 py-2 tracking-wide text-white font-bold transition-colors duration-200 transform bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] hover:from-[#ef4444] hover:to-[#fcd34d] rounded-md  focus:outline-none">
                        Update
                      </button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
          </div>
            </div>
        </div>
    </div>
  )
}
