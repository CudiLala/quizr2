import { NextPageWithLayout } from "types/app";
import { LayoutA } from "components/Layout";
import Box from "components/Boxes";
import { QuizSearchForm } from "components/Forms";

const Home: NextPageWithLayout = () => {
  return (
    <div className="content-width">
      <Box size={[8, 8, 4]}>
        <p>Hi, Welcome to Quizr. </p>
        <p>
          Test your knowledge on some mind blowing facts you may or may not know
          about. To get started, choose one of the following quizes below. You
          can search for quizes or sort based on category, difficulty or
          popularity. Good luck &#128077;.
        </p>
      </Box>
      <Box size={[4, 8]}>
        <QuizSearchForm />
      </Box>
    </div>
  );
};

Home.getLayout = LayoutA;

export default Home;
