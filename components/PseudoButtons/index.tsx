import React, { useState } from "react";
import { DefaultProps } from "types/app";
import styles from "./PseudoButtons.module.css";

const Button: React.FC<DefaultProps> = ({
  children,
  _className = "",
  _style = {},
  passProps = {},
}) => {
  return <span className={styles.Button}>{children}</span>;
};

export default Button;

interface DescProps extends DefaultProps {
  icon: React.ReactElement;
  title: string;
  colors: [string, string];
}

export const DescButton: React.FC<DescProps> = ({
  icon,
  title,
  _className = "",
  _style = {},
  passProps = {},
  colors = ["white", "white"],
}) => {
  const [color, setColor] = useState(colors[0]);
  return (
    <span
      className={styles.DescButton}
      style={{ color: color, ..._style }}
      onMouseOver={() => setColor(colors[1])}
      onMouseOut={() => setColor(colors[0])}
      {...passProps}
    >
      <span
        className={styles.IconBox}
        style={{ backgroundColor: color, color: "white" }}
      >
        {icon}
      </span>
      <span style={{ color: color }} className={styles.Title}>
        {title.toLowerCase()}
      </span>
    </span>
  );
};

export const DescButton2: React.FC<DescProps> = ({
  icon,
  title,
  _className = "",
  _style = {},
  passProps = {},
  colors = ["white", "white"],
}) => {
  const [color, setColor] = useState(colors[0]);
  return (
    <span
      className={`${styles.DescButton2} ${_className}`}
      style={{ color: color, ..._style }}
      onMouseOver={() => setColor(colors[1])}
      onMouseOut={() => setColor(colors[0])}
      {...passProps}
    >
      <span
        className={styles.IconBox}
        style={{ backgroundColor: color, color: "white" }}
      >
        {icon}
      </span>
      <span style={{ color: color }} className={styles.Title}>
        {title.toLowerCase()}
      </span>
    </span>
  );
};
