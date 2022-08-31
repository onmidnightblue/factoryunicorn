import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  AccentColor,
  BackGroundColor,
  MainColor,
} from "../../assets/colorSystem";
import useHttp from "../../hooks/useHttp";
import { checkedSize, checkedTrim } from "../../utils/checkedInput";
import { getTime } from "../../utils/getTime";
import Input from "../commonUI/Input";
import Radio from "../commonUI/Radio";

const InquiryForm = () => {
  const userNameRef = useRef();
  const userPhoneRef = useRef();
  const [tabIndex, setTabIndex] = useState(0);
  const [type, setType] = useState("");
  const [detailType, setDetailType] = useState(null);
  const locationRef = useRef();
  const bgcColorRef = useRef();
  const sizeRef = useRef();
  const quantityRef = useRef();
  const etcRef = useRef();
  const [submitForm, setSubmitForm] = useState(null);
  const { isLoading, error, sendRequest: sendFormRequest } = useHttp();

  // changed tab
  const goToAnotherTabHandler = (index) => {
    setTabIndex(index);
  };

  // get type detail value handler
  const getQualityHandler = (event) => {
    setDetailType((prevState) => {
      return { ...prevState, quality: event.target.value };
    });
  };
  const getShapeHandler = (event) => {
    setDetailType((prevState) => {
      return { ...prevState, shape: event.target.value };
    });
  };

  // get user's selected detail type data
  const getUserInquiryHandler = (event) => {
    event.preventDefault();

    const userName = checkedTrim(userNameRef.current?.value);
    const phone = checkedTrim(userPhoneRef.current?.value);
    const size = checkedSize(sizeRef.current?.value);
    const quantity = checkedTrim(quantityRef.current?.value);

    if (type === "케어 라벨") {
      const location = checkedTrim(locationRef.current?.value);
      if (location) {
        setDetailType((prevState) => {
          return { ...prevState, location };
        });
      }
    }
    if (type === "포인트 라벨") {
      const bgcColor = checkedTrim(bgcColorRef.current?.value);
      if (bgcColor) {
        setDetailType((prevState) => {
          return { ...prevState, bgcColor };
        });
      }
    }

    // get time
    const getSubmitTime = getTime();

    // gether form data
    if (userName && phone && type && detailType && size && quantity) {
      if (detailType?.quality) {
        if (detailType?.shape || detailType?.location || detailType?.bgcColor) {
          const getInfo = {
            userInfo: {
              userName,
              phone,
            },
            inquiryInfo: {
              time: getSubmitTime,
              type,
              detailType,
              size,
              quantity,
              etc: etcRef.current.value,
            },
          };
          setSubmitForm(getInfo);
        } else {
          console.log("error");
        }
      } else {
        console.log("error");
      }
    } else {
      console.log("error");
    }
  };

  // get user's selected type data
  useEffect(() => {
    setType(tabs[tabIndex].title);
  }, [tabIndex]);

  // post user's data
  useEffect(() => {
    if (!submitForm) return;
    if (submitForm) {
      sendFormRequest({
        url: "saveUser",
        method: "POST",
        data: { phone: submitForm.userInfo.phone },
      });
      sendFormRequest({
        url: "saveInquiry",
        method: "POST",
        data: submitForm,
      });
    }
  }, [submitForm]);

  // label type
  const tabs = [
    {
      title: "메인 라벨",
      content: (
        <>
          <Styles.TypeDetail>
            <span>재질</span>
            <div>
              <Radio
                id="weave"
                title="직조"
                name="quality"
                getValue={getQualityHandler}
              />
              <Radio
                id="silk"
                title="실크"
                name="quality"
                getValue={getQualityHandler}
              />
            </div>
            <span>형태</span>
            <div>
              <Radio
                id="double"
                title="양접이"
                name="shape"
                getValue={getShapeHandler}
              />
              <Radio
                id="half"
                title="반접이"
                name="shape"
                getValue={getShapeHandler}
              />
            </div>
          </Styles.TypeDetail>
        </>
      ),
    },
    {
      title: "케어 라벨",
      content: (
        <Styles.TypeDetail>
          <span>재질</span>
          <Radio
            id="silk"
            title="실크"
            name="quality"
            getValue={getQualityHandler}
          />
          <label htmlFor="location">부착 위치</label>
          <Styles.TypeDetailInput id={"location"} ref={locationRef} />
        </Styles.TypeDetail>
      ),
    },
    {
      title: "포인트 라벨",
      content: (
        <Styles.TypeDetail>
          <span>재질</span>
          <div>
            <Radio
              id="weave"
              title="직조"
              name="quality"
              getValue={getQualityHandler}
            />
            <Radio
              id="silk"
              title="실크"
              name="quality"
              getValue={getQualityHandler}
            />
          </div>
          <label htmlFor="bgcColor">배경 색상</label>
          <Styles.TypeDetailInput id="bgcColor" ref={bgcColorRef} />
        </Styles.TypeDetail>
      ),
    },
  ];

  return (
    <Styles.Wrap>
      {submitForm ? (
        <h3>라벨 제작 문의가 완료되었습니다.</h3>
      ) : (
        <>
          <h3>라벨을 제작하기 위해 아래 항목들을 입력해주세요.</h3>
          <form onSubmit={getUserInquiryHandler}>
            <div className="input-wrap">
              <div className="row user">
                <Input
                  id={"userName"}
                  ref={userNameRef}
                  label={"이름"}
                  required={true}
                  placeholder={"김철수"}
                />
                <Input
                  id={"userPhone"}
                  ref={userPhoneRef}
                  label={"휴대폰 번호"}
                  required={true}
                  placeholder={"010-1234-1234"}
                />
              </div>
              <div className="row type">
                <p>
                  라벨타입 <span className="required">*</span>
                </p>
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
              </div>
              <div className="row">
                <Input
                  id={"size"}
                  description={"가로와 세로 크기를 입력해주세요."}
                  ref={sizeRef}
                  label={"라벨 크기"}
                  required={true}
                  placeholder={"가로x세로"}
                  medium={true}
                  unit={"cm"}
                />
              </div>
              <div className="row">
                <Input
                  id={"quantity"}
                  description={
                    "최소 주문 수량은 1000장이며 500장 단위로 입력해주세요."
                  }
                  ref={quantityRef}
                  label={"수량"}
                  required={true}
                  placeholder={"1000"}
                  medium={true}
                  unit={"장"}
                />
              </div>
              <div className="row">
                <Input
                  id={"etc"}
                  description={
                    "이외에 참고해야 할 사항이 있다면 자유롭게 작성해주시면 됩니다."
                  }
                  ref={etcRef}
                  label={"요청 사항"}
                  required={false}
                  placeholder={"1000"}
                  inputType={"textarea"}
                />
              </div>
            </div>
            <button>제작 요청</button>
          </form>
        </>
      )}
    </Styles.Wrap>
  );
};

// styled
const Styles = {
  Wrap: styled.div`
    max-width: 630px;
    margin: 0 auto;
    h3 {
      text-align: center;
      font-weight: normal;
      margin: 40px 0;
    }
    form {
      text-align: center;
      .input-wrap {
        text-align: left;
        border-radius: 6px;
        background-color: ${BackGroundColor};
        padding: 30px;
        .row {
          margin-bottom: 60px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .user {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          column-gap: 30px;
        }
        .type {
          p {
            margin-bottom: 20px;
            .required {
              color: ${AccentColor};
              margin-left: 4px;
              font-size: 16px;
              font-weight: bold;
              vertical-align: middle;
            }
          }
          .tabs {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            column-gap: 30px;
            margin-bottom: 60px;
            li {
              border-radius: 6px;
              padding: 18px 0;
              text-align: center;
              border: 1px solid ${MainColor};
              background-color: #fff;
              color: ${MainColor};
              cursor: pointer;
              &.on {
                background-color: ${MainColor};
                color: #fff;
              }
            }
          }
        }
      }
      button {
        width: 160px;
        height: 40px;
        border-radius: 100px;
        color: #fff;
        border: none;
        background-color: ${MainColor};
        margin: 60px 0;
        cursor: pointer;
      }
    }
    @media screen and (max-width: 770px) {
      padding: 0 10px;
    }
  `,
  TypeDetail: styled.div`
    display: grid;
    grid-template-columns: 100px auto;
    row-gap: 20px;
  `,
  TypeDetailInput: styled(Input)`
    span {
      display: none;
    }
    label {
      margin-bottom: 0;
      display: block;
    }
  `,
};

export default InquiryForm;
