import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../State/Authentication/Action';

const UserProfile = () => {
  const { auth } = useSelector(store => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
      <div className='flex flex-col items-center justify-center'>
        <div className='w-36 h-36 bg-gray-300 rounded-full flex items-center justify-center text-6xl'>
          👤
        </div>
        <h1 className='py-5 text-2xl font-semibold'>{auth.user?.fullName}</h1>
        <p>Email: {auth.user?.email}</p>
        <button
          onClick={handleLogout}
          className='bg-blue-500 text-white px-6 py-2 rounded-lg mt-5 hover:bg-blue-600'
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
