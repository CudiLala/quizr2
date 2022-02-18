import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Forms.module.css";
import Box from "components/Boxes";
import { Button } from "components/PseudoButtons";
import { LinkA } from "components/Links";
import { Inputr, PasswordInputr } from ".";
import { postFetcher } from "utils/fetchers";
import { SetLoginContext } from "components/App/AppWrapper";

export const SignInForm: React.FC = () => {
  const user = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState({ type: "normal", value: "" });
  const setLogin = useContext(SetLoginContext);

  function runError(error: any) {
    //@ts-ignore
    if (error.name) document.signIn[error.name].focus();
    setMsg({ type: "error", value: error.message });
  }

  async function loginUser(ev: any) {
    ev.preventDefault();
    setMsg({ type: "normal", value: "Loading..." });
    const { data } = await postFetcher("/api/sign_in", {
      user: user.current?.value,
      password: password.current?.value,
    });
    if (!data)
      return runError({ name: "", message: "An unknown error occured" });
    if (!data.success) return runError(data.error);

    //changing the login global state for rerendering and user refetching
    setLogin({ value: true });
    setMsg({ type: "normal", value: "Login successful" });
  }

  useEffect(() => {
    setMsg({
      type: "normal",
      value: "Welcome back \u{1F60A}",
    });
  }, []);

  return (
    <form
      className={`${styles.SignInForm} box-width`}
      name="signIn"
      autoComplete="off"
      onSubmit={loginUser}
    >
      <legend className="t-bold">Sign In</legend>
      <Box size={[2, 0]} column>
        <p
          style={{
            fontSize: "0.9rem",
            color: `${
              msg.type === "normal"
                ? "var(--color-green)"
                : "var(--color-orange)"
            }`,
          }}
        >
          {msg.value}
        </p>
      </Box>
      <Box size={[2, 0]} column>
        <Inputr
          type="text"
          name="user"
          id="user"
          label="Username/Email"
          placeholder="Enter your username"
          passProps={{ ref: user }}
        />
        <PasswordInputr
          name="password"
          id="password"
          label="Password"
          placeholder="Enter your password"
          passProps={{ ref: password }}
        />
        <Box size={[2, 0]}>
          <Button type="submit" _className="t-sbold-x">
            Sign In
          </Button>
        </Box>
        <Box size={[0]}>
          <LinkA href="/sign?d=up" _className={styles.Link}>
            Don&apos;t have an account ?
          </LinkA>
        </Box>
      </Box>
    </form>
  );
};

export const SignUpForm: React.FC = () => {
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState({ type: "normal", value: "" });
  const setLogin = useContext(SetLoginContext);

  function runError(error: any) {
    //@ts-ignore
    if (error.name) document.signUp[error.name].focus();
    setMsg({ type: "error", value: error.message });
  }

  async function registerUser(ev: any) {
    ev.preventDefault();
    setMsg({ type: "normal", value: "Loading..." });

    //Registering
    setMsg({ type: "normal", value: "Registering..." });
    const { data } = await postFetcher("api/sign_up", {
      username: username.current?.value,
      email: email.current?.value,
      password: password.current?.value,
      confirmPassword: confirmPassword.current?.value,
    });
    if (!data)
      return runError({ name: "", message: "An unknown error occured" });
    if (!data.success) return runError(data.error);
    setMsg({ type: "normal", value: "Registration successful. Logging in..." });

    //logging in
    const { data: loginData } = await postFetcher("/api/sign_in", {
      user: username.current?.value,
      password: password.current?.value,
    });
    if (!loginData)
      return runError({ name: "", message: "An unknown error occured" });
    if (!loginData.success) return runError(loginData.error);

    //changing the login global state for rerendering and refetching of user
    setLogin({ value: true });
    setMsg({ type: "normal", value: "Login successful" });
  }

  useEffect(() => {
    setMsg({
      type: "normal",
      value: "Thanks for joining us, put in your details below. \u{1F447}",
    });
  }, []);

  return (
    <form
      className={`${styles.SignInForm} box-width`}
      autoComplete="off"
      name="signUp"
      onSubmit={registerUser}
    >
      <legend className="t-bold">Sign Up</legend>
      <Box size={[2, 0]} column>
        <p
          style={{
            fontSize: "0.9rem",
            color: `${
              msg.type === "normal"
                ? "var(--color-green)"
                : "var(--color-orange)"
            }`,
          }}
        >
          {msg.value}
        </p>
      </Box>
      <Box size={[2, 0]} column>
        <Inputr
          type="text"
          name="username"
          id="username"
          placeholder="Choose a username"
          label="Username"
          passProps={{ ref: username }}
        />
        <Inputr
          type="email"
          name="email"
          id="email"
          placeholder="Choose an email"
          label="Email"
          passProps={{ ref: email }}
        />

        <PasswordInputr
          name="password"
          id="password"
          label="Password"
          placeholder="Choose a password"
          passProps={{ ref: password }}
        />
        <PasswordInputr
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm password"
          passProps={{ ref: confirmPassword }}
        />
        <Box size={[2, 0]}>
          <Button type="submit" _className="t-sbold-x">
            Sign Up
          </Button>
        </Box>
        <Box size={[0]}>
          <LinkA href="/sign" _className={styles.Link}>
            Already have an account ?
          </LinkA>
        </Box>
      </Box>
    </form>
  );
};
