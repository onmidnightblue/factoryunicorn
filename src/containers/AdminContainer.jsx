import React from "react";
import styled from "styled-components";
import Admins from "../components/Admin/Admins";
import Header from "../components/commonUI/Header";

const AdminContainer = () => {
  return (
    <>
      <Header admin={true} />
      <Admins />
    </>
  );
};

// styled
const Styles = {};

export default AdminContainer;
