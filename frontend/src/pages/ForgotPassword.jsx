import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App.jsx";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const result = await axios.post(
        `${ServerUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log(result);
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await axios.post(
        `${ServerUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result);
      setStep(3);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      return null;
    }

    try {
      const result = await axios.post(
        `${ServerUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      console.log(result);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="min-h-screen w-full flex items-center justify-center p-4"
        style={{ backgroundColor: "var(--BgColor)" }}
      >
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
          <div className="flex items-center gap-5 mb-5">
            <div className="cursor-pointer" onClick={() => navigate("/signin")}>
              <IoIosArrowRoundBack size={30} />
            </div>
            <h2 className="text-2xl font-bold text-center text-[var(--PrimaryColor)]">
              Forgot Password
            </h2>
          </div>

          {step == 1 && (
            <div>
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
              <button
                className="w-full bg-[var(--PrimaryColor)] text-white rounded-lg px-4 py-2 font-semibold transition cursor-pointer hover:bg-[var(--HoverColor)]"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            </div>
          )}

          {step == 2 && (
            <div>
              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Enter OTP
                </label>

                <input
                  type="text"
                  id="email"
                  placeholder="OTP"
                  className="
                w-full border border-gray-300 rounded-lg px-3 py-2 
                focus:outline-none 
                focus:border-[var(--PrimaryColor)]"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                />
              </div>
              <button
                className="w-full bg-[var(--PrimaryColor)] text-white rounded-lg px-4 py-2 font-semibold transition cursor-pointer hover:bg-[var(--HoverColor)]"
                onClick={handleVerifyOtp}
              >
                Verify
              </button>
            </div>
          )}

          {step == 3 && (
            <div>
              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  New Password
                </label>

                <input
                  type="password"
                  id="password"
                  placeholder="Enter New Password"
                  className="
                w-full border border-gray-300 rounded-lg px-3 py-2 
                focus:outline-none 
                focus:border-[var(--PrimaryColor)]"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />

                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="confirmpassword"
                >
                  Confirm Password
                </label>

                <input
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm Password"
                  className="
                w-full border border-gray-300 rounded-lg px-3 py-2 
                focus:outline-none 
                focus:border-[var(--PrimaryColor)]"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </div>

              <button
                className="w-full bg-[var(--PrimaryColor)] text-white rounded-lg px-4 py-2 font-semibold transition cursor-pointer hover:bg-[var(--HoverColor)]"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
