import React from "react";
import Box from "components/boxes";
import styles from "styles/components/lists.module.css";
import Link from "next/link";

const List: React.FC = ({ children }) => {
  return (
    <>
      {React.Children.map(children, (child, idx) => {
        return (
          <Box size={[4]} _className={styles.List}>
            <Box size={[0, 4]}>
              <div className={styles.Counter}>{idx + 1}</div>
            </Box>
            <Box size={[0, 4]}>{child}</Box>
          </Box>
        );
      })}
    </>
  );
};

export const LinkList: React.FC = ({ children }) => {
  return (
    <>
      {React.Children.map(children, (child, idx) => {
        return (
          //@ts-ignore
          <Link href={child.props.passhref}>
            <a style={{ display: "block" }}>
              <Box size={[4]} _className={styles.List}>
                <Box size={[0, 4]}>
                  <div className={styles.Counter}>{idx + 1}</div>
                </Box>
                <Box size={[0, 4]}>{child}</Box>
              </Box>
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default List;
