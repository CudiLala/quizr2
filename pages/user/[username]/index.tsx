import Box from "components/Boxes";
import { LayoutA } from "components/Layout";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "types/app";
import styles from "styles/User.module.css";
import React, { useContext, useEffect, useState } from "react";
import { getFetcher } from "utils/fetchers";
import { UserContext } from "components/App/AppWrapper";
import Image from "next/image";
import UserModel from "database/models/User";
import connectDB from "database";

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
      <p className={styles.Username}>{user?.username && `@${user.username}`}</p>
    </div>
  );
};

if (typeof window === "undefined") connectDB();

export async function getStaticPaths() {
  const users = await UserModel.find({});

  const paths = users.map((user: any) => {
    return { params: { username: user.username } };
  });

  console.log(paths);
  return { paths, fallback: true };
}

export async function getStaticProps(context: any) {
  const user = await UserModel.findOne({ username: context.params.username });
  if (!user) return { notFound: true };
  const { username, profilePicture, _id } = user;
  return {
    props: {
      user: { username, profilePicture, id: _id.toString() },
    },
  };
}

export default UserPage;
