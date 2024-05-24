import React from "react";
import i_cal from "../assets/image/i_cal.svg"

const ItemCategories = [
  {value: "01", name: "식량작물"},
  {value: "02", name: "채소류"},
  {value: "03", name: "특용작물"},
  {value: "04", name: "과일류"},
  {value: "05", name: "축산물"},
  {value: "06", name: "수산물"},
  {value: "07", name: "식품"},
]

const Item = [
  {value: "11", name: "쌀"},
  {value: "12", name: "찹쌀"},
  {value: "13", name: "콩"},
  {value: "14", name: "팥"},
  {value: "15", name: "녹두"},
  {value: "16", name: "고구마"},
  {value: "17", name: "감자"},
]

const Kind = [
  {value: "21", name: "20Kg"},
  {value: "22", name: "10Kg"},
]

const ProductLank = [
  {value: "31", name: "전체"},
  {value: "32", name: "상품"},
]

const Area = [
  {value: "41", name: "전체"},
  {value: "42", name: "서울"},
  {value: "43", name: "부산"},
  {value: "44", name: "대구"},
  {value: "45", name: "인천"},
  {value: "46", name: "광주"},
  {value: "47", name: "대전"},
  {value: "48", name: "울산"},
]

const SelectBox = (props) => {
  return(
    <select>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>{option.name}</option>
      ))}
    </select>
  );
};

const Table = () => {
  const today = new Date();
  const startday = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate() - 10}`
  const endday = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`

  return (
    <div className="wrap">
      <div className="page_top">
        <h2 className="page_tit">가격정보</h2>
      </div>
      <form className="searchBox" id="form_search" name="form_search" action="">
        <div className="search_box">
          <ul className="top">
            <li>
              <div className="row">
                <span className="tit">기간</span>
                <div className="cal_box daily">
                  <span className="calendar_input">
                    <input id="startday" name="startday" type="text" value={startday} readOnly="readonly" className="hasDatepicker cursor"/>
                    <img className="ui-datepicker-trigger" src={i_cal} alt="달력" title="달력"></img>
                  </span>
                  <span className="gap">~</span>
                  <span className="calendar_input">
                    <input id="endday" name="endday" type="text" value={endday} readOnly="readonly" className="hasDatepicker cursor"/>
                    <img className="ui-datepicker-trigger" src={i_cal} alt="달력" title="달력"></img>
                  </span>
                </div>
              </div>
            </li>
            <li>
              <div className="row">
                <span className="tit">부류</span>
                <div className="selectbox">
                  <div className="selectoptions">
                    <SelectBox className="selected" options={ItemCategories}></SelectBox>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="opt">
                  <span className="tit">품목</span>
                  <div className="selectbox">
                    <div className="selectoptions">
                      <SelectBox className="selected" options={Item}></SelectBox>
                    </div>
                  </div>
                </div>
                <div className="opt">
                  <span className="tit">품종</span>
                  <div className="selectbox">
                    <div className="selectoptions">
                      <SelectBox className="selected" options={Kind}></SelectBox>
                    </div>
                  </div>
                </div>
                <div className="opt">
                  <span className="tit">등급</span>
                  <div className="selectbox">
                    <div className="selectoptions">
                      <SelectBox className="selected" options={ProductLank}></SelectBox>
                    </div>
                  </div>
                </div>
                <div className="opt">
                  <span className="tit">품목명</span>
                  <input type="text" name="search_itemname" id="search_itemname" value="" className="txt" placeholder="품목명 입력" />
                </div>
              </div>
            </li>
            <li>
              <div className="row">
                <span className="tit">지역</span>
                <div className="selectbox">
                  <div className="selectoptions">
                    <SelectBox options={Area}></SelectBox>
                  </div>
                </div>
              </div>
            </li>
            <li></li>
          </ul>
          <div className="btm">

          </div>
        </div>
      </form>
    </div>
  );
};

export default Table;