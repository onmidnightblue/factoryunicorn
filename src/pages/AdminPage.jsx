import React from "react";
import Admins from "../components/Admins/Admins";
import Header from "../components/commonUI/Header";

const AdminPage = () => {
  return (
    <>
      <Header admin={true} />
      <Admins />
    </>
  );
};

export default AdminPage;
