import { NextPageWithLayout } from "types/app";
import { LayoutA } from "components/layouts";
import Box from "components/boxes";
import { QuizSearchForm } from "components/forms";
import { NeonDivider } from "components/generics/dividers";

const Home: NextPageWithLayout = () => {
  return (
    <div className="content-width">
      <Box size={[8, 8, 4]} column>
        <Box size={[2, 0]} column>
          <p>
            Hi, Welcome to Quizr. Test your knowledge on some mind blowing facts
            you may or may not know about.
          </p>
        </Box>
        <Box size={[2, 0]} column>
          <p>
            To get started, choose one of the following quizes below. You can
            search for quizes or sort based on category, difficulty or
            popularity. Good luck &#128077;.
          </p>
        </Box>
      </Box>
      <Box size={[4, 8]} column>
        <NeonDivider />
        <QuizSearchForm />
        <NeonDivider />
      </Box>
    </div>
  );
};

Home.getLayout = function ({ children }) {
  return <LayoutA>{children}</LayoutA>;
};

export default Home;
