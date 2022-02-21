import styles from "./Group.module.css";
import Box from "components/Boxes";
import React from "react";
import { DefaultProps } from "types/app";

const Group: React.FC<DefaultProps> = ({
  children,
  _className = "",
  _style = {},
  passProps = {},
}) => {
  return (
    <Box
      size={[6]}
      column
      _className={`${styles.Group} ${_className}`}
      _style={{ ..._style }}
      {...passProps}
    >
      {children}
    </Box>
  );
};
export default Group;

export const GroupHeading: React.FC<DefaultProps> = ({
  children,
  _className = "",
  _style = {},
  passProps = {},
}) => {
  return (
    <Box
      size={[0, 2]}
      _className={`${styles.Heading} ${_className}`}
      _style={{ ..._style }}
      {...passProps}
    >
      <span className="t-bold">{children}</span>
    </Box>
  );
};
