import React, { useCallback, useState, useRef, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subDays } from "date-fns";
import { ko } from "date-fns/locale";
import i_cal from "../assets/image/i_cal.svg";

const itemCategories = ["식량작물", "채소류", "특용작물", "과일류", "축산물", "수산물"]

const items_00 = ["쌀", "찹쌀", "콩", "팥", "녹두", "고구마", "감자"]
const items_01 = ["배추", "양배추", "알배기배추", "브로콜리", "시금치", "상추", "얼갈이배추", "갓",
                  "수박", "참외", "오이", "호박", "토마토", "딸기", "무", "당근", "열무", "건고추",
                  "풋고추", "붉은고추", "깐마늘(국산)", "양파", "파", "생강", "고춧가루", "미나리",
                  "깻잎", "피망", "파프리카", "멜론", "방울토마토"]
const items_02 = ["참깨", "땅콩", "느타리버섯", "팽이버섯", "새송이버섯", "호두", "아몬드"]
const items_03 = ["사과", "배", "복숭아", "포도", "감귤", "단감", "바나나", "참다래", "파인애플",
                  "오렌지", "자몽", "레몬", "체리", "건포도", "건블루베리", "망고", "아보카도"]
const items_04 = ["소", "돼지", "수입 소고기", "수입 돼지고기", "닭", "계란", "우유"]
const items_05 = ["고등어", "갈치", "조기", "수입조기", "명태", "물오징어", "건멸치", "건오징어",
                  "김", "건미역", "굴", "새우젓", "멸치액젓", "굵은소금", "꽁치", "전복", "새우",
                  "건다시마", "삼치", "홍합"]

const kinds_00 = {
  쌀: ["전체(쌀20KG)", "20kg", "20kg(햅쌀)", "전체(쌀10KG)", "10kg", "10kg(햅쌀)"],
  찹쌀: ["일반계"], 콩: ["흰 콩(국산)"], 팥: ["붉은 팥(국산)"], 녹두: ["국산"], 고구마: ["밤"],
  감자: ["전체", "수미(노지)", "수미(시설)", "대지마", "기타(노지)", "기타(시설)"],
}

const productLank = [
  {id: "31", name: "전체"},
  {id: "32", name: "상품"},
  {id: "33", name: "중품"},
]

const areas = [
  {id: "41", name: "전체"},
  {id: "42", name: "서울"},
  {id: "43", name: "부산"},
  {id: "44", name: "대구"},
  {id: "45", name: "인천"},
  {id: "46", name: "광주"},
  {id: "47", name: "대전"},
  {id: "48", name: "울산"},
]

const SelectBox = (props) => {
  return(
    <select>
      {props.options.map((option) => (
        <option key={option.id} value={option.name}>{option.name}</option>
      ))}
    </select>
  );
};

const Table = () => {
  const [startDate, setStartDate] = useState(subDays(new Date(), 10));
  const [endDate, setEndDate] = useState(new Date());
  const [selectItemCategory, setSelectItemCategory] = useState(itemCategories[0]);
  const [selectItem, setSelectItem] = useState(items_01[0]);
  const itemCategory_ref = useRef();
  const item_ref = useRef();
  const [search, setSearch] = useState('');

  //부류 선택 시 품목과 품종이 첫 번째 값이 나옴
  useEffect(() => {
    const initialItemCategory = selectItemCategory;
    let selectedItem;
    let selectedKind;

    if(initialItemCategory === itemCategories[0]){
      selectedItem = items_00;
      setSelectItem(selectedItem[0]);
      selectedKind = kinds_00[selectedItem[0]];
    }else if(initialItemCategory === itemCategories[1]){
      selectedItem = items_01;
      setSelectItem(selectedItem[0]);
      selectedKind = kinds_00[selectedItem[0]];
    }

    itemCategory_ref.current.options.length = 0;
    for (let x in selectedItem){
      let opt = document.createElement('option');
      opt.innerHTML = selectedItem[x];
      itemCategory_ref.current.appendChild(opt);
    }
    item_ref.current.options.length = 0;
    for (let x in selectedKind){
      let opt = document.createElement('option');
      opt.innerHTML = selectedKind[x];
      item_ref.current.appendChild(opt);
    }

  }, [selectItemCategory]);

  //부류 선택 시 품목 변경 핸들러
  const onChangeItemCategory = (e) => {
    let selectedItem;
    const currentItemCategory = e.target.value;

    setSelectItemCategory(currentItemCategory);

    if(currentItemCategory === itemCategories[0]){
      selectedItem = items_00;
    }else if(currentItemCategory === itemCategories[1]){
      selectedItem = items_01;
    }else if(currentItemCategory === itemCategories[2]){
      selectedItem = items_02;
    }else if(currentItemCategory === itemCategories[3]){
      selectedItem = items_03;
    }else if(currentItemCategory === itemCategories[4]){
      selectedItem = items_04;
    }else if(currentItemCategory === itemCategories[5]){
      selectedItem = items_05;
    }

    itemCategory_ref.current.options.length = 0;

    for (let x in selectedItem){
      let opt = document.createElement('option');
      opt.innerHTML = selectedItem[x];
      itemCategory_ref.current.appendChild(opt);
    }
    
    setSelectItem(selectedItem[0]);
    item_ref.current.options.length = 0;
  };

  //품목 선택 시 품종 변경 핸들러
  const onChangeItem = (e) => {
    let selectedKind;
    const currentItem = e.target.value;
    setSelectItem(currentItem);

    if(currentItem === items_00[0]){
      selectedKind = kinds_00[items_00[0]];
    }else if(currentItem === items_00[1]){
      selectedKind = kinds_00[items_00[1]];
    }

    item_ref.current.options.length = 0;

    for (let x in selectedKind){
      let opt = document.createElement('option');
      opt.innerHTML = selectedKind[x];
      item_ref.current.appendChild(opt);
    }
  };

  //새로고침 시 각 select box 별로 첫 값이 나옴
  useEffect(() => {
    //첫 번째 select box 값 설정
    const initialItemCategory = itemCategories[0];
    setSelectItemCategory(initialItemCategory);

    let selectedItem = items_00;

    itemCategory_ref.current.options.length = 0;
    for(let x in selectedItem){
      let opt = document.createElement('option');
      opt.innerHTML = selectedItem[x];
      itemCategory_ref.current.appendChild(opt);
    }

    //두 번째 select box 값 설정
    let initialItem = items_00[0];
    setSelectItem(initialItem);

    let selectedKind = kinds_00[items_00[0]];

    item_ref.current.options.length = 0;
    for (let x in selectedKind){
      let opt = document.createElement('option');
      opt.innerHTML = selectedKind[x];
      item_ref.current.appendChild(opt);
    }
  }, []);

  const onChangeSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);
  // selectbox state훅 사용해서 바꿔보기

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
                    <DatePicker
                    locale={ko}
                    className="datePicker cursor"
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)} 
                    dateFormat="yyyy.MM.dd"
                    minDate={new Date('2000-01-01')}
                    maxDate={endDate}
                    />
                    <img className="ui-datepicker-trigger" src={i_cal} alt="달력" title="달력"></img>
                  </span>
                  <span className="gap">~</span>
                  <span className="calendar_input">
                    <DatePicker
                    locale={ko}
                    className="datePicker cursor"
                    selected={endDate} 
                    onChange={(date) => setEndDate(date)} 
                    dateFormat="yyyy.MM.dd"
                    minDate={startDate}
                    maxDate={new Date()}
                    />
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
                    <select
                      className="selected"
                      value={selectItemCategory}
                      onChange={onChangeItemCategory}
                    >
                      <option value={itemCategories[0]}>{itemCategories[0]}</option>
                      <option value={itemCategories[1]}>{itemCategories[1]}</option>
                      <option value={itemCategories[2]}>{itemCategories[2]}</option>
                      <option value={itemCategories[3]}>{itemCategories[3]}</option>
                      <option value={itemCategories[4]}>{itemCategories[4]}</option>
                      <option value={itemCategories[5]}>{itemCategories[5]}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="opt">
                  <span className="tit">품목</span>
                  <div className="selectbox">
                    <div className="selectoptions">
                      <select
                        className="selected"
                        id="items"
                        ref={itemCategory_ref}
                        value={selectItem}
                        onChange={onChangeItem}
                      >
                        <option>선택</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="opt">
                  <span className="tit">품종</span>
                  <div className="selectbox">
                    <div className="selectoptions">
                    <select
                        className="selected"
                        id="kinds_01"
                        ref={item_ref}
                      >
                        <option>선택</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="opt">
                  <span className="tit">등급</span>
                  <div className="selectbox">
                    <div className="selectoptions">
                      <SelectBox className="selected" options={productLank}></SelectBox>
                    </div>
                  </div>
                </div>
                <div className="opt">
                  <span className="tit">품목명</span>
                  <input
                  type="text"
                  name="search_itemname"
                  id="search_itemname"
                  value={search}
                  onChange={onChangeSearch}
                  className="txt"
                  placeholder="품목명 입력"
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="row">
                <span className="tit">지역</span>
                <div className="selectbox">
                  <div className="selectoptions">
                    <SelectBox options={areas}></SelectBox>
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