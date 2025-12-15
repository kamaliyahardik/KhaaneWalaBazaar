import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const ForgotPassword = () => {
  const [step, setStep] = useState(3);
  const [email, setEmail] = useState("");
  const [otp,setOtp] = useState("");
  const [newPassword,setNewPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();

  return (
    <>
      <div
        className="min-h-screen w-full flex items-center justify-center p-4"
        style={{ backgroundColor: "var(--BgColor)" }}
      >
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
          <div className="flex items-center gap-5 mb-5">
            <IoIosArrowRoundBack size={30} />
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
              <button className="w-full bg-[var(--PrimaryColor)] text-white rounded-lg px-4 py-2 font-semibold transition cursor-pointer hover:bg-[var(--HoverColor)]">
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
              type="text"
              id="password"
              placeholder="Enter New Password"
              className="
                w-full border border-gray-300 rounded-lg px-3 py-2 
                focus:outline-none 
                focus:border-[var(--PrimaryColor)]"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={otp}
            />

             <label className="block text-gray-700 mb-2" htmlFor="confirmpassword">
              Confirm Password
            </label>

            <input
              type="text"
              id="confirmpassword"
              placeholder="Confirm Password"
              className="
                w-full border border-gray-300 rounded-lg px-3 py-2 
                focus:outline-none 
                focus:border-[var(--PrimaryColor)]"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={otp}
            />
          </div>


          <button
              className="w-full bg-[var(--PrimaryColor)] text-white rounded-lg px-4 py-2 font-semibold transition cursor-pointer hover:bg-[var(--HoverColor)]"
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
