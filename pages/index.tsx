import { NextPageWithLayout } from "types/app";
import { LayoutA } from "components/Layout";
import Box from "components/Boxes";
import { QuizSearchForm } from "components/Forms";

const Home: NextPageWithLayout = () => {
  return (
    <div className="content-width">
      <div>
        <p>
          Hi, Welcome to Quizr. Test your knowledge on some mind blowing facts
          you may or may not know about. To get started, choose one of the
          following quizes below. You can search for quizes or sort based on
          category, difficulty or popularity.
        </p>
      </div>
      <Box size={[4, 8]}>
        <QuizSearchForm />
      </Box>
    </div>
  );
};

Home.getLayout = LayoutA;

export default Home;
