import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import NavBar from "../HomePage/NavBar/NavBar";
import { UserService } from "../../services/UserService";

const regexPatterns = {
  number: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/,
  name: /^(?=.*[a-zA-Z]).{1,20}$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>/?]).{1,20}$/,
};

export default function UserProfile() {
  const [form] = Form.useForm();
  useEffect(() => {
    UserService.getMyInfor()
      .then(response => form.setFieldsValue(response.data))
      .catch(error => console.error(error));
  }, []);

  const onFinish = (values) => {
    const userProfile = { ...values, role: "hocVien" };
    UserService.putUserInfor(userProfile)
      .then(response => {
        form.setFieldsValue(response.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Profile updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => window.location.reload(), 600);
      })
      .catch(error => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error.data} Please try again`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (

          <div className="container-80 py-[105px]">
            <div className="relative flex flex-col justify-center overflow-hidden">
              <div className="w-full lg:mt-0 mt-10 p-6 m-auto bg-white rounded-md shadow-xl md:max-w-lg">
                <h1 className="text-3xl mt-4 font-semibold text-center text-black">Update Profile</h1>
                <Form
                  className="mt-6"
                  name="basic"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  form={form}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Full Name"
                    name="full_name"
                    rules={[
                      { required: true, message: "Please input your full name!" },
                      { pattern: regexPatterns.name, message: "Must have at least one letter & limit of 20 characters!" }
                    ]}
                  >
                    <Input className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { pattern: regexPatterns.email, message: "Email is invalid" }
                    ]}
                  >
                    <Input className="w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40" />
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    name="phone_number"
                    rules={[
                      { required: true, message: "Please input your phone number!" },
                      { pattern: regexPatterns.number, message: "Must be a valid phone number" }
                    ]}
                  >
                    <Input className="w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40" />
                  </Form.Item>
                  <Form.Item label="Address" name="address">
                    <Input className="w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40" />
                  </Form.Item>
                  <Form.Item className="mt-6">
                    <button type="submit" className="text-base w-full px-4 py-2 tracking-wide text-white font-bold transition-colors duration-200 transform bg-gradient-to-tl from-yellow-400 to-red-500 hover:from-red-500 hover:to-yellow-400 rounded-md focus:outline-none">
                      Update
                    </button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
  );
}
