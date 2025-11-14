/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import InputComponent from "@/components/UI/InputComponent";
import Register from "@/assets/Authentication/image.png";
import Image from "next/image";
import { RegisterFormValues } from "@/types/types";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import Swal from "sweetalert2";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [NewAccount] = useRegisterMutation();
  const onFinish = async (values: RegisterFormValues) => {
    const formData = new FormData();
    formData.append("first_name", values.firstName);
    formData.append("last_name", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    console.log("FormData:", formData);
    try {
      const res = await NewAccount(formData);
      console.log(res);
      if (res?.data?.first_name) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Account created successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error}`,
      });
    }
  };
  return (
    <section className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
        {/* Left side - Image */}
        <div className="hidden md:block bg-[#E8EEF7]">
          <Image
            src={Register}
            alt="Register illustration"
            className="w-full h-screen object-cover"
            priority
          />
        </div>

        {/* Right side - Form */}
        <div className="">
          <div className="px-6 md:py-8 md:px-8 lg:px-10 mt-5 md:mt-0 max-w-xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-center">
              Create your account
            </h2>
            <p className="text-center pb-5 text-gray-500 text-sm">
              Start managing your tasks efficiently.
            </p>

            <Form layout="vertical" onFinish={onFinish} className="space-y-3">
              {/* First Name and Last Name - Side by side */}
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  label={<span className="">First Name</span>}
                  name="firstName"
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                >
                  <InputComponent placeholder="First Name" />
                </Form.Item>

                <Form.Item
                  label={<span className="">Last Name</span>}
                  name="lastName"
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                >
                  <InputComponent placeholder="Last Name" />
                </Form.Item>
              </div>

              <Form.Item
                label={<span className="">Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <InputComponent placeholder="Email" />
              </Form.Item>

              <Form.Item
                label={<span className="">Password</span>}
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <InputComponent placeholder="Password" isPassword={true} />
              </Form.Item>

              <Form.Item
                label={<span className="">Confirm Password</span>}
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match")
                      );
                    },
                  }),
                ]}
              >
                <InputComponent
                  placeholder="Confirm Password"
                  isPassword={true}
                />
              </Form.Item>

              <button
                type="submit"
                className="w-full px-5 py-3 bg-[#5272FF] hover:bg-blue-700 transition-colors rounded font-medium mt-4 text-white"
              >
                Sign Up
              </button>
            </Form>

            <div className="mt-4 text-center">
              <span className="text-gray-700">Already have an account?</span>
              <Link
                href="/login"
                className="text-[#5272FF] font-semibold hover:underline ml-1"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
