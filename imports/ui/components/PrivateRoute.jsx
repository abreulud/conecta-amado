import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export const PrivateRoute = () => {
  return Meteor.userId() ? <Outlet /> : <Navigate to="/login" replace />;
};
