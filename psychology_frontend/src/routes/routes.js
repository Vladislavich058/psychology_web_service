import Analitics from "pages/Analitics";
import Calls from "pages/Calls";
import Login from "pages/Login";
import PsychologistAddPage from "pages/PsychologistAddPage";
import Psychologists from "pages/Psychologists";
import Records from "pages/Records";
import Specializations from "pages/Specializations";
import React from "react";

export const publicRoutes = [{ path: "/login", element: <Login /> }];

export const adminRoutes = [
  { path: "/psychologists", element: <Psychologists type="admin" /> },
  { path: "/specializations", element: <Specializations /> },
  { path: "/records", element: <Records /> },
  { path: "/calls", element: <Calls /> },
  { path: "/analitics", element: <Analitics /> },
  { path: "/addPsychologist", element: <PsychologistAddPage /> },
  { path: "/editPsychologist/:id", element: <PsychologistAddPage type="edit" /> },
];
