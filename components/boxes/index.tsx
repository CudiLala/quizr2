import React from "react";
import { DefaultProps } from "types/app";

interface Props extends DefaultProps {
  size?: [number, number?, number?, number?];
  column?: boolean;
}

const Box: React.FC<Props> = ({
  children,
  size = [8],
  column,
  _className = "",
  _style = {},
  passProps = {},
}) => {
  const Style: React.CSSProperties = { padding: "", display: "flex" };
  if (size)
    size.forEach((num, idx) => {
      Style.padding = Style.padding?.toString() + `${num! * 0.125}rem `;
    });
  if (column) Style.flexDirection = "column";
  return (
    <div
      className={`${_className}`}
      style={{ ...Style, ..._style }}
      {...passProps}
    >
      {children}
    </div>
  );
};

export default Box;
