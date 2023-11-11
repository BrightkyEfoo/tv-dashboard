import React from "react";
import styles from "./styles.module.css";
const CommonFooter = () => {
  return (
    <div className={styles.container}>
      <span>
        powered by {" "}
        <a href="https://dmservices.cm/home" target="_blank" rel="noreferrer">
          dmservices
        </a>
      </span>
    </div>
  );
};

export default CommonFooter;
