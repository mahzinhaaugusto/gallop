import React from "react";
import "./style.scss";
import { Login } from "./Pages/Login";
import { MainPage } from "./Pages/MainPage";

export function Main() {
  return (
    <>
      <MainPage />
    </>
  );
}

export function App() {
  return <Login />;
}
