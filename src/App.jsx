import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TableBarang from "./pages/TableBarang";
import DetailBarang from "./pages/barang/DetailBarang";
import UbahBarang from "./pages/barang/UbahBarang";
import DataSupplier from "./pages/DataSupplier";
import DetailSupplier from "./pages/supplier/DetailSupplier";
import UbahDetailSupplier from "./pages/supplier/UbahDetailSupplier";
import AllBarang from "./pages/AllBarang";
import Login from "./auth/Login";
import AuthAdmin from "./auth/AuthAdmin";
import Profile from "./Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />

        <Route path="/tabel" element={<TableBarang />} />

        <Route path="/data-supplier" element={<DataSupplier />} />

        <Route path="/all-barang" element={<AllBarang />} />

        <Route path="/detail/:id" element={<DetailBarang />} />

        <Route element={<AuthAdmin />}>
          <Route path="/edit/:id" element={<UbahBarang />} />

          <Route path="/detail-supplier/:id" element={<DetailSupplier />} />

          <Route path="/edit-supplier/:id" element={<UbahDetailSupplier />} />

          <Route path="/profile-user" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
