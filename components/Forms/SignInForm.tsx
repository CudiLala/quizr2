import React, { useState } from "react";
import styles from "./Forms.module.css";
import Box from "components/Boxes";
import { Button } from "components/PseudoButtons";
import { LinkA } from "components/Links";
import { Inputr, PasswordInputr } from ".";

interface SignInFormProps {
  form: "signIn" | "signUp";
}

const SignInForm: React.FC<SignInFormProps> = ({ form }) => {
  if (form === "signUp") return <SignUpForm />;
  return (
    <form className={`${styles.SignInForm} box-width`} autoComplete="off">
      <legend className="t-bold">Sign In</legend>
      <Box size={[4, 0]}>
        <Inputr type="text" name="user" id="user" label="Username/Email" />
        <PasswordInputr name="password" id="password" label="Password" />
        <Box size={[2, 0]}>
          <Button type="submit">Sign In</Button>
        </Box>
        <LinkA href="/sign?d=up" _className={styles.Link}>
          Don&apos;t have an account ?
        </LinkA>
      </Box>
    </form>
  );
};

export default SignInForm;

type stage = "usernameStage" | "passwordStage" | "profilePictureStage";

const SignUpForm: React.FC = () => {
  const [stage, setStage] = useState<stage>("usernameStage");
  return (
    <form className={`${styles.SignInForm} box-width`} autoComplete="off">
      <legend className="t-bold">Sign Up</legend>
      <Box size={[4, 0]}>
        {stage === "usernameStage" && (
          <>
            <Box size={[2, 0]}>
              <p style={{ fontSize: "0.9rem", color: "var(--color-green)" }}>
                Hi, thanks for joining us. To sign up, first enter a username
                and email of your choice below &#128071;.
              </p>
            </Box>
            <Inputr
              type="text"
              name="username"
              id="username"
              placeholder="Choose a username"
              label="Username"
            />
            <Inputr
              type="email"
              name="email"
              id="email"
              placeholder="Choose an email"
              label="Email"
            />
            <Box size={[2, 0]}>
              <Button
                type="button"
                passProps={{ onClick: () => setStage("passwordStage") }}
              >
                Next
              </Button>
            </Box>
          </>
        )}
        {stage === "passwordStage" && (
          <>
            <Box size={[2, 0]}>
              <p style={{ fontSize: "0.9rem", color: "var(--color-green)" }}>
                Now, choose a secure password that you can always remeber.
              </p>
            </Box>
            <PasswordInputr name="password" id="password" label="Password" />
            <PasswordInputr
              name="password"
              id="password"
              label="Confirm Password"
            />
            <Box size={[2, 0]}>
              <Button
                type="button"
                passProps={{ onClick: () => setStage("profilePictureStage") }}
              >
                Next
              </Button>
            </Box>
          </>
        )}
        {stage === "profilePictureStage" && (
          <>
            <Box size={[2, 0]}>
              <p style={{ fontSize: "0.9rem", color: "var(--color-green)" }}>
                Choose a profile picture, then Sign up.
              </p>
              <Box size={[2, 0]}>
                <Button type="submit">Sign Up</Button>
              </Box>
            </Box>
          </>
        )}
        <LinkA href="/sign" _className={styles.Link}>
          Already have an account ?
        </LinkA>
      </Box>
    </form>
  );
};
