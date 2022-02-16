import Box from "components/Boxes";
import { LayoutA } from "components/Layout";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "types/app";

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

const User: React.FC = ({ children }) => {
  return (
    <div className="content-width">
      <UserHero />
      {children}
    </div>
  );
};

const UserHero: React.FC = () => {
  const router = useRouter();
  return <>{console.log("user>>", router.query)}</>;
};

export default UserPage;
