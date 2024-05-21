import React from "react";
import Main from "../components/Main";
import Price from "../components/Price";
import Shortcut from "../components/Shortcut";
import Recommend from "../components/Recommend";
import Community from "../components/Community";


const HomeView = () => {
  return(
    <>
      <Main>
        <Price />
        <Shortcut />
        <Recommend />
        <Community />
      </Main>
    </>
  );
};

export default HomeView;
