import React from "react";
import styled from "styled-components";
import { MainColor } from "../../assets/colorSystem";
import { Logo } from "../../assets/images";

const Header = (props) => {
  return (
    <Styles.Wrap admin={props.admin}>
      <Logo />
    </Styles.Wrap>
  );
};

// styled
const Styles = {
  Wrap: styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.admin ? MainColor : "#fff")};
    position: sticky;
    top: 0;
    svg {
      path {
        fill: ${(props) => props.admin && "#fff"};
      }
    }
  `,
};

export default Header;
