
import React from 'react'
import NavBar from '../components/NavBar';
import {Outlet} from "react-router-dom";

function MainLayout() {
  return (
    <div className="app-layout">
      <NavBar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout
