import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Banner from "../components/Banner";
import Slide from "../components/Slide";
import Notice from "../components/Notice";
import Footer from "../components/Footer";


const HomeView = () => {
  return(
    <>
      <Header />
      <Main>
        <Banner />
        <Slide />
        <Notice />
      </Main>
      <Footer />
    </>
  );
};

export default HomeView;
