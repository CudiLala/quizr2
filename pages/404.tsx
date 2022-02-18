import { LayoutA } from "components/Layout";
import { NextPageWithLayout } from "types/app";
import Box from "components/Boxes";

const PageName: NextPageWithLayout = () => {
  return (
    <div className="content-width">
      <Box>
        <p>Sorry, we couldn&#39;t find this page</p>
      </Box>
    </div>
  );
};

PageName.getLayout = LayoutA;

export default PageName;
