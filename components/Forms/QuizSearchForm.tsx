import Box from "components/Boxes";
import React, { useEffect, useState } from "react";
import { DefaultProps } from "types/app";
import styles from "./Forms.module.css";

interface PropOptions extends DefaultProps {
  name: string;
  selected?: boolean;
  setSelected?: React.Dispatch<React.SetStateAction<Selection>>;
}
interface Selection {
  name: string;
  mode: "ascending" | "descending";
}

const QuizSearchForm: React.FC = () => {
  return (
    <form className={styles.QuizSearchForm} autoComplete="off">
      <Box _className={styles.InputContainer} size={[4, 0]}>
        <label>Search:</label>
        <Box _className={styles.InputBox} size={[1, 0, 0]}>
          <input type="text" />
        </Box>
      </Box>
      <Box size={[2, 0, 4]} _className={styles.InputContainer}>
        <label>Sort By:</label>
        <Selection>
          <Options name="popularity">Popularity</Options>
          <Options name="difficulty">Difficulty</Options>
          <Options name="alphabetically">A-Z</Options>
        </Selection>
      </Box>
    </form>
  );
};

export default QuizSearchForm;

const Selection: React.FC = ({ children }) => {
  const [selected, setSelected] = useState<Selection>();

  /* eslint-disable */
  useEffect(() => {
    React.Children.forEach(
      children,
      (child, idx) =>
        //@ts-ignore
        idx === 0 && setSelected({ name: child?.props.name, mode: "ascending" })
    );
  }, []);
  /*eslint-enable */

  return (
    <div className={styles.Selection}>
      {React.Children.map(children, (child, idx) => {
        //@ts-ignore
        const option = React.cloneElement(child, {
          setSelected,
          //@ts-ignore
          selected: selected?.name === child?.props.name,
        });
        return option;
      })}
    </div>
  );
};

const Options: React.FC<PropOptions> = ({
  children,
  name,
  selected,
  setSelected,
}) => {
  return (
    <div
      className={`${styles.Options} ${selected ? styles.Selected : ""}`}
      onClick={() =>
        !!setSelected && setSelected({ name: name, mode: "ascending" })
      }
    >
      {children}
    </div>
  );
};
