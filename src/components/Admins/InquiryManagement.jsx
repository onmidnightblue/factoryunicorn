import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GrayScale, MainColor } from "../../assets/colorSystem";
import useHttp from "../../hooks/useHttp";
import Modal from "../commonUI/Modal";

const InquiryManagement = () => {
  const [inquiries, setInquiries] = useState([]);
  const [inquiry, setInquiry] = useState({});
  const [openDetailInfo, setOpenDetailInfo] = useState();
  const { sendRequest: fetchInquiries } = useHttp();
  const { sendRequest: fetchInquiry } = useHttp();

  const modalClose = () => {
    setOpenDetailInfo(false);
  };

  // get inquiries data
  useEffect(() => {
    const transformInquiries = (datas) => {
      const getInquiries = Object.values(datas);
      setInquiries(getInquiries);
    };

    fetchInquiries(
      {
        url: "getEntireInquiry",
        method: "GET",
      },
      transformInquiries
    );
  }, []);

  // get inquiry data
  const getDetailInfo = (index) => {
    setOpenDetailInfo(true);

    const transformInquiry = (datas) => {
      const getInquiry = datas;
      setInquiry(getInquiry);
    };

    fetchInquiry(
      {
        url: "getSingleInquiry",
        method: "GET",
        params: { uid: index },
      },
      transformInquiry
    );
  };

  return (
    <Styles.List>
      <li className="th">
        <div>주문 날짜</div>
        <div>라벨 타입</div>
        <div>라벨 사이즈</div>
        <div>수량</div>
        <div>상세 정보</div>
      </li>
      {inquiries.map((inquiry, index) => (
        <li key={index}>
          <div>{inquiry.time}</div>
          <div>{inquiry.type}</div>
          <div>{inquiry.size}</div>
          <div>{inquiry.quantity}</div>
          <div className="link">
            <span onClick={() => getDetailInfo(inquiry.uid)}>
              상세 정보 보기
            </span>
          </div>
        </li>
      ))}
      {openDetailInfo && <Modal close={modalClose} datas={inquiry} />}
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
      grid-template-columns: repeat(5, 1fr);
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
            box-sizing: border-box;
            width: 80px;
            height: 30px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            background-color: ${MainColor};
            color: #fff;
          }
        }
      }
    }
  `,
};

export default InquiryManagement;
