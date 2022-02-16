import Box from "components/Boxes";
import { LayoutA } from "components/Layout";
import type { NextPageWithLayout } from "types/app";

const UserPage: NextPageWithLayout = () => {
  return <Box>Hi, User</Box>;
};

UserPage.getLayout = LayoutA;

export default UserPage;
