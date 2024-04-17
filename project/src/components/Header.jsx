import React, { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const headderNav = [
  {
    title: "소개",
    url: "/"
  },
  {
    title: "도매가",
    url: "/"
  },
  {
    title: "메뉴 추천",
    url: "/"
  },
  {
    title: "마이페이지",
    url: "/"
  },
  {
    title: "고객지원",
    url: "/"
  }
];

const Header = () => {
  const [slideShow, setSlideShow] = useState(false);
  
  const mobileSlide = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    setSlideShow(!slideShow);
  };

  return (
    <div id="header">
      <div className="header__inner">
        <div className="header__logo">
          <h1><a href="/">로고</a></h1>
        </div>
        <nav 
          className={`header__nav ${slideShow ? "show" : "hide"}`}
          role="navigation"
          aria-label="메인 메뉴"
        >
          <ul>
            {headderNav.map((nav, key) => (
              <li key={key}>
                <a href="{nav.url}">{nav.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="icon__menu">
          <ul>
            <li className="search-icon clickOpen">
              <IoMdSearch />
            </li>
            <li className="login">
              <a href="/"><IoPersonOutline /></a>
            </li>
            <li 
              className="mobile-menu"
              id="headerToggle"
              aria-controls="primary-menu"
              aria-expanded={slideShow ? "true" : "false"}
              role="button"
              tabIndex="0"
              onClick={mobileSlide}
            >
              <a href="/">{slideShow ? <IoClose /> : <IoMenuSharp />}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;