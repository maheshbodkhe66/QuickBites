import React, { useEffect, useState } from "react";
import RegistrationForm from "../../components/Register/Register";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../../components/Login/Login";
import ResetPasswordRequest from "./ResetPaswordRequest";
import { useSelector } from "react-redux";
import ResetPasswordForm from "./ResetPasswordForm";

const Auth = ({ open, handleClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    if (auth.success || auth.error) setOpenSnackBar(true);
  }, [auth.success, auth.error]);

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {location.pathname === "/account/register" ? (
          <RegistrationForm />
        ) : location.pathname === "/account/login" ? (
          <LoginForm />
        ) : location.pathname === "/account/reset-password" ? (
          <ResetPasswordForm />
        ) : (
          <ResetPasswordRequest />
        )}

        <div className="flex justify-center mt-5">
          {location.pathname === "/account/reset-password-request" ||
          location.pathname === "/account/reset-password" ? (
            <button
              onClick={() => navigate("/account/login")}
              className="text-blue-500 hover:underline"
            >
              Go Back To Login
            </button>
          ) : (
            <button
              onClick={() => navigate("/account/reset-password-request")}
              className="text-blue-500 hover:underline"
            >
              Forgot Password
            </button>
          )}
        </div>
        {openSnackBar && (
          <div className={`mt-4 p-2 text-center text-white rounded ${auth.error ? "bg-red-500" : "bg-green-500"}`}>
            {auth.success || auth.error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
