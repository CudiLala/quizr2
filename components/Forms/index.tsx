import styles from "./Forms.module.css";
import { EyeCloseIcon, EyeOpenIcon } from "components/Icons";
import Box from "components/Boxes";
import React, { useState } from "react";
import { DefaultProps } from "types/app";

interface InputrProps extends DefaultProps {
  id: string;
  type?: React.HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  passProps?: {};
  label: string;
}
interface PasswordInputrProps extends DefaultProps {
  id: string;
  name: string;
  placeholder?: string;
  passProps?: {};
  label: string;
}
interface TextAreaProps extends DefaultProps {
  id: string;
  name: string;
  placeholder?: string;
  passProps?: {};
  label: string;
  height?: string;
}

export const Inputr: React.FC<InputrProps> = ({
  type,
  name,
  id,
  passProps = {},
  placeholder = "",
  label,
  _className = "",
  _style = {},
}) => {
  return (
    <Box size={[2, 0]} _className={`${styles.InputContainer}`} column>
      <label htmlFor={id} className="t-sbold-x">
        {label}:
      </label>
      <Box size={[0]} _className={`${styles.InputBox}`}>
        <input
          type={type}
          name={name}
          id={id}
          required
          className={_className}
          style={{ ..._style }}
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
  passProps = {},
  placeholder = "",
  _className = "",
  _style = {},
  label,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <Box size={[2, 0]} _className={`${styles.InputContainer}`} column>
      <label htmlFor={id} className="t-sbold-x">
        {label}:
      </label>
      <Box size={[0]} _className={`${styles.InputBox}`}>
        <input
          type={visible ? "text" : "password"}
          name={name}
          id={id}
          required
          className={_className}
          style={{ ..._style }}
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

export const TextArea: React.FC<TextAreaProps> = ({
  name,
  id,
  passProps = {},
  _className = "",
  _style = {},
  placeholder = "",
  height = "10rem",
  label,
}) => {
  return (
    <Box size={[2, 0]} _className={`${styles.TextAreaContainer}`} column>
      <label htmlFor={id} className="t-sbold-x">
        {label}:
      </label>
      <Box size={[0]} _className={`${styles.TextAreaBox}`}>
        <textarea
          name={name}
          id={id}
          {...passProps}
          className={_className}
          style={{ height, ..._style }}
          placeholder={placeholder}
        />
      </Box>
    </Box>
  );
};

export { default as QuizSearchForm } from "./QuizSearchForm";
export { SignInForm } from "./SignForm";
export { SignUpForm } from "./SignForm";
