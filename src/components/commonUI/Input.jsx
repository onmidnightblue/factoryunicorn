import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import { AccentColor, GrayScale } from "../../assets/colorSystem";

const Input = forwardRef((props, ref) => {
  return (
    <Styles.Wrap {...props}>
      <label htmlFor={props.id}>
        {props.label}
        <span className="required">{props.required && "*"}</span>
        <span className="description">{props?.description}</span>
      </label>
      {props?.inputType ? (
        <textarea ref={ref} id={props.id} />
      ) : (
        <>
          <input
            type="text"
            placeholder={props?.placeholder}
            ref={ref}
            id={props.id}
          />
          {props.unit ? <span className="unit">{props.unit}</span> : ""}
        </>
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
        vertical-align: bottom;
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
      ${(props) =>
        props.medium &&
        css`
          width: 170px;
        `}
    }
    textarea {
      resize: none;
      height: 100px;
    }
    .unit {
      vertical-align: sub;
      margin-left: 6px;
      color: ${GrayScale.MiddleGray};
    }
  `,
};

export default Input;
