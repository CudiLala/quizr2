//react
import { useContext, useEffect, useState } from "react";
//components
import Box from "components/boxes";
import { LayoutA } from "components/layouts";
import { LinkA } from "components/links";
import Group, { GroupHeading } from "components/generics/groups";
import List, { LinkList } from "components/generics/lists";
//types
import { NextPageWithLayout } from "types/app";
//styles
import styles from "styles/pages/admin.module.css";
import LinkStyles from "styles/components/links.module.css";
//utils
import { getFetcher, postFetcher } from "utils/fetchers";
import { ut_generateNiceDateForPageDisplay } from "utils/generics";
//contexts
import { UserContext } from "components/app/AppWrapper";
import { LoaderContext } from "components/app/AppWrapper";
import { NoteContext } from "components/app/AppWrapper";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [runLoader] = useContext(LoaderContext);
  const [addText] = useContext(NoteContext);

  async function createDraft(ev: any) {
    ev.preventDefault();
    runLoader();
    const { data } = await postFetcher("/api/quiz/draft", {});
    if (data?.success) return router.push(`/admin/create?id=${data.draft._id}`);
    addText({
      text: "Error creating quiz",
      id: "quizcreater",
      timeOut: 4,
      isError: true,
    });
  }

  return (
    <>
      <Box size={[0, 0, 4]} _style={{ justifyContent: "flex-end" }}>
        <LinkA
          _className="btn-major t-sbold-x"
          href="/admin/create"
          passProps={{ onClick: createDraft }}
        >
          Create Quiz
        </LinkA>
      </Box>
      <Box size={[4, 0]}>
        <Group>
          <GroupHeading>Drafts</GroupHeading>
          <DraftComponent />
        </Group>
      </Box>
      <Box size={[4, 0]}>
        <Group>
          <GroupHeading>Quizes</GroupHeading>
          <div>
            <p>You have no quizes. Start by creating a quiz</p>
          </div>
        </Group>
      </Box>
    </>
  );
};

export default AdminPage;

const DraftComponent: React.FC = () => {
  const [drafts, setDrafts] = useState<any[] | "pending" | "error">("pending");
  const [max, setMax] = useState<boolean>(false);
  const [runLoader, removeLoader] = useContext(LoaderContext);

  async function loadMoreDrafts() {
    runLoader();
    let limit = 3;
    if (Array.isArray(drafts)) limit = drafts.length + 3;

    const { data } = await getFetcher(
      `/api/quiz/draft?limit=${limit}&sort=-createdAt`
    );
    removeLoader();
    if (!data || !data.success) return "error";
    if (data.drafts.length < limit) setMax(true);
    return data.drafts;
  }

  /*eslint-disable*/
  useEffect(() => {
    (async function () {
      setDrafts(await loadMoreDrafts());
    })();
  }, []);
  /*eslint-enable*/

  if (drafts === "pending")
    return <p style={{ color: "var(--color-green)" }}>Loading...</p>;
  if (drafts === "error")
    return (
      <p style={{ color: "var(--color-orange)" }}>Error fetching Drafts</p>
    );
  if (drafts.length === 0)
    return (
      <p>
        You have no drafts. Drafts are saved automatically when you create a
        quiz
      </p>
    );
  return (
    <>
      <LinkList>
        {drafts.map((draft) => {
          const date = ut_generateNiceDateForPageDisplay(
            new Date(draft.createdAt)
          );
          return (
            //@ts-ignore
            <div key={draft._id} passhref={`admin/create?id=${draft._id}`}>
              <p>{draft.title}</p>
              <p
                style={{
                  color: "var(--color-green)",
                  fontSize: "0.9rem",
                  textAlign: "right",
                }}
              >
                {date}
              </p>
            </div>
          );
        })}
      </LinkList>
      <Box size={[0]}>
        {!max && (
          <button
            className={`${LinkStyles.LinkB} t-i-reg t-small`}
            onClick={async () => setDrafts(await loadMoreDrafts())}
            style={{ marginRight: "1rem" }}
          >
            Load more
          </button>
        )}
        {drafts.length > 3 && (
          <button
            className={`${LinkStyles.LinkB} t-i-reg t-small t-orange`}
            onClick={async () => {
              setDrafts([drafts[0], drafts[1], drafts[2]]);
              setMax(false);
            }}
          >
            Collapse
          </button>
        )}
      </Box>
    </>
  );
};
