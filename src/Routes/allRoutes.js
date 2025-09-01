import React from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CreateProfile from "../pages/Profile/CreateProfile";
import CreateProfileWizard from "../pages/Profile-wizard/Demo";
import FormWizardDemo from "../pages/Profile-wizard/FormWizard";
import CreateAsset from "../pages/Assets/AssetsWrapper";
import CreateLiabilities from "../pages/Liabilities/LiabilitiesWrapper";
import ClientOverallDetails from "../pages/RuleOfHundred/ClientOverallDetails";
import DocumentPrint from "../pages/RuleOfHundred/DocumentPrint/DocumentPrint";
import CreateIncome from "../pages/Income/IncomeWrapper"
import DefaultParameter from "../pages/Profile/DefaultParameter";
import Demo from "../pages/Profile-wizard/Demo";
import NetWorth from "../pages/Networth/NetWorth";
import ProfileList from "../pages/Admin-View/ProfileList";
import ProfileView from "../pages/Admin-View/ProfileView";
import Login from "../pages/Authentication/Login";
import ResetPassword from "../pages/Authentication/ResetPassword";
import RuleOfHundred from "../pages/RuleOfHundred/index";
import Test from "../Test"
import UserProfileView from "../pages/Profile/UserProfile";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
 
const authProtectedRoutes = [

  { path: "/create-profile", component: <CreateProfile /> },
  { path: "/create-profile-wizard", component: <CreateProfileWizard /> },
  { path: "/form-wizard", component: <FormWizardDemo /> },
  { path: "/create-assets", component: <CreateAsset /> },
  { path: "/create-liabilities", component: <CreateLiabilities /> },
 
  { path: "/create-income", component: <CreateIncome /> },
  { path: "/networth", component: <NetWorth /> },
  { path: "/default-parameter", component: <DefaultParameter /> },
  { path: "/profile-list", component: <ProfileList /> },
  { path: "/profile/:id", component: <ProfileView /> },
  { path: "/demo", component: <Demo /> },
  { path: "/user-profile-view", component: <UserProfileView /> },
  { path: "/print-document", component: <DocumentPrint /> },
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/update-planing", component: <ClientOverallDetails /> },
  { path: "/rule-of-hundred", component: <RuleOfHundred /> },
  { path: "/test", component: <Test /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [

  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/reset-password/:uid/:token", component: <ResetPassword /> },

  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },


];

export { authProtectedRoutes, publicRoutes };