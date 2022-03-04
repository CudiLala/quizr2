import React from "react";

export const NeonDivider: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "0.2rem",
        backgroundColor: "var(--color-light-a)",
        boxShadow: "0 0 2px rgba(255, 255, 255, 0.1)",
      }}
    ></div>
  );
};
