import { UserContext } from "components/App/AppWrapper";
import Box from "components/Boxes";
import { LayoutA } from "components/Layout";
import React, { useContext, useEffect, useState } from "react";
import { NextPageWithLayout } from "types/app";
import styles from "styles/Admin.module.css";
import { Inputr, TextArea } from "components/Forms";
import useModal from "hooks/modal";
import Group, { GroupHeading } from "components/Generics/Group";

type modeType = "loading" | "resolve" | "reject";

type OptionProps = {
  name: string;
  selected?: { name: string };
  setSelected?: React.Dispatch<React.SetStateAction<{ name: string }>>;
};

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
        <Group>
          <GroupHeading>Quiz Details</GroupHeading>
          <Box size={[0]} _style={{ justifyContent: "flex-end" }}>
            <button className="btn-major t-sbold-x">Save Details</button>
          </Box>
          <CreateQuizForm />
        </Group>
      </Box>
      <Box column size={[8, 0]}>
        <Group>
          <GroupHeading>Quiz Questions</GroupHeading>
          <Box size={[0]} _style={{ justifyContent: "flex-end" }}>
            <button
              className="btn-major t-sbold-x"
              onClick={() => runModal(<CreateQuestionForm />)}
            >
              New Question
            </button>
          </Box>
        </Group>
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
      <p className="t-sbold-x">Options:</p>
      <Options>
        <Option name="A" />
        <Option name="B" />
        <Option name="C" />
        <Option name="D" />
      </Options>
      <Box size={[2, 0]} _style={{ justifyContent: "flex-end" }}>
        <button className="btn-major t-sbold-x" type="button">
          Add
        </button>
      </Box>
    </form>
  );
};

const Options: React.FC = ({ children }) => {
  const [selected, setSelected] = useState<{ name: string }>({ name: "" });
  return (
    <>
      {React.Children.map(children, (child, idx) => {
        //@ts-ignore
        const option = React.cloneElement(child, {
          setSelected,
          //@ts-ignore
          selected: selected?.name === child?.props.name,
        });
        return option;
      })}
    </>
  );
};

const Option: React.FC<OptionProps> = ({
  children,
  name,
  selected,
  setSelected,
}) => {
  return (
    <Box
      size={[4]}
      _className={`${styles.QuestionOption} ${selected && styles.Selected}`}
      column
    >
      <Inputr name={name} id={name} label="" />
      <CheckBox
        label="correct answer"
        passProps={{ onClick: () => !!setSelected && setSelected({ name }) }}
      />
    </Box>
  );
};

const CheckBox: React.FC<{ label: string; passProps?: {} }> = ({
  children,
  label,
  passProps = {},
}) => {
  return (
    <Box size={[0]} _style={{ justifyContent: "flex-start" }}>
      <div className={styles.CheckBox} {...passProps}>
        <span>
          <span></span>
        </span>
        {label}
      </div>
    </Box>
  );
};
