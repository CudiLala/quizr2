//react
import React, { useContext, useEffect, useState } from "react";
//components
import { Inputr, TextArea } from "components/forms";
import Group, { GroupHeading } from "components/generics/groups";
import { LayoutA } from "components/layouts";
import Box from "components/boxes";
//style
import styles from "styles/pages/admin.module.css";
//types
import { NextPageWithLayout } from "types/app";
//hooks
import useModal from "hooks/modal";
//contexts
import { UserContext } from "components/app/AppWrapper";
import { LoaderContext } from "components/app/AppWrapper";
import { NoteContext } from "components/app/AppWrapper";

import { useRouter } from "next/router";
import { deleteFetcher, getFetcher } from "utils/fetchers";
import { LinkA } from "components/links";

type modeType = "loading" | "resolve" | "reject";

type OptionProps = {
  name: string;
  selected?: { name: string };
  setSelected?: React.Dispatch<React.SetStateAction<{ name: string }>>;
};

const CreateQuizPage: NextPageWithLayout = () => {
  const [mode, setMode] = useState<modeType>("loading");
  const user = useContext(UserContext);
  const router = useRouter();

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
        {mode === "resolve" && (
          <CreateQuizPageComponent
            draftId={router.query.id?.toString() || ""}
          />
        )}
      </Box>
    </div>
  );
};

CreateQuizPage.getLayout = LayoutA;
export default CreateQuizPage;

const CreateQuizPageComponent: React.FC<{ draftId: string }> = ({
  draftId,
}) => {
  const { Modal, runModal, removeModal } = useModal();
  const [runLoader, removeLoader] = useContext(LoaderContext);
  const [addText] = useContext(NoteContext);
  const router = useRouter();
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [draftData, setDraftData] = useState({});

  async function deleteDraft(id: any) {
    if (deleteBusy) return;
    setDeleteBusy(true);
    runLoader();
    const { data } = await deleteFetcher(`/api/quiz/draft?id=${id}`);
    if (data?.success) return router.push("/admin");
    removeLoader();
    addText({
      text: "Error deleting draft",
      timeOut: 4,
      isError: true,
      id: "draftDeleteError1",
    });
    setDeleteBusy(false);
  }

  /* eslint-disable */
  useEffect(() => {
    (async () => {
      runLoader();
      const { data } = await getFetcher(`/api/quiz/draft?id=${draftId}`);
      removeLoader();
      if (data?.success) return setDraftData(data.draft);
      addText({
        text: "Error fetching draft data",
        id: "fetchdraftdataerror",
        timeOut: 6,
        isError: true,
      });
    })();
  }, [draftId]);
  /* eslint-enable */

  return (
    <>
      <Modal />
      <Box size={[0]} _style={{ justifyContent: "space-between" }}>
        <LinkA href="/admin" _className="btn-minor t-sbold-x">
          back
        </LinkA>
        <Box size={[0]}>
          <Box size={[0, 0, 0, 8]}>
            <button
              className="btn-minor t-sbold-x"
              onClick={() => deleteDraft(draftId)}
            >
              Delete
            </button>
          </Box>
          <Box size={[0, 0, 0, 8]}>
            <button className="btn-major t-sbold-x">Publish</button>
          </Box>
        </Box>
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
      <Box column size={[8, 0]}>
        <Group>
          <GroupHeading>Quiz Details</GroupHeading>
          <Box size={[0]} _style={{ justifyContent: "flex-end" }}>
            <button className="btn-major t-sbold-x">Save Details</button>
          </Box>
          <CreateQuizForm />
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
