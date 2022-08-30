import React from "react";
import styled from "styled-components";
import { GrayScale, MainColor } from "../../assets/colorSystem";

const Radio = (props) => {
  return (
    <Styles.Radio>
      <input
        type="radio"
        id={props.id}
        name={props.name}
        value={props.title}
        defaultChecked={props?.checked}
        onChange={props.getValue}
      />
      <label htmlFor={props.id}>{props.title}</label>
    </Styles.Radio>
  );
};

// styled
const Styles = {
  Radio: styled.div`
    display: inline-block;
    margin-right: 30px;
    cursor: pointer;
    input[type="radio"] {
      appearance: none;
      width: 16px;
      height: 16px;
      background-clip: content-box;
      border: 1px solid ${GrayScale.MiddleGray};
      border-radius: 50%;
      padding: 2px;
      vertical-align: text-bottom;
      margin: 0;
      cursor: pointer;
      &:checked {
        border: 1px solid ${MainColor};
        background-color: ${MainColor};
        & + label {
          color: ${MainColor};
        }
      }
    }
    label {
      color: ${GrayScale.MiddleGray};
      margin-left: 6px;
      cursor: pointer;
    }
  `,
};

export default Radio;
