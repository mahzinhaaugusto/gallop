import React from "react";
import ReactDOM from "react-dom/client";
import { SignUp } from "./Pages/SignUp";
import { SignUp2 } from "./Pages/SignUp2";
import { App, Main } from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Main />} />
      <Route path="/signup2" element={<SignUp2 />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
