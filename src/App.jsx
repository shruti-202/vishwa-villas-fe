import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import WishlistPage from "./pages/WishlistPage";
import NotFound404 from "./pages/NotFound404";
import MainLayout from "./layouts/MainLayout";
import CreateAddPage from "./pages/CreateAddPage/CreateAddPage";
import "./App.css";
import ItemDetailPage from "./pages/ItemDetailPage/ItemDetailPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/create" element={<CreateAddPage />} />
          <Route path='/item/:itemId' element={<ItemDetailPage/>}/>
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
