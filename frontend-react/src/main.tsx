import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { } from "./Api";

import User from "./layout/User";
import Auth from "./layout/Auth";
import Admin from "./layout/Admin";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/user/*" element={<User />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="" element={<Navigate to="/user" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);