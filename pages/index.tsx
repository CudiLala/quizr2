import { NextPageWithLayout } from "types/app";
import { LayoutA } from "components/Layout";

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <p></p>
    </div>
  );
};

Home.getLayout = LayoutA;

export default Home;
