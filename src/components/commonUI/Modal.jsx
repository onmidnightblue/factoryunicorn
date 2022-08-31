import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { GrayScale } from "../../assets/colorSystem";
import { Close } from "../../assets/images";

const Modal = (props) => {
  const data = props.datas;
  const detailType = data.detailType;

  return (
    <>
      {ReactDOM.createPortal(
        <>
          <Styles.Backdrop onClick={props.close} />
          <Styles.Wrap>
            <div className="close" onClick={props.close}>
              <Close />
            </div>
            <ul>
              <li>
                <div className="th">주문 날짜</div>
                <div className="td">{data?.time}</div>
              </li>
              <li>
                <div className="th">라벨 종류</div>
                <div className="td">{data?.type}</div>
              </li>
              <li>
                <div className="th">세부 정보</div>
                <div className="td">
                  {detailType?.quality} /{" "}
                  {detailType?.shape ||
                    detailType?.location ||
                    detailType?.bgcColor}
                </div>
              </li>
              <li>
                <div className="th">라벨 크기</div>
                <div className="td">{data?.size}</div>
              </li>
              <li>
                <div className="th">수량</div>
                <div className="td">{data?.quantity}</div>
              </li>
              <li>
                <div className="th">요청 사항</div>
                <div className="td">{data?.etc}</div>
              </li>
            </ul>
          </Styles.Wrap>
        </>,
        document.getElementById("modal")
      )}
    </>
  );
};

// styled
const Styles = {
  Backdrop: styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
  `,
  Wrap: styled.div`
    width: 770px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 220px;
    background-color: #fff;
    border: 1px solid ${GrayScale.MiddleGray};
    padding: 30px;
    box-sizing: border-box;
    z-index: 1;
    .close {
      position: absolute;
      right: 30px;
      top: 30px;
      cursor: pointer;
    }
    ul {
      width: 100%;
      li {
        padding: 20px 0;
        border-bottom: 1px solid ${GrayScale.LightGray};
        display: grid;
        grid-template-columns: 150px auto;
        &:last-child {
          border-bottom: none;
        }
        .th {
          color: ${GrayScale.MiddleGray};
        }
      }
    }
    @media screen and (max-width: 770px) {
      width: calc(100% - 20px);
    }
  `,
};

export default Modal;
