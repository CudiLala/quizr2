import React, { useState } from "react";
import styles from "styles/hooks/loader.module.css";

export default function useLoader(): [
  Loader: React.FC,
  runLoader: () => void,
  removeLoader: () => void
] {
  const [active, setActive] = useState<boolean>(false);

  const Loader: React.FC = () => {
    return active ? (
      <div className={styles.Loader}>
        <span></span>
      </div>
    ) : (
      <></>
    );
  };

  function runLoader() {
    setActive(true);
  }

  function removeLoader() {
    setActive(false);
  }
  return [Loader, runLoader, removeLoader];
}
