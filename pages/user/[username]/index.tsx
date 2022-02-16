import Box from "components/Boxes";
import { LayoutA } from "components/Layout";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "types/app";
import styles from "styles/User.module.css";
import React, { useContext, useEffect, useState } from "react";
import { getFetcher } from "utils/fetchers";
import { UserContext as MeContext } from "components/App/AppWrapper";
import Image from "next/image";

const UserPage: NextPageWithLayout = () => {
  return <Box>Hi, User</Box>;
};

UserPage.getLayout = function ({ children }) {
  return (
    <LayoutA>
      <User>{children}</User>
    </LayoutA>
  );
};

const UserContext = React.createContext<any>(null);

const User: React.FC = ({ children }) => {
  const [user, setUser] = useState();
  const router = useRouter();
  const { username } = router.query;

  /* eslint-disable */
  useEffect(() => {
    (async function () {
      if (!username) return;
      const { data } = await getFetcher(`/api/user/${username}`);
      if (data?.success) setUser(data.user);
    })();
  }, [username]);
  /* eslint-enable */

  return (
    <div className="content-width">
      <UserContext.Provider value={user}>
        <Box _className={styles.UserHeroBox}>
          <UserHero />
        </Box>
        {children}
      </UserContext.Provider>
    </div>
  );
};

const UserHero: React.FC = () => {
  const user = useContext(UserContext);
  return (
    <div className={`${styles.UserHero}`}>
      <div className={styles.Avatar}>
        <span className={styles.ImageBox}>
          {user?.profilePicture && (
            <Image
              src={user.profilePicture}
              layout="fill"
              alt="profile picture"
              className={styles.Image}
            />
          )}
        </span>
      </div>
      <p className={styles.Username}>{user?.username && `@${user.username}`}</p>
    </div>
  );
};

export default UserPage;
