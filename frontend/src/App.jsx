import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

export const ServerUrl = "http://localhost:8000"
const App = () => {
  return (
    <>
      <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
    </>
  )
}

export default App