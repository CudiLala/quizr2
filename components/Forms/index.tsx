import styles from "./Forms.module.css";
import { EyeCloseIcon, EyeOpenIcon } from "components/Icons";
import Box from "components/Boxes";
import React, { useState } from "react";

interface InputrProps {
  id: string;
  type?: React.HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  passProps?: {};
  label: string;
}
interface PasswordInputrProps {
  id: string;
  name: string;
  placeholder?: string;
  passProps?: {};
  label: string;
}

export const Inputr: React.FC<InputrProps> = ({
  type,
  name,
  id,
  passProps,
  placeholder = "",
  label,
}) => {
  return (
    <Box size={[2, 0]} _className={`${styles.InputContainer}`} column>
      <label htmlFor={id}>{label}:</label>
      <Box size={[0]} _className={`${styles.InputBox}`}>
        <input
          type={type}
          name={name}
          id={id}
          required
          placeholder={placeholder}
          {...passProps}
        />
      </Box>
    </Box>
  );
};

export const PasswordInputr: React.FC<PasswordInputrProps> = ({
  name,
  id,
  passProps,
  placeholder = "",
  label,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <Box size={[2, 0]} _className={`${styles.InputContainer}`} column>
      <label htmlFor={id}>{label}:</label>
      <Box size={[0]} _className={`${styles.InputBox}`}>
        <input
          type={visible ? "text" : "password"}
          name={name}
          id={id}
          required
          placeholder={placeholder}
          {...passProps}
        />
        <Box
          size={[0]}
          _className={styles.EyeIconBox}
          passProps={{
            onClick: () => setVisible((type) => !type),
            onKeyDown: (ev: React.KeyboardEvent) =>
              ev.key === "Enter" && setVisible((type) => !type),
            tabIndex: 0,
          }}
        >
          {visible ? <EyeCloseIcon /> : <EyeOpenIcon />}
        </Box>
      </Box>
    </Box>
  );
};

export { default as QuizSearchForm } from "./QuizSearchForm";
export { SignInForm } from "./SignForm";
export { SignUpForm } from "./SignForm";
