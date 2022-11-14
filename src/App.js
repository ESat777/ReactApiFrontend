import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Countries from "./components/Countries/Countries";
import AddCountry from "./components/Countries/AddCountry";
import EditCountry from "./components/Countries/EditCountry";
import Hotels from "./components/Hotels/Hotels";
import Home from "./components/Home/Home";
import AddHotel from "./components/Hotels/AddHotel";
import EditHotel from "./components/Hotels/EditHotel";
import Customers from "./components/Customers/Customers";
import AddCustomer from "./components/Customers/AddCustomer";
import EditCustomer from "./components/Customers/EditCustomer";
import { AuthProvider } from "./components/Admin/AuthContext";
import Register from "./components/Admin/Register";
import Login from "./components/Admin/Login";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/addCountry" element={<AddCountry />} />
          <Route path="/editCountry/:id" element={<EditCountry />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/addCustomer" element={<AddCustomer />} />
          <Route path="/editCustomer/:id" element={<EditCustomer />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/addHotel" element={<AddHotel />} />
          <Route path="/editHotel/:id" element={<EditHotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
