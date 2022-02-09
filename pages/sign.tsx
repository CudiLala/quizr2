import { LayoutA } from "components/Layout";
import { NextPageWithLayout } from "types/app";
import { SignInForm } from "components/Forms";
import Box from "components/Boxes";
import { useEffect, useState, useLayoutEffect } from "react";
import { useRouter } from "next/router";

type Props = "signIn" | "signUp";

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
    else setForm("signIn");
  }, [route]);

  return (
    <section>
      <Box _className="content-width">
        <SignInForm form={form} />
      </Box>
    </section>
  );
};

SignInPage.getLayout = LayoutA;

export default SignInPage;
