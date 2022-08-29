import React, { forwardRef } from "react";
import styled from "styled-components";
import { AccentColor, GrayScale } from "../../assets/colorSystem";

const Input = forwardRef((props, ref) => {
  return (
    <Styles.Wrap>
      <label htmlFor={props.id}>
        {props.label}
        <span className="required">{props.required && "*"}</span>
        <span className="description">{props?.description}</span>
      </label>
      {props?.inputType ? (
        <textarea />
      ) : (
        <input
          type="text"
          placeholder={props?.placeholder}
          ref={ref}
          id={props.id}
        />
      )}
    </Styles.Wrap>
  );
});

// styled
const Styles = {
  Wrap: styled.div`
    label {
      display: inline-block;
      width: 100%;
      margin-bottom: 20px;
      .required {
        color: ${AccentColor};
        margin-left: 4px;
        font-size: 16px;
        font-weight: bold;
        vertical-align: middle;
      }
      .description {
        margin-left: 10px;
        font-size: 12px;
        color: ${GrayScale.MiddleGray};
      }
    }
    input,
    textarea {
      border: 1px solid ${GrayScale.MiddleGray};
      padding: 8px;
      border-radius: 6px;
      width: 100%;
      box-sizing: border-box;
      &::placeholder {
        color: ${GrayScale.MiddleGray};
      }
    }
    textarea {
      resize: none;
    }
  `,
};

export default Input;
