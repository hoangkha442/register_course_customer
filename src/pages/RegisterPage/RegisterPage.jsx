import React from "react";
import { Button, Checkbox, Form, Input, Select, message } from "antd";
import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserService } from "../../services/UserService";
import Swal from "sweetalert2";
import NavBar from "../HomePage/NavBar/NavBar";

const { Option } = Select;
const onFinishFailed = (errorInfo) => {
  message.error(errorInfo);
};

export default function RegisterPage() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const regexNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/;
  const regexName = /^(?=.*[a-zA-Z]).{1,20}$/;
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>/?]).{1,20}$/;

  const onFinish = (values) => {
    console.log("values: ", values);
    UserService.postRegister(values)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${err.response.data} please try again`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const [form] = Form.useForm();
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
                  {/* Username */}
                  <Form.Item
                    label="FullName"
                    className="mb-2"
                    name="hoTen"
                    rules={[
                      {
                        required: true,
                        message: "Please input your FullName!",
                      },
                      {
                        pattern: regexName,
                        message:
                          "Must have at least one letter & limit of 20 words!",
                      },
                    ]}
                  >
                    <Input className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md " />
                  </Form.Item>
                  {/* Account */}
                  <Form.Item
                    label="USERNAME"
                    className="mb-2"
                    name="taiKhoan"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                      {
                        pattern: regexName,
                        message:
                          "Must have at least one letter & limit of 20 words!",
                      },
                    ]}
                  >
                    <Input className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md " />
                  </Form.Item>
                  {/* Password  */}
                  <Form.Item
                    label="Password"
                    className="mb-2"
                    name="matKhau"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      {
                        pattern: regexPassword,
                        message:
                          "Must contain at least one digit, both uppercase and lowercase letters, a special character, and must not exceed 20 characters",
                      },
                    ]}
                  >
                    <Input.Password className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </Form.Item>
                  {/* Email  */}
                  <Form.Item
                    label="Email"
                    className="mb-2"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                      {
                        pattern: regexEmail,
                        message: "Email invalidate",
                      },
                    ]}
                  >
                    <Input className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </Form.Item>
                  {/* Phone  */}
                  <Form.Item
                    label="Phone"
                    className="mb-2"
                    name="soDt"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone!",
                      },
                      {
                        pattern: regexNumber,
                        message: "Must be a number",
                      },
                    ]}
                  >
                    <Input className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </Form.Item>
                  {/* USERGROUP  */}
                  <Form.Item
                    name="maNhom"
                    label="ID Group"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select a option and change input text above"
                      allowClear
                    >
                      <Option value="GP01">GP01</Option>
                      <Option value="GP02">GP02</Option>
                      <Option value="GP03">GP03</Option>
                      <Option value="GP04">GP04</Option>
                      <Option value="GP05">GP05</Option>
                      <Option value="GP06">GP06</Option>
                      <Option value="GP07">GP07</Option>
                      <Option value="GP08">GP08</Option>
                    </Select>
                  </Form.Item>
                  {/* BUTTON */}
                  <Form.Item className="mt-6">
                    <button
                      type="submit"
                      className="font-[500] w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#f64a6e] rounded-md hover:bg-[#f77259] focus:outline-none focus:bg-[#f77259]"
                    >
                      Register
                    </button>
                  </Form.Item>
                </Form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                  Don't have an account?
                  <NavLink
                    to="/login"
                    className="font-medium text-[#f64a6e] hover:underline ml-2"
                  >
                    Log in
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
