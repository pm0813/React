import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./views/HomeView";
import TableView from "./views/TableView";
import lenis from "./utils/lenis"
import link from "./utils/link"

const App = () => {
  useEffect(() => {
    lenis();
    link();
  }, []);

  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/Table" element={<TableView />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
