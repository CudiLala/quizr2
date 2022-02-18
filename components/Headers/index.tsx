import React, { useContext, useEffect, useState } from "react";
import styles from "./Headers.module.css";
import { LinkLogo, LinkA } from "components/Links";
import {
  AboutIcon,
  LeaderBoardIcon,
  MenuIcon,
  ProfileIcon,
  ShieldIcon,
  SignInIcon,
  SignOutIcon,
  SignUpIcon,
} from "components/Icons";
import { DescButton, DescButton2 } from "components/PseudoButtons";
import { UserContext } from "components/App/AppWrapper";
import Image from "next/image";
import Box from "components/Boxes";

export const HeaderA: React.FC = () => {
  const [width, setWidth] = useState(
    typeof window === "undefined" ? 0 : window.innerWidth
  );
  const user = useContext(UserContext);
  const resizeHandler = () => setWidth(window.innerWidth);

  useEffect(() => {
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
              {!user ? (
                <>
                  <li>
                    <LinkA href="/sign">
                      <DescButton
                        icon={<SignInIcon />}
                        title="Sign In"
                        colors={["hsl(39, 100%, 50%)", "hsl(39, 100%, 60%)"]}
                      />
                    </LinkA>
                  </li>
                  <li>
                    <LinkA href="/sign?d=up">
                      <DescButton
                        icon={<SignUpIcon />}
                        title="Sign Up"
                        colors={["hsl(120, 100%, 50%)", "hsl(120, 100%, 70%)"]}
                      />
                    </LinkA>
                  </li>
                </>
              ) : (
                <li>
                  <span className={styles.ProfilePictureContainer}>
                    <span className={styles.ProfilePictureBox}>
                      {user != "pending" && (
                        <LinkA href={`/user/${user.username}`}>
                          <Image
                            src={`${user.profilePicture}&scale=110&translateY=10`}
                            alt="profile picture"
                            width="100%"
                            height="100%"
                            title="profile picture"
                            className={styles.Image}
                          />
                        </LinkA>
                      )}
                    </span>
                    {user != "pending" && (
                      <nav className={styles.NavB}>
                        <ul>
                          <li>
                            <LinkA href={`/user/${user.username}`}>
                              <DescButton2
                                icon={<ProfileIcon />}
                                title="Profile"
                                colors={[
                                  "hsl(39, 100%, 50%)",
                                  "hsl(39, 100%, 60%)",
                                ]}
                              />
                            </LinkA>
                          </li>
                          {user.isAdmin && (
                            <li>
                              <LinkA href={`/admin`}>
                                <DescButton2
                                  icon={<ShieldIcon />}
                                  title="Admin"
                                  colors={[
                                    "hsl(200, 100%, 50%)",
                                    "hsl(200, 100%, 65%)",
                                  ]}
                                />
                              </LinkA>
                            </li>
                          )}
                          <li>
                            <LinkA href="/sign?d=out">
                              <DescButton2
                                icon={<SignOutIcon />}
                                title="Sign Out"
                                colors={[
                                  "hsl(120, 100%, 50%)",
                                  "hsl(120, 100%, 70%)",
                                ]}
                              />
                            </LinkA>
                          </li>
                        </ul>
                      </nav>
                    )}
                  </span>
                </li>
              )}
            </ul>
          </nav>
        ) : (
          <div>
            {user && (
              <span className={styles.ProfilePictureContainer}>
                <span className={styles.ProfilePictureBox}>
                  {user != "pending" && (
                    <Image
                      src={`${user.profilePicture}&scale=110&translateY=10`}
                      alt="profile picture"
                      width="100%"
                      height="100%"
                      title="profile picture"
                      className={styles.Image}
                    />
                  )}
                </span>
                {user != "pending" && (
                  <nav className={styles.NavB}>
                    <ul>
                      <li>
                        <LinkA href={`/admin`}>
                          <DescButton2
                            icon={<ProfileIcon />}
                            title="Profile"
                            colors={[
                              "hsl(39, 100%, 50%)",
                              "hsl(39, 100%, 70%)",
                            ]}
                          />
                        </LinkA>
                      </li>
                      {user.isAdmin && (
                        <li>
                          <LinkA href={`/admin`}>
                            <DescButton2
                              icon={<ShieldIcon />}
                              title="Admin"
                              colors={[
                                "hsl(200, 100%, 50%)",
                                "hsl(200, 100%, 65%)",
                              ]}
                            />
                          </LinkA>
                        </li>
                      )}
                      <li>
                        <LinkA href="/sign?d=out">
                          <DescButton2
                            icon={<SignOutIcon />}
                            title="Sign Out"
                            colors={[
                              "hsl(120, 100%, 50%)",
                              "hsl(120, 100%, 75%)",
                            ]}
                          />
                        </LinkA>
                      </li>
                    </ul>
                  </nav>
                )}
              </span>
            )}
            <Box size={[0, 4, 0, 0]}>
              <div tabIndex={0} className={`${styles.MenuContainer}`}>
                <span className={`${styles.MenuBox}`}>
                  <MenuIcon />
                </span>
                <nav className={styles.NavB}>
                  <ul>
                    <li>
                      <LinkA>
                        <DescButton2
                          icon={<AboutIcon />}
                          title="About"
                          colors={[
                            "hsl(200, 100%, 50%)",
                            "hsl(200, 100%, 70%)",
                          ]}
                        />
                      </LinkA>
                    </li>
                    <li>
                      <LinkA>
                        <DescButton2
                          icon={<LeaderBoardIcon />}
                          title="leaderBoards"
                          colors={[
                            "hsl(310, 100%, 80%)",
                            "hsl(310, 100%, 85%)",
                          ]}
                        />
                      </LinkA>
                    </li>
                    {!user ? (
                      <>
                        <li>
                          <LinkA href="/sign">
                            <DescButton2
                              icon={<SignInIcon />}
                              title="Sign In"
                              colors={[
                                "hsl(39, 100%, 50%)",
                                "hsl(39, 100%, 70%)",
                              ]}
                            />
                          </LinkA>
                        </li>
                        <li>
                          <LinkA href="/sign?d=up">
                            <DescButton2
                              icon={<SignUpIcon />}
                              title="Sign Up"
                              colors={[
                                "hsl(120, 100%, 50%)",
                                "hsl(120, 100%, 75%)",
                              ]}
                            />
                          </LinkA>
                        </li>
                      </>
                    ) : (
                      <li>
                        <LinkA href="/sign?d=out">
                          <DescButton2
                            icon={<SignOutIcon />}
                            title="Sign Out"
                            colors={[
                              "hsl(120, 100%, 50%)",
                              "hsl(120, 100%, 75%)",
                            ]}
                          />
                        </LinkA>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </Box>
          </div>
        )}
      </div>
    </header>
  );
};
