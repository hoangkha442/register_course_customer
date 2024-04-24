import React from 'react';
import { Button, Checkbox, Form, Input, Select, message } from 'antd';
import "./Register.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserService } from '../../services/UserService';
import Swal from 'sweetalert2';
import NavBar from '../HomePage/NavBar/NavBar';

const { Option } = Select;

// Regex patterns for validation
const REGEX = {
  NUMBER: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/,
  NAME: /^(?=.*[a-zA-Z]).{1,20}$/,
  EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>/?]).{1,20}$/,
};

const onFinishFailed = (errorInfo) => {
  message.error('Registration failed. Please check your inputs.');
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await UserService.postRegister(values);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Register success',
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `${err.response.data} Please try again`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const inputStyle = 'w-full px-4 py-2 text-gray-900 bg-white border rounded-md';

  return (
    <div className="h-max-content min-h-screen w-full bg-cover bg-white flex overflow-hidden relative">
    <div className="absolute w-full h-full bg-[#e5e7eb]"></div>
    <div className="pt-[70px] lg:block hidden fixed h-screen top-0 w-[20%] bg-white flex-shrink-0  border-r border-r-[#e5e7eb]">
      <NavBar />
    </div>
    <div className="min-h-screen w-full lg:w-[80%] ml-auto">
      <div className="py-[90px]">
        <div className="container-80">
          <div className="relative flex flex-col justify-cente overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl md:max-w-lg">
              <div className="flex items-center justify-center">
                <div className="h-14 w-14">
                  <img
                    onClick={() => {
                      navigate("/");
                    }}
                    className="cursor-pointer object-cover w-full h-full"
                    src="./img/logo_login.png"
                    alt="hinhAnh"
                  />
                </div>
              </div>
              <h1 className="text-3xl mt-4 font-semibold text-center text-black">
                Register to COURSEPLUS
              </h1>
              <Form
                className="mt-6"
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
              label="Họ tên"
              name="full_name"
              rules={[
                { required: true, message: "Please enter your full name." },
                { pattern: REGEX.NAME, message: "Name must be between 1 and 20 letters." },
              ]}
            >
              <Input className={inputStyle} />
            </Form.Item>
                {/* Email */}
                <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email." },
                { pattern: REGEX.EMAIL, message: "Invalid email format." },
              ]}
            >
              <Input className={inputStyle} />
            </Form.Item>
                
                
                {/* Password  */}
                <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Please enter a password." },
                { pattern: REGEX.PASSWORD, message: "Password must include at least one number, one uppercase letter, one lowercase letter, and one special character." },
              ]}
            >
              <Input.Password className={inputStyle} />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone_number"
              rules={[
                { required: true, message: "Please enter your phone number." },
                { pattern: REGEX.NUMBER, message: "Invalid phone number." },
              ]}
            >
              <Input className={inputStyle} />
            </Form.Item>

                {/* BUTTON */}
                <Form.Item className="mt-6">
                  <button
                    type="submit"
                    className="font-[500] hover:text-gray-700 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#f64a6e] rounded-md hover:bg-[#f77259] focus:outline-none focus:bg-[#f77259]"
                  >
                    Register
                  </button>
                </Form.Item>
              </Form>

              <p className="mt-8 text-xs font-light text-center text-gray-700">
                Bạn đã có tài khoản?
                <NavLink
                  to="/login"
                  className="font-medium text-[#f64a6e] hover:underline ml-2">
                  Đăng nhập tại đây
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default RegisterPage;

