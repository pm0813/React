import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./views/HomeView";
import TableView from "./views/TableView";
import GraphView from "./views/GraphView";
import RecommendView from "./views/RecommendView";
import FreeView from "./views/FreeView";
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
        <Route path="/Graph" element={<GraphView />} />
        <Route path="/Recommend" element={<RecommendView />} />
        <Route path="/Free" element={<FreeView />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
