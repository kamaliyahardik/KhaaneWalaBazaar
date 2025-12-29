import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
import { sendOtp as sendOtpMail } from "../utils/mail.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }
    if (mobile.length < 10) {
      return res
        .status(400)
        .json({ message: "Mobile number must be 10 digits long." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      role,
      mobile,
      password: hashedPassword,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Sign up successfully.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Sign up failed", error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "incorrect password." });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Sign in successfully.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Sign In failed", error: error.message });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Log out successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Log out failed", error: error.message });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    await sendOtpMail(email, otp);
    return res.status(200).json({ message: "OTP sent Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Send OTP failed", error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }
    if (user.isOtpVerified) {
      return res.status(400).json({ message: "OTP already verified." });
    }
    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired." });
    }
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "OTP verified successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Verify OTP failed", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // 1️⃣ Validate input
    if (!email || !newPassword) {
      return res.status(400).json({
        message: "Email and new password are required",
      });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 3️⃣ Check OTP verification
    if (!user.isOtpVerified) {
      return res.status(400).json({
        message: "OTP verification required",
      });
    }

    // 4️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 5️⃣ Update password & reset OTP flag
    user.password = hashedPassword;
    user.isOtpVerified = false;

    await user.save();

    // 6️⃣ Success response
    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Reset password failed",
      error: error.message,
    });
  }
};      
