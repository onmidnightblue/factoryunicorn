import React, { useState } from "react";
import styled from "styled-components";
import { GrayScale, MainColor } from "../../assets/colorSystem";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  return (
    <>
      <Styles.Form>
        <div className="input-wrap">
          <label htmlFor="phone">휴대폰 번호</label>
          <input type="text" id="phone" />
        </div>
        <button>조회</button>
      </Styles.Form>
      {users.length === 0 ? (
        <Styles.Empty>
          <p>확인하고 싶은 사용자의 휴대폰 번호를 입력해주세요.</p>
        </Styles.Empty>
      ) : (
        <Styles.List>
          <li>사용자 정보</li>
        </Styles.List>
      )}
    </>
  );
};

// styled
const Styles = {
  Form: styled.form`
    max-width: 570px;
    display: grid;
    grid-template-columns: auto 170px;
    column-gap: 30px;
    margin: 0 auto;
    margin-bottom: 60px;
    .input-wrap {
      label {
        color: ${GrayScale.MiddleGray};
        display: block;
        margin-bottom: 10px;
      }
      input {
        border-radius: 100px;
        border: 1px solid ${GrayScale.MiddleGray};
        padding: 12px;
        width: 100%;
        box-sizing: border-box;
      }
    }
    button {
      margin-top: 24px;
      border-radius: 100px;
      background-color: ${MainColor};
      border: none;
      color: #fff;
    }
  `,
  List: styled.ul`
    width: 100%;
    border-top: 1px solid ${GrayScale.MiddleGray};
    border-bottom: 1px solid ${GrayScale.MiddleGray};
  `,
  Empty: styled.div`
    width: 100%;
    border-top: 1px solid ${GrayScale.MiddleGray};
    border-bottom: 1px solid ${GrayScale.MiddleGray};
    p {
      padding: 130px 0;
      text-align: center;
      color: ${GrayScale.MiddleGray};
    }
  `,
};

export default UserManagement;
