import { LayoutA } from "components/Layout";
import { NextPageWithLayout } from "types/app";
import { SignInForm } from "components/Forms";
import Box from "components/Boxes";
import { useEffect, useState } from "react";

const SignInPage: NextPageWithLayout = () => {
  const [form, setForm] = useState("signIn");

  return (
    <section>
      <Box size={[16, 8]} _className="content-width">
        {form === "signIn" && <SignInForm />}
        {form === "singUp" && <></>}
      </Box>
    </section>
  );
};

SignInPage.getLayout = LayoutA;

export default SignInPage;
