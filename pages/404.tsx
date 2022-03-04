import { LayoutA } from "components/layouts";
import { NextPageWithLayout } from "types/app";
import Box from "components/boxes";

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
