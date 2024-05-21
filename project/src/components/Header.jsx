import React, { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const headerNav = [

  {
    title: "가격 정보",
    titleUrl: "#price",
    sub: [["표", "/Table"],["그래프", "/Graph"]]
  },
  {
    title: "메뉴 추천",
    titleUrl: "#recommend",
    sub: [["메뉴 추천", "/Recommend"]]
  },
  {
    title: "커뮤니티",
    titleUrl: "#community",
    sub: [["자유게시판", "/Free"]]
  }
];

const Header = () => {
  const [sideBarShow, setSideBarShow] = useState(false);
  
  const mobileSideBar = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    setSideBarShow(!sideBarShow);
  };

  return (
    <div id="header">
      <div className="header__inner">
        <div className="header__logo">
          <h1><a href="/">로고</a></h1>
        </div>
        <nav 
          className={`header__nav ${sideBarShow ? "show" : ""}`}
          role="navigation"
          aria-label="메인 메뉴"
        >
          <ul className="dropDown">
            {headerNav.map((nav, key) => (
              <li key={key}>
                <a href={nav.titleUrl}>{nav.title}</a>
                <div className="item">
                  <ul className="dropDownMenu">
                    {nav.sub.map((value, index) => (
                      <li key={index}><a href={value[1]}>{value[0]}</a></li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            <div className="navMenuBg" />
          </ul>
        </nav>
        <div className="icon__menu">
          <ul>
            <li 
              className="searchBar"
              id="searchBarToggle"
              role="button"
            >
              <IoMdSearch />
            </li>
            <li className="login">
              <a href="/"><IoPersonOutline /></a>
            </li>
            <li 
              className="mobileSideBar"
              id="mobileSideBarToggle"
              aria-controls="primary-menu"
              aria-expanded={sideBarShow ? "true" : "false"}
              role="button"
              tabIndex="0"
              onClick={mobileSideBar}
            >
              <a href="/">{sideBarShow ? <IoClose /> : <IoMenuSharp />}</a>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default Header;