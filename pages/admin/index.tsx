import { UserContext } from "components/App/AppWrapper";
import Box from "components/Boxes";
import { LayoutA } from "components/Layout";
import { LinkA } from "components/Links";
import { useContext, useEffect, useState } from "react";
import { NextPageWithLayout } from "types/app";
import styles from "styles/Admin.module.css";

type modeType = "loading" | "resolve" | "reject";

const AdminPage: NextPageWithLayout = () => {
  const [mode, setMode] = useState<modeType>("loading");
  const user = useContext(UserContext);

  useEffect(() => {
    if (user === "pending") return;
    if (user?.isAdmin) setMode("resolve");
    else setMode("reject");
  }, [user]);

  return (
    <div className="content-width">
      <Box column>
        {mode === "loading" && <p className="t-green">Loading...</p>}
        {mode === "reject" && <p>Sorry, we couldn&#39;t find this page</p>}
        {mode === "resolve" && <AdminPageComponent />}
      </Box>
    </div>
  );
};

AdminPage.getLayout = LayoutA;

const AdminPageComponent: React.FC = () => {
  return (
    <>
      <Box size={[0, 0, 4]} _style={{ justifyContent: "flex-end" }}>
        <LinkA _className="btn-major t-sbold-x">Create Quiz</LinkA>
      </Box>
      <Box size={[4, 0]}>
        <Box size={[8]} column _className={styles.Group}>
          <Box size={[0, 2]} _className={styles.Heading}>
            <span className="t-bold">Drafts</span>
          </Box>
          <div>
            <p>
              You have no drafts. Drafts are saved automatically when you create
              a quiz
            </p>
          </div>
        </Box>
      </Box>
      <Box size={[4, 0]}>
        <Box size={[8]} column _className={styles.Group}>
          <Box size={[0, 2]} _className={styles.Heading}>
            <span className="t-bold">Quizes</span>
          </Box>
          <div>
            <p>You have no quizes. Start by creating a quiz</p>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default AdminPage;
