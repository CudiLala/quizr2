import React, { useState } from "react";
import styles from "./modal.module.css";

export default function useModal() {
  const [modalChild, setModalChild] = useState<any>(null);

  function runModal(component: any) {
    console.log(component);
    setModalChild(component);
  }
  function removeModal() {
    setModalChild(null);
  }

  const Modal: React.FC = () => (
    <>
      {!!modalChild ? (
        <div className={styles.ModalContainer} onClick={removeModal}>
          <div
            className={styles.ModalBox}
            onClick={(ev) => ev.stopPropagation()}
          >
            {modalChild}
          </div>
        </div>
      ) : (
        <div id="modal"></div>
      )}
    </>
  );
  return { Modal, runModal, removeModal };
}
