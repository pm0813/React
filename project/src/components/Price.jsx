import React from "react";

const Price = () => {
  return (
    <section id="price">
      <section className="section01">
        <div className="wrap">
          <div className="sec01_l">
            <div className="sel_type">
              <div className="selectbox">
                
              </div>
              <h2> 오늘 관심있는 품목 소비자 가격은?</h2>
            </div>
            <div className="tab price">
              <div className="flex_tit">
                <p className="price_legend">가격단위 (원) 
                  <span id="baseDate">기준일 (1999.08.13)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Price;