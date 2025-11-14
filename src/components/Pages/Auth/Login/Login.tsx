/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import { Form, Checkbox, message } from "antd";
import { useRouter } from "next/navigation";
import InputComponent from "@/components/UI/InputComponent";
import login from '@/assets/Authentication/login.png'
import Image from "next/image";
import { LoginFormValues } from "@/types/types";


const Login: React.FC = () => {
  const router = useRouter();
  
  const onFinish = (values: LoginFormValues) => {
    console.log("Login Data: ", values);
    message.success("Logged in successfully");
    router.push("/");
  };

  return (
    <section className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
        {/* Left side - Image */}
        <div className="hidden  md:block">
          <Image 
            src={login} 
            alt="Login illustration" 
            className="w-full h-screen"
            priority
          />
        </div>

        {/* Right side - Form */}
        <div className="">
          <div className="px-6 md:py-8 md:px-8 lg:px-10 mt-5 md:mt-0">
            <h2 className="text-xl md:text-2xl font-semibold  text-center">
              Log in to your account
            </h2>
            <p className="text-center pb-5 text-gray-300 text-sm">
              Start managing your tasks efficiently
            </p>
            
            <Form
              layout="vertical"
              onFinish={onFinish}
              className="space-y-3"
            >
              <Form.Item
                label={<span className="">Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <InputComponent  placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label={<span className="">Password</span>}
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <InputComponent 
                  placeholder="Enter your password" 
         
                  isPassword={true} 
                />
              </Form.Item>

              <div className="flex justify-between items-center ">
                <Form.Item name="remember" valuePropName="checked" className="mb-0">
                  <Checkbox className="">Remember me</Checkbox>
                </Form.Item>
                <Link
                  href="/forgot-password"
                  className="text-[#5272FF] hover:underline text-sm"
                >
                  Forgot your password?
                </Link>
              </div>

              <button 
                type="submit"
                className="w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded  font-medium mt-4"
              >
                Log In
              </button>
            </Form>

            <div className="mt-4 text-center">
              <span className="text-gray-700">
                Don't have an account? 
              </span>
              <Link
                href="/register"
                className="text-[#5272FF] font-semibold hover:underline ml-1"
              >
                Register now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;