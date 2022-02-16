import Box from "components/Boxes";
import { LayoutA } from "components/Layout";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "types/app";
import styles from "styles/User.module.css";
import React, { useContext, useEffect, useState } from "react";
import { getFetcher } from "utils/fetchers";
import { UserContext as MeContext } from "components/App/AppWrapper";

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
      const { data: user } = await getFetcher(`/api/user/${username}`);
      setUser(user);
    })();
  }, [username]);
  /* eslint-enable */

  return (
    <div className="content-width">
      <UserContext.Provider value={user}>
        <UserHero username={username} />
        {children}
      </UserContext.Provider>
    </div>
  );
};

const UserHero: React.FC<{ username: any }> = ({ username }) => {
  return <></>;
};

export default UserPage;
