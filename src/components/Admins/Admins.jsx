import React, { useState } from "react";
import styled from "styled-components";
import { GrayScale, MainColor } from "../../assets/colorSystem";
import InquiryManagement from "./InquiryManagement";
import UserManagement from "./UserManagement";

const Admins = () => {
  const [tabIndex, setTabIndex] = useState(0);

  // tab
  const goToAnotherTabHandler = (index) => {
    setTabIndex(index);
  };

  // inquiry tab
  const tabs = [
    {
      title: "사용자 정보",
      content: <UserManagement />,
    },
    {
      title: "문의 정보",
      content: <InquiryManagement />,
    },
  ];

  return (
    <Styles.Wrap>
      <h3>라벨 제작 요청 조회</h3>
      <ul className="tabs">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={index === tabIndex ? "on" : ""}
            onClick={() => goToAnotherTabHandler(index)}
          >
            {tab.title}
          </li>
        ))}
      </ul>
      <div className="content">{tabs[tabIndex].content}</div>
    </Styles.Wrap>
  );
};

// styled
const Styles = {
  Wrap: styled.div`
    max-width: 770px;
    margin: 0 auto;
    h3 {
      text-align: center;
      font-weight: normal;
      margin: 40px 0;
    }
    .tabs {
      display: flex;
      justify-content: center;
      li {
        width: 170px;
        text-align: center;
        margin: 0 15px;
        padding: 8px 0;
        border-bottom: 2px solid ${GrayScale.MiddleGray};
        color: ${GrayScale.MiddleGray};
        cursor: pointer;
        &.on {
          border-bottom: 2px solid ${MainColor};
          color: ${MainColor};
        }
      }
    }
    .content {
      margin-top: 40px;
    }
    @media screen and (max-width: 770px) {
      padding: 0 10px;
    }
  `,
};

export default Admins;
