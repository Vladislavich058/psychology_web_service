import Login from "pages/Login";
import PsychologistAddPage from "pages/PsychologistAddPage";
import Psychologists from "pages/Psychologists";
import Specializations from "pages/Specializations";
import React from "react";

export const publicRoutes = [{ path: "/login", element: <Login /> }];

export const adminRoutes = [
  { path: "/psychologists", element: <Psychologists type="admin" /> },
  { path: "/specializations", element: <Specializations /> },
  { path: "/addPsychologist", element: <PsychologistAddPage /> },
  { path: "/editPsychologist/:id", element: <PsychologistAddPage type="edit" /> },
];
