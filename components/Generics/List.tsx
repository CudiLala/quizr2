import React from "react";
import Box from "components/Boxes";
import styles from "./List.module.css";
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

export const LinkList: React.FC<{ href: string }> = ({
  children,
  href = "#",
}) => {
  return (
    <>
      {React.Children.map(children, (child, idx) => {
        return (
          <Link href={href}>
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
