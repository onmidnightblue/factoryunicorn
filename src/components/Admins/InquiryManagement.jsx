import React, { useState } from "react";
import styled from "styled-components";
import { GrayScale, MainColor, SubColor } from "../../assets/colorSystem";
import Modal from "../commonUI/Modal";

const InquiryManagement = () => {
  const [detailInfo, setDetailInfo] = useState();

  // detail info
  const getDetailInfo = () => {
    setDetailInfo(true);
  };
  const modalClose = () => {
    setDetailInfo(false);
  };

  return (
    <Styles.List>
      <li className="th">
        <div>사용자 번호</div>
        <div>주문 날짜</div>
        <div>상세 정보</div>
        <div>진행 상황</div>
      </li>
      <li>
        <div>01012341234</div>
        <div>2022.08.30</div>
        <div className="link">
          <span onClick={getDetailInfo}>상세 정보 보기</span>
        </div>
        <div className="state">
          <span className="prev">접수</span>
        </div>
      </li>
      {detailInfo && <Modal close={modalClose} />}
    </Styles.List>
  );
};

// styled
const Styles = {
  List: styled.ul`
    width: 100%;
    border-top: 1px solid ${GrayScale.MiddleGray};
    border-bottom: 1px solid ${GrayScale.MiddleGray};
    li {
      width: 100%;
      border-bottom: 1px solid ${GrayScale.LightGray};
      display: grid;
      grid-template-columns: 20% 20% 48% 12%;
      &.th {
        border-bottom: 1px solid ${GrayScale.MiddleGray};
        div {
          position: relative;
          &::after {
            content: "";
            width: 1px;
            height: 50%;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            background-color: ${GrayScale.LightGray};
          }
          &:first-child {
            &::after {
              display: none;
            }
          }
        }
      }
      &:last-child {
        border-bottom: none;
      }
      div {
        height: 36px;
        padding-left: 10px;
        color: ${GrayScale.MiddleGray};
        display: flex;
        align-items: center;
        &.link {
          span {
            color: ${GrayScale.MiddleGray};
            cursor: pointer;
            &:hover {
              color: ${GrayScale.DarkGray};
            }
          }
        }
        &.state {
          span {
            border-radius: 100px;
            border: 1px solid ${GrayScale.DarkGray};
            box-sizing: border-box;
            width: 80px;
            height: 30px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            &.prev {
              background-color: ${MainColor};
              color: #fff;
              border: none;
            }
            &.ing {
              background-color: ${SubColor};
              color: #fff;
              border: none;
            }
          }
        }
      }
    }
  `,
};

export default InquiryManagement;
