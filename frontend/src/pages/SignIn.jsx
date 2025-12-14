import React from "react";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App.jsx";
import "../../src/index.css";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const payload = {
        email: email.trim(),
        password,
      };
      if (
        !payload.email ||
        !payload.password
      ) {
        console.log("Signup error:", "All fields are required");
        return;
      }
      if (payload.password.length < 6) {
        console.log(
          "Signup error:",
          "Password must be at least 6 characters long."
        );
        return;
      }
      console.log("Signup payload:", payload);
      const result = await axios.post(`${ServerUrl}/api/auth/signin`, payload, {
        withCredentials: true,
      });
      console.log("Signup success:", result.data);
    } catch (error) {
      console.log("Signup error:", error.response?.data || error.message);
    }
  };
  return (
    <>
      <div
        className="min-h-screen w-full flex items-center justify-center p-4"
        style={{ backgroundColor: "var(--BgColor)" }}
      >
        <div
          className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border"
          style={{ borderColor: "var(--BorderColor)" }}
        >
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--PrimaryColor)" }}
          >
            KhaneWalaBazzar
          </h2>

          <p className="text-gray mb-8">
            Create your account to get started with delicious food deliveries
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>

            <input
              type="text"
              id="email"
              placeholder="Enter your Email"
              className="
                w-full border border-gray-300 rounded-lg px-3 py-2 
                focus:outline-none 
                focus:border-[var(--PrimaryColor)]"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your Password"
                className="
                w-full border border-gray-300 rounded-lg px-3 py-2 
                focus:outline-none 
                focus:border-[var(--PrimaryColor)]"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                className="absolute right-3 top-[14px] text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>

            <div className="text-right mt-2 text-[var(--PrimaryColor)] font-bold cursor-pointer hover:underline" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </div>

          </div>

          {/* Sign Up Button */}
          <div className="mt-6">
            <button
              onClick={handleSignIn}
              className="w-full bg-[var(--PrimaryColor)] text-white rounded-lg px-4 py-2 font-semibold transition cursor-pointer hover:bg-[var(--HoverColor)]"
            >
              Sign Up
            </button>

            <button className="w-full mt-4 border border-[var(--BorderColor)] rounded-lg px-4 py-2 font-semibold transition cursor-pointer hover:bg-gray-100 flex items-center justify-center gap-2">
              <FcGoogle size={20} />
              Sign In with Google
            </button>

            <div className="text-center mt-4"></div>
            <p className="text-gray-600">
              Want to create new account?{" "}
              <span
                onClick={() => navigate("/signup")}
                href="/signup"
                className="text-[var(--PrimaryColor)] font-semibold cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
