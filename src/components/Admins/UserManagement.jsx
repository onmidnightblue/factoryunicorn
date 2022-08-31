import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GrayScale, MainColor } from "../../assets/colorSystem";
import useHttp from "../../hooks/useHttp";
import { checkedPhone } from "../../utils/checkedInput";

const UserManagement = () => {
  const [findedUsers, setFindedUsers] = useState(null);
  const [userPhone, setUserPhone] = useState("");
  const phoneRef = useRef();
  const { sendRequest: fetchUsers } = useHttp();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (checkedPhone(phoneRef.current.value)) {
      setUserPhone(phoneRef.current.value);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    if (!userPhone) return;
    const transformUsers = (datas) => {
      const getUsers = Object.values(datas.inquiries);
      setFindedUsers(getUsers);
    };

    fetchUsers(
      {
        url: "getUser",
        method: "GET",
        params: { phone: userPhone },
      },
      transformUsers
    );
  }, [userPhone]);

  return (
    <>
      <Styles.Form onSubmit={onSubmitHandler}>
        <div className="input-wrap">
          <label htmlFor="phone">휴대폰 번호</label>
          <input
            type="text"
            id="phone"
            ref={phoneRef}
            placeholder="010-1234-1234"
          />
        </div>
        <button>조회</button>
      </Styles.Form>
      {userPhone.length === 0 ? (
        <Styles.Empty>
          <p>사용자의 휴대폰 번호를 입력해주세요.</p>
        </Styles.Empty>
      ) : (
        <Styles.List>
          <li className="th">
            <div>번호</div>
            <div>uid</div>
          </li>
          {findedUsers?.length === 0 ? (
            <li className="empty">
              <div>찾으시는 번호의 사용자 정보가 없습니다.</div>
            </li>
          ) : (
            findedUsers?.map((user, index) => (
              <li key={index}>
                <div>{index + 1}</div>
                <div>{user}</div>
              </li>
            ))
          )}
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
        &::placeholder {
          color: ${GrayScale.MiddleGray};
        }
      }
    }
    button {
      margin-top: 24px;
      border-radius: 100px;
      background-color: ${MainColor};
      border: none;
      color: #fff;
      cursor: pointer;
    }
  `,
  List: styled.ul`
    width: 100%;
    border-top: 1px solid ${GrayScale.MiddleGray};
    border-bottom: 1px solid ${GrayScale.MiddleGray};
    li {
      width: 100%;
      border-bottom: 1px solid ${GrayScale.LightGray};
      display: grid;
      grid-template-columns: 20% auto;
      div {
        height: 36px;
        padding-left: 10px;
        color: ${GrayScale.MiddleGray};
        display: flex;
        align-items: center;
      }
      &:last-child {
        border-bottom: none;
      }
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
      &.empty {
        display: block;
        div {
          justify-content: center;
        }
      }
    }
  `,
  Empty: styled.div`
    width: 100%;
    border-top: 1px solid ${GrayScale.MiddleGray};
    border-bottom: 1px solid ${GrayScale.MiddleGray};
    p {
      padding: 28px 0;
      text-align: center;
      color: ${GrayScale.MiddleGray};
    }
  `,
};

export default UserManagement;
