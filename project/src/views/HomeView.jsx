import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Price from "../components/Price";
import Shortcut from "../components/Shortcut";
import Recommend from "../components/Recommend";
import Community from "../components/Community";
import Footer from "../components/Footer";


const HomeView = () => {
  return(
    <>
      <Header />
      <Main>
        <Price />
        <Shortcut />
        <Recommend />
        <Community />
      </Main>
      <Footer />
    </>
  );
};

export default HomeView;
