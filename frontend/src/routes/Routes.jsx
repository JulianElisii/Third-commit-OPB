import React from 'react';
import { Routes, Route } from "react-router-dom";
import LoginForm from "../components/SingIn"
import RegisterForm from "../components/SingUp"
import MisKatas from "../Pages/MisKatas"
import Homepage from '../Pages/HomePage';

const RoutesForm = () => {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/login" element={<LoginForm/>}></Route>
        <Route path="/register" element={<RegisterForm/>}></Route>
        <Route path="/miskatas" element={<MisKatas/>}></Route>
      </Routes>

    </div>
  );
}

export default RoutesForm;