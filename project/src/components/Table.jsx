import React, { useCallback, useState, useRef, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subDays } from "date-fns";
import { ko } from "date-fns/locale";
import i_cal from "../assets/image/i_cal.svg";

const itemCategories = {
  '식량작물': {
    items : ['쌀', '찹쌀', '콩', '팥', '녹두', '고구마', '감자'],
    kinds: {
      '쌀': ['전체(쌀20KG)', '20kg', '20kg(햅쌀)', '전체(쌀10KG)', '10kg', '10kg(햅쌀)'],
      '찹쌀': ['일반계'], '콩': ['흰 콩(국산)'], '팥': ['붉은 팥(국산)'], '녹두': ['국산'], '고구마': ['밤'],
      '감자': ['전체', '수미(노지)', '수미(시설)', '대지마', '기타(노지)', '기타(시설)']
    }
  },
  '채소류': {
    items: ['배추', '양배추', '알배기배추', '브로콜리', '시금치', '상추', '얼갈이배추', '갓','수박', '참외',
            '오이', '호박', '토마토', '딸기', '무', '당근', '열무', '건고추','풋고추','붉은고추','깐마늘(국산)',
            '양파', '파', '생강', '고춧가루', '미나리','깻잎', '피망', '파프리카', '멜론', '방울토마토'],
    kinds: {
      '배추': ['전체', '봄', '여름(고랭지)', '가을', '겨울'], '양배추': ['양배추'], '알배기배추': ['알배기배추'],
      '브로콜리': ['브로콜리(국산)'], '시금치': ['시금치'], '상추': ['적', '청'], '얼갈이배추' : ['얼갈이배추'],
      '갓': ['갓'], '수박': ['수박'], '참외': ['참외'], '오이': ['가시계통', '다다기계통', '취청'],'호박': ['애호박', '쥬키니'],
      '토마토': ['토마토'], '딸기': ['딸기'], '무': ['전체', '봄', '고랭지', '가을', '겨울'],'당근': ['무세척', '세척'],
      '열무': ['열무'], '건고추': ['전체(화건)', '화건', '햇산화건', '전체(양건)', '양건(~23.5)', '햇산양건(~23.5)'],
      '풋고추': ['청양고추', '오이맛고추', '꽈리고추', '풋고추(녹광 등)'], '붉은고추': ['붉은고추'],
      '깐마늘(국산)': ['깐마늘(국산)'], '양파': ['전체', '양파', '햇양파'], '파': ['대파', '쪽파'], '생강': ['국산'],
      '고춧가루': ['국산', '중국'], '미나리': ['미나리'], '깻잎': ['깻잎'], '피망': ['청'], '파프리카': ['파프리카'],
      '멜론': ['멜론'], '방울토마토': ['방울토마토', '대추방울토마토']
    }
  },
  '특용작물': {
    items: ['참깨', '땅콩', '느타리버섯', '팽이버섯', '새송이버섯', '호두', '아몬드'],
    kinds: {
      '참깨': ['백색(국산)', '중국', '인도'], '땅콩': ['국산', '수입'], '느타리버섯': ['느타리버섯', '애느타리버섯'],
      '팽이버섯': ['팽이버섯'], '새송이버섯': ['새송이버섯'], '호두': ['수입'], '아몬드': ['수입']
    }
  },
  '과일류': {
    items: ['사과', '배', '복숭아', '포도', '감귤', '단감', '바나나', '참다래', '파인애플',
            '오렌지', '자몽', '레몬', '체리', '건포도', '건블루베리', '망고', '아보카도'],
    kinds: {
      '사과': ['후지', '홍로', '쓰가루(아오리)'], '배': ['신고', '원황'], '백도': ['백도', '유명'], '포도': ['샤인머스켓',
      '캠벨얼리', '거봉', 'MBA', '레드글로브 칠레(~23.5)', '레드글로브 페루(~23.5)', '톰슨 미국(~23.5)', '톰슨 호주(~23.5)',
      '수입'], '감귤': ['전체', '노지', '시설', '감귤'], '단감': ['단감'], '바나나': ['수입'], '참다래': ['국산', '그린 뉴질랜드'],
      '파인애플': ['수입'], '오렌지': ['네이블 미국', '네이블 EU', '네이블 호주', '발렌시아 미국'], '자몽': ['수입'],
      '레몬': ['수입'], '체리': ['수입'], '건포도': ['수입'], '건블루베리': ['수입'], '망고': ['수입'], '아보카도': ['수입']
    }
  },
  '축산물': {
    items: ['소', '돼지', '수입 소고기', '수입 돼지고기', '닭', '계란', '우유'],
    kinds: {
      '소': ['안심', '등심', '설도', '양지', '갈비'], '돼지': ['앞다리', '삼겹살', '갈비', '목심'], '수입 소고기': ['갈비', '갈비살'],
      '수입 돼지고기': ['삼겹살'], '닭': ['육계(kg)'], '계란': ['특란 10구', '특란 30구'], '우유': ['흰우유']
    }
  },
  '수산물': {
    items: ['고등어', '갈치', '조기', '수입조기', '명태', '물오징어', '건멸치', '건오징어',
            '김', '건미역', '굴', '새우젓', '멸치액젓', '굵은소금', '꽁치', '전복', '새우',
            '건다시마', '삼치', '홍합'],
    kinds: {
      '고등어': ['국산(염장)', '국산(신선 냉장)', '국산(냉동)', '수입산(냉동)', '수입산(염장)'], '갈치': ['국산(냉장)',
      '국산(냉동)', '수입산(냉동)'], '조기': ['참조기(신선 냉장)', '참조기(냉동)', '굴비'], '수입조기': ['부세수입(생선)',
      '부세수입(냉동)'], '명태': ['냉동(원양수입통합)', '냉동가공'], '물오징어': ['연근해(신선 냉장)', '연근해(냉동)',
      '원양(냉동)'], '건멸치': ['건멸치'], '건오징어': ['건오징어'], '김': ['마른김', '얼구운김'], '건미역': ['건미역'],
      '굴': ['굴'], '새우젓': ['새우젓'], '멸치액젓': ['멸치액젓'], '굵은소금': ['굵은소금'], '꽁치': ['냉동(수입)'],
      '전복': ['전복'], '새우': ['흰다리(수입)'], '건다시마': ['완도산'], '삼치': ['냉동'], '홍합': ['깐홍합(냉장)', '안깐홍합(냉장)']
    }
  }
};

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
    <select className="selected">
      {props.options.map((option) => (
        <option key={option.id} value={option.name}>{option.name}</option>
      ))}
    </select>
  );
};

const Table = () => {
  const [startDate, setStartDate] = useState(subDays(new Date(), 10));
  const [endDate, setEndDate] = useState(new Date());
  const [selectItemCategory, setSelectItemCategory] = useState('식량작물');
  const [selectItem, setSelectItem] = useState('');
  const itemCategory_ref = useRef();
  const item_ref = useRef();
  const [search, setSearch] = useState('');

  //부류 선택 시 품목과 품종이 첫 번째 값이 나옴
  useEffect(() => {
    const initialItemCategory = selectItemCategory;
    const initialItems = itemCategories[initialItemCategory].items;
    const initialItem = initialItems[0];

    itemCategory_ref.current.options.length = 0;
    initialItems.forEach((item) => {
      let opt = document.createElement('option');
      opt.innerHTML = item;
      itemCategory_ref.current.appendChild(opt);
    })

    setSelectItem(initialItem);

    const initialKinds = itemCategories[initialItemCategory].kinds[initialItem];

    item_ref.current.options.length = 0;
    initialKinds.forEach((kind) => {
      let opt = document.createElement('option');
      opt.innerHTML = kind;
      item_ref.current.appendChild(opt);
    })
  }, [selectItemCategory]);

  //부류 선택 시 품목 변경 핸들러
  const onChangeItemCategory = (e) => {
    setSelectItemCategory(e.target.value);
  };

  //품목 선택 시 품종 변경 핸들러
  const onChangeItem = (e) => {
    const currentItem = e.target.value;
    setSelectItem(currentItem);

    const kinds1 = itemCategories[selectItemCategory].kinds[currentItem];
    item_ref.current.options.length = 0;
    kinds1.forEach((kind) => {
      let opt = document.createElement('option');
      opt.innerHTML = kind;
      item_ref.current.appendChild(opt);
    })
  };

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
                      <option value='식량작물'>식량작물</option>
                      <option value='채소류'>채소류</option>
                      <option value='특용작물'>특용작물</option>
                      <option value='과일류'>과일류</option>
                      <option value='축산물'>축산물</option>
                      <option value='수산물'>수산물</option>
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
                      <SelectBox options={productLank}></SelectBox>
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