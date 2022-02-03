import Logo from "components/logo";
import Link from "next/link";
import React from "react";
import { DefaultProps } from "types/app";
import styles from "./Links.module.css";

interface Props extends DefaultProps {
  href?: string;
}

export const LinkLogo: React.FC<Props> = ({
  href = "#",
  _className = "",
  _style = {},
  passProps = {},
}) => {
  return (
    <Link href="/">
      <a
        className={`${_className} ${styles.LinkLogo}`}
        style={{ ..._style }}
        {...passProps}
      >
        <Logo />
      </a>
    </Link>
  );
};

export const LinkA: React.FC<Props> = ({
  children,
  href = "#",
  _className = "",
  _style = {},
  passProps = {},
}) => {
  return (
    <Link href={href}>
      <a className={`${_className}`} style={{ ..._style }} {...passProps}>
        {children}
      </a>
    </Link>
  );
};
