import React from "react";
import { HeaderA } from "components/headers";

export const LayoutA: React.FC = ({ children }) => {
  return (
    <>
      <HeaderA />
      <main>{children}</main>
    </>
  );
};
