import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import CargoListPage from "../Cargo/CargoList/CargoListPage";

import {ChatBox}  from "./ChatBox"; // Assumant que le composant ChatBox est dans le même répertoire que HomePage


function HomePage() {

  return (
    <div className="flex bg-white">
      <div className="hidden sm:block w-2/12 bg-white h-screen">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-background">
        <div className="p-0">
          <TopNavigationBar />
          {/* ## USING CONDITIONAL RENDERING HERE TO DIFFRENTIATE 1ST TIME USER AND WELL SETUP USER */}
          <>
            <h1 h1 className="heading1 ml-12 mb-2 mt-2 text-transparent text-3xl sm:text-5xl bg-clip-text bg-gradient-to-r from-blue-500 to-black ">WELCOME TO DIANNEL</h1>


            {/* Ajouter le composant ChatBox ici */}
            <ChatBox />
          </>
          <>
            <CargoListPage />
          </>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
