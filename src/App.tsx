import React from 'react';
import { Route, Routes } from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList';
import Posts from './components/Posts';
// import Navbar from './components/Navbar';

function App() {
  return (
    <>
    {/* <Navbar /> */}
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/posts" element={<Posts />} />
      {/* <Route path="/books" element={<BookList />} /> */}
    </Routes>
    </>
  );
}

export default App;
