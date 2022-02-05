import { NextPageWithLayout } from "types/app";
import { LayoutA } from "components/Layout";
import Box from "components/Boxes";
import { QuizSearchForm } from "components/Forms";

const Home: NextPageWithLayout = () => {
  return (
    <div className="content-width">
      <Box size={[8, 8, 4]}>
        <p>Search:</p>
      </Box>
      <Box size={[4, 8]}>
        <QuizSearchForm />
      </Box>
    </div>
  );
};

Home.getLayout = LayoutA;

export default Home;
