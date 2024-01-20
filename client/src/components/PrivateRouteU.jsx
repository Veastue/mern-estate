import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRouteU = () => {
  const {currentUser}= useSelector((state) => state.user.user);
  console.log(currentUser)
  // Check if currentUser is not undefined or null
  return currentUser!==undefined ? currentUser === 'User has been deleted' || currentUser === 'User has been logged out!' ? <Navigate to="/sign-in" /> : <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRouteU;
