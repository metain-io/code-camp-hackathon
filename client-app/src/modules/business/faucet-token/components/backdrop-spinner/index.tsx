import React from "react";
import styles from "./style.module.scss";

export type BackdropSpinnerProps = {
    active: boolean;
};

const BackdropSpinner = (props: BackdropSpinnerProps) => {
  const { active } = props;

  return (
    <>
        <span id={styles.component_back_drop_spinner} className={active ? [styles.active, "mLoading"].join(" ") : ""}></span>
    </>
  );
};

export default BackdropSpinner;
