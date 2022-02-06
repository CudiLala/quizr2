import Box from "components/Boxes";
import React from "react";
import styles from "./Forms.module.css";

export const QuizSearchForm: React.FC = () => {
  return (
    <form className={styles.QuizSearchForm}>
      <Box _className={styles.InputContainer} size={[0, 0, 4]}>
        <label>Search:</label>
        <Box _className={styles.InputBox} size={[1, 0, 0]}>
          <input type="text" />
        </Box>
      </Box>
      <Box size={[0, 0, 4]} _className={styles.InputContainer}>
        <label>Sort By:</label>
        <Selection>
          <Options>Difficulty</Options>
          <Options>Popularity</Options>
          <Options>A-Z</Options>
        </Selection>
      </Box>
    </form>
  );
};

const Selection: React.FC = ({ children }) => {
  return <div className={styles.Selection}>{children}</div>;
};
const Options: React.FC = ({ children }) => {
  return <div className={styles.Options}>{children}</div>;
};
