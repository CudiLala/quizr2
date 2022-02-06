import React from "react";
import { DefaultProps } from "types/app";

interface Props extends DefaultProps {
  size?: [number, number?, number?, number?];
}

const Box: React.FC<Props> = ({
  children,
  size = [8],
  _className = "",
  _style = {},
  passProps = {},
}) => {
  const Style: React.CSSProperties = { padding: "" };
  if (size)
    size.forEach((num, idx) => {
      Style.padding = Style.padding?.toString() + `${num! * 0.125}rem `;
    });
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
