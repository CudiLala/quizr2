import React from "react";
import styles from "./Forms.module.css";
import Box from "components/Boxes";
import { Button } from "components/PseudoButtons";
import { LinkA } from "components/Links";

const SignInForm: React.FC = () => {
  return (
    <form className={`${styles.SignInForm} box-width`} autoComplete="off">
      <legend className="t-bold">Sign In</legend>
      <Box size={[4, 0]} _className={`${styles.InputContainer}`}>
        <label>Username/Email:</label>
        <Box size={[0]} _className={`${styles.InputBox}`}>
          <input type="text" name="text" />
        </Box>
      </Box>
      <Box size={[2, 0, 4]} _className={`${styles.InputContainer}`}>
        <label>Password:</label>
        <Box size={[0]} _className={`${styles.InputBox}`}>
          <input type="password" name="password" />
        </Box>
      </Box>
      <Box size={[2, 0]}>
        <Button type="submit" colored>
          Sign In
        </Button>
      </Box>
      <LinkA href="/sign?d=up" _className={styles.Link}>
        Don&apos;t have an account ?
      </LinkA>
    </form>
  );
};

export default SignInForm;
