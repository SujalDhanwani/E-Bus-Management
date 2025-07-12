import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PostBus from "./pages/PostBus";
import ViewBuses from "./pages/ViewBuses";
import EditBus from "./pages/EditBus";
import BookTicket from "./pages/BookTicket";
import AdminDashboard from "./pages/AdminDashboard";
import CreateDriver from "./pages/CreateDriver";
import BusDetails from "./pages/BusDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-bus" element={<PostBus />} />
        <Route path="/view-buses" element={<ViewBuses />} />
        <Route path="/edit-bus/:id" element={<EditBus />} />
        <Route path="/book-ticket" element={<BookTicket />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/create-driver" element={<CreateDriver />} />

        {/* 🟢 ADD THIS ROUTE */}
        <Route path="/bus/:id" element={<BusDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
