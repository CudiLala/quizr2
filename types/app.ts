import type { NextPage } from "next";
import type { AppProps } from "next/app";
import React from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: React.FC;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export interface DefaultProps {
  _style?: React.CSSProperties;
  _className?: string;
  passProps?: {};
}
