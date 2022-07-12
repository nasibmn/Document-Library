import React from "react";
import MainStyle from "./Main.styled";
import Documents from "../../components/Documents/Docuements";

const Main = () => {
  return (
    <>
      <MainStyle />
      <div className="container">
        <Documents />
      </div>
    </>
  );
};

export default Main;
