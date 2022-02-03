import React from "react";
import { LogoA, LogoB } from "./Icons";

const Logo: React.FC = () => {
  return (
    <span id="logo" style={{ display: "flex", justifyContent: "flex-start" }}>
      <span style={{ width: "1.5rem", display: "flex", color: "currentcolor" }}>
        <LogoA />
      </span>
      <span style={{ width: "4.5rem", display: "flex", color: "currentcolor" }}>
        <LogoB />
      </span>
    </span>
  );
};

export default Logo;
