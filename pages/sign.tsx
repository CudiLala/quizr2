import { LayoutA } from "components/layouts";
import { NextPageWithLayout } from "types/app";
import { SignInForm, SignUpForm } from "components/forms";
import Box from "components/boxes";
import { useEffect, useState, useLayoutEffect, useContext } from "react";
import { useRouter } from "next/router";
import { deleteFetcher } from "utils/fetchers";
import Cookies from "js-cookie";
import { SetLoginContext } from "components/app/AppWrapper";
import { LoaderContext } from "components/app/AppWrapper";

type Props = "signIn" | "signUp" | "signOut";

const SignInPage: NextPageWithLayout = () => {
  const [form, setForm] = useState<Props>("signIn");
  const route = useRouter();

  useLayoutEffect(() => {
    const url = new URL(window.location.href);
    const query: { [key: string]: any } = {};

    url.searchParams.forEach((value, key) => {
      query[key] = value;
    });

    if (query["d"] === "up") setForm("signUp");
    else if (query["d"] === "out") setForm("signOut");
    else setForm("signIn");
  }, [route]);

  return (
    <section style={{ width: "100%", height: "100%" }}>
      <Box _className="content-width" column>
        {form === "signIn" && <SignInForm />}
        {form === "signUp" && <SignUpForm />}
        {form === "signOut" && <SignOutComponent />}
      </Box>
    </section>
  );
};

const SignOutComponent: React.FC = () => {
  const [msg, setMsg] = useState({ type: "normal", value: "Signing Out..." });
  const router = useRouter();
  const setLogin = useContext(SetLoginContext);
  const [runLoader, removeLoader] = useContext(LoaderContext);

  /*eslint-disable */
  useEffect(() => {
    let timer;
    (async () => {
      runLoader();
      const { data } = await deleteFetcher("/api/sign_out");
      if (!data || !data.success) {
        removeLoader();
        setMsg({
          type: "error",
          value: "There was an error while signing out",
        });
        timer = setTimeout(() => {
          setMsg({ type: "normal", value: "Redirecting..." });
          router.push("/");
        }, 3000);
      } else {
        setMsg({ type: "normal", value: "Clearing Storage and Cookies..." });
        localStorage.removeItem("user");
        Cookies.set("login", "", { expires: new Date(Date.now() - 86400000) });
        setLogin({ value: false });
        setMsg({ type: "normal", value: "Redirecting..." });
        router.push("/");
      }
    })();
    return clearTimeout(timer);
  }, []);
  /* eslint-enable */
  return (
    <Box _style={{ alignItems: "center", justifyContent: "flex-start" }} column>
      <h2
        className="t-bold"
        style={{
          textAlign: "center",
          fontSize: "2rem",
          padding: "0.5rem 1rem 1.5rem",
        }}
      >
        Good Bye
      </h2>
      <p
        style={{
          textAlign: "center",
          fontSize: "1.25rem",
          color: `${
            msg.type === "error" ? "var(--color-orange)" : "var(--color-green)"
          }`,
        }}
      >
        {msg.value}
      </p>
    </Box>
  );
};

SignInPage.getLayout = function ({ children }) {
  return <LayoutA>{children}</LayoutA>;
};

export default SignInPage;
