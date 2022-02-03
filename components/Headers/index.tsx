import React, { useEffect, useState } from "react";
import styles from "./Headers.module.css";
import { LinkLogo, LinkA } from "components/Links";
import {
  AboutIcon,
  LeaderBoardIcon,
  MenuIcon,
  SignInIcon,
  SignUpIcon,
} from "components/Icons";
import { DescButton, DescButton2 } from "components/PseudoButtons";

export const HeaderA: React.FC = () => {
  const [width, setWidth] = useState(0);

  const resizeHandler = () => setWidth(window.innerWidth);

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  });
  return (
    <header className={styles.HeaderA}>
      <div className={`content-width ${styles.Marger}`}>
        <div className={`${styles.LogoContainer}`}>
          <LinkLogo />
        </div>
        {width >= 768 ? (
          <nav className={styles.Nav}>
            <ul>
              <li>
                <LinkA>
                  <DescButton
                    icon={<AboutIcon />}
                    title="About"
                    colors={["hsl(200, 100%, 50%)", "hsl(200, 100%, 65%)"]}
                  />
                </LinkA>
              </li>
              <li>
                <LinkA>
                  <DescButton
                    icon={<LeaderBoardIcon />}
                    title="leaderBoards"
                    colors={["hsl(310, 100%, 80%)", "hsl(310, 100%, 85%)"]}
                  />
                </LinkA>
              </li>
              <li>
                <LinkA>
                  <DescButton
                    icon={<SignInIcon />}
                    title="Sign In"
                    colors={["hsl(39, 100%, 50%)", "hsl(39, 100%, 60%)"]}
                  />
                </LinkA>
              </li>
              <li>
                <LinkA>
                  <DescButton
                    icon={<SignUpIcon />}
                    title="Sign Up"
                    colors={["hsl(120, 100%, 50%)", "hsl(120, 100%, 70%)"]}
                  />
                </LinkA>
              </li>
            </ul>
          </nav>
        ) : (
          <div className={styles.MenuContainer}>
            <span tabIndex={0} className={`${styles.MenuBox} focusable`}>
              <MenuIcon />
            </span>
            <nav className={styles.NavB}>
              <ul>
                <li>
                  <LinkA>
                    <DescButton2
                      icon={<AboutIcon />}
                      title="About"
                      colors={["hsl(200, 100%, 50%)", "hsl(200, 100%, 65%)"]}
                    />
                  </LinkA>
                </li>
                <li>
                  <LinkA>
                    <DescButton2
                      icon={<LeaderBoardIcon />}
                      title="leaderBoards"
                      colors={["hsl(310, 100%, 80%)", "hsl(310, 100%, 85%)"]}
                    />
                  </LinkA>
                </li>
                <li>
                  <LinkA>
                    <DescButton2
                      icon={<SignInIcon />}
                      title="Sign In"
                      colors={["hsl(39, 100%, 50%)", "hsl(39, 100%, 60%)"]}
                    />
                  </LinkA>
                </li>
                <li>
                  <LinkA>
                    <DescButton2
                      icon={<SignUpIcon />}
                      title="Sign Up"
                      colors={["hsl(120, 100%, 50%)", "hsl(120, 100%, 70%)"]}
                    />
                  </LinkA>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
