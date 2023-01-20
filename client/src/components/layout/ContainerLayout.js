import React from "react";
import { Outlet } from "react-router-dom";
import Alert from "./Alert";

const ContainerLayout = () => {
  return (
    <section className="container">
      <Outlet />
    </section>
  );
};

export default ContainerLayout;
