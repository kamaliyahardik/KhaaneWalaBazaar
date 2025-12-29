import React from "react";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App.jsx";
import "../../src/index.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.js";
import ClipLoader from "react-spinners/ClipLoader";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading,setLoading] = useState(false);

  const getErrorMessage = (error) => {
    if (typeof error === "string") return error;

    const firebaseCode = error?.code;
    if (firebaseCode === "auth/popup-closed-by-user") {
      return "Popup closed. Please try again.";
    }
    if (firebaseCode === "auth/cancelled-popup-request") {
      return "Popup cancelled. Please try again.";
    }
    if (firebaseCode === "auth/configuration-not-found") {
      return "Firebase configuration not found. Please check your Firebase config.";
    }

    return (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Something went wrong. Please try again."
    );
  };

  const handleSignUp = async () => {
    setLoading(true)
    try {
      setErr("");
      const payload = {
        fullName: fullname.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        password,
        role,
      };
      if (
        !payload.fullName ||
        !payload.email ||
        !payload.mobile ||
        !payload.password
      ) {
        setErr("All fields are required.");
        return;
      }
      if (payload.password.length < 6) {
        setErr("Password must be at least 6 characters long.");
        return;
      }
      if (payload.mobile.length < 10) {
        setErr("Mobile number must be at least 10 digits long.");
        return;
      }
      await axios.post(`${ServerUrl}/api/auth/signup`, payload, {
        withCredentials: true,
      });
      setErr("");
      setLoading(false);
    } catch (error) {
      setErr(getErrorMessage(error));
      setLoading(false)
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setErr("");
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setErr("");
    } catch (error) {
      setErr(getErrorMessage(error));
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

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="fullname">
              Full Name
            </label>

            <input
              type="text"
              id="fullname"
              placeholder="Enter your Full name"
              className="
                w-full border border-gray-300 rounded-lg px-3 py-2 
                focus:outline-none 
                `focus:border-[var(--PrimaryColor)]`"
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
              required
            />
          </div>

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
                `focus:border-[var(--PrimaryColor)]`"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="mobile">
              Mobile
            </label>

            <input
              type="text"
              id="mobile"
              placeholder="Enter your Mobile Number"
              className="
                w-full border border-gray-300 rounded-lg px-3 py-2 
                focus:outline-none 
                `focus:border-[var(--PrimaryColor)]`"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              required
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
                required
              />
              <button
                className="absolute right-3 top-[14px] text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>

          {/* role */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="role">
              Role
            </label>

            <div className="flex gap-2">
              {["user", "owner", "deliveryboy"].map((r) => (
                <button
                  key={r}
                  className="flex-1 border rounded-lg px-3 py-2 font-medium cursor-pointer"
                  onClick={() => setRole(r)}
                  style={
                    role === r
                      ? {
                          backgroundColor: "var(--PrimaryColor)",
                          color: "white",
                          borderColor: "var(--PrimaryColor)",
                        }
                      : {
                          borderColor: "var(--BorderColor)",
                          color: "var(--PrimaryColor)",
                        }
                  }
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Sign Up Button */}
          <div className="mt-6">
            <button
              onClick={handleSignUp}
              className="w-full bg-[var(--PrimaryColor)] text-white rounded-lg px-4 py-2 font-semibold transition cursor-pointer hover:bg-[var(--HoverColor)]"
            disabled={loading} >
            {loading? <ClipLoader size={20} />: "Sign up"}
            </button>

            <button
              className="w-full mt-4 border border-[var(--BorderColor)] rounded-lg px-4 py-2 font-semibold transition cursor-pointer hover:bg-gray-100 flex items-center justify-center gap-2"
              onClick={handleGoogleAuth}
            >
              <FcGoogle size={20} />
              Sign Up with Google
            </button>

            <div className="text-center mt-4"></div>
            {err ? (
              <p
                className="mt-3 text-sm"
                style={{ color: "var(--PrimaryColor)" }}
              >
                {err}
              </p>
            ) : null}
            <p className="text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/signin")}
                href="/signin"
                className="text-[var(--PrimaryColor)] font-semibold cursor-pointer"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
