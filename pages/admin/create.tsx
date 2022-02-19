import { UserContext } from "components/App/AppWrapper";
import Box from "components/Boxes";
import { LayoutA } from "components/Layout";
import { LinkA } from "components/Links";
import React, { useContext, useEffect, useState } from "react";
import { NextPageWithLayout } from "types/app";
import styles from "styles/Admin.module.css";
import { Inputr, TextArea } from "components/Forms";
import useModal from "hooks/modal";

type modeType = "loading" | "resolve" | "reject";

const CreateQuizPage: NextPageWithLayout = () => {
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
        {mode === "resolve" && <CreateQuizPageComponent />}
      </Box>
    </div>
  );
};

CreateQuizPage.getLayout = LayoutA;
export default CreateQuizPage;

const CreateQuizPageComponent: React.FC = () => {
  const { Modal, runModal, removeModal } = useModal();
  return (
    <>
      <Modal />
      <Box column size={[8, 0]}>
        <Box _className={`${styles.Group} box-width`} column>
          <Box size={[0, 2]} _className={styles.Heading}>
            <span className="t-bold">Quiz Details</span>
          </Box>
          <Box size={[0]} _style={{ justifyContent: "flex-end" }}>
            <button className="btn-major t-sbold-x">Save Details</button>
          </Box>
          <CreateQuizForm />
        </Box>
      </Box>
      <Box column size={[8, 0]}>
        <Box _className={`${styles.Group} box-width`} column>
          <Box size={[0, 2]} _className={styles.Heading}>
            <span className="t-bold">Quiz Questions</span>
          </Box>
          <Box size={[0]} _style={{ justifyContent: "flex-end" }}>
            <button
              className="btn-major t-sbold-x"
              onClick={() => runModal(<CreateQuestionForm />)}
            >
              New Question
            </button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const CreateQuizForm: React.FC = () => {
  return (
    <form autoComplete="off">
      <Inputr id="quizTitle" name="quizTitle" label="Title" />
      <Inputr id="quizCategories" name="quizCategories" label="Categories" />
      <TextArea
        id="quizIntroText"
        name="quizIntroText"
        label="Introductory Text"
        height="15rem"
      />
    </form>
  );
};

const CreateQuestionForm: React.FC = () => {
  return (
    <form autoComplete="off">
      <TextArea
        id="questionTitle"
        name="questionTitle"
        label="Question"
        height="5rem"
      />
    </form>
  );
};
