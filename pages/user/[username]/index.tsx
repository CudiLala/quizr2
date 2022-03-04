import Box from "components/boxes";
import { LayoutA } from "components/layouts";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "types/app";
import styles from "styles/pages/user.module.css";
import React, { useContext, useEffect, useState } from "react";
import { getFetcher } from "utils/fetchers";
import { UserContext } from "components/app/AppWrapper";
import Image from "next/image";
import UserModel from "database/models/User";
import connectDB from "database";
import { LinkA } from "components/links";

const UserPage: NextPageWithLayout<{ user: any }> = ({ user }) => {
  return (
    <User user={user}>
      <Box>Hi, User</Box>
    </User>
  );
};

UserPage.getLayout = function ({ children }) {
  return <LayoutA>{children}</LayoutA>;
};

const User: React.FC<{ user: any }> = ({ children, user }) => {
  const router = useRouter();
  return (
    <div className="content-width">
      <Box _className={styles.UserHeroBox}>
        <UserHero user={user} />
      </Box>
      {children}
    </div>
  );
};

const UserHero: React.FC<{ user: any }> = ({ user }) => {
  const me = useContext(UserContext);
  return (
    <div className={`${styles.UserHero}`}>
      <div className={styles.Avatar}>
        <span className={styles.ImageBox}>
          {user?.profilePicture && (
            <Image
              src={user.profilePicture}
              layout="fill"
              alt="profile picture"
              className={styles.Image}
            />
          )}
        </span>
      </div>
      <Box column _className={styles.UsernameBox} size={[4]}>
        <p className={`${styles.Username} t-sbold`}>
          {user?.username && `@${user.username}`}
        </p>
        <p className={`${styles.UserXP} t-sbold`}>&#127942;500XP</p>
      </Box>
      <nav className={styles.Nav}>
        <LinkA _className={`t-sbold-x ${styles.Active}`}>Stats</LinkA>
        {me != "pending" && me?.id == user?.id && (
          <LinkA _className="t-sbold-x">Settings</LinkA>
        )}
      </nav>
    </div>
  );
};

export async function getStaticPaths() {
  connectDB();
  const users = await UserModel.find({});

  const paths = users.map((user: any) => {
    return { params: { username: user.username } };
  });

  console.log(paths);
  return { paths, fallback: true };
}

export async function getStaticProps(context: any) {
  connectDB();
  const user = await UserModel.findOne({
    username: context.params.username,
  }).collation({ locale: "en", strength: 2 });

  if (!user) return { notFound: true };
  const { username, profilePicture, _id } = user;
  return {
    props: {
      user: { username, profilePicture, id: _id.toString() },
    },
  };
}

export default UserPage;
