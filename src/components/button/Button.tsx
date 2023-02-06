import React from "react";
import styles from "../button/Button.module.css";

type props = {
  createLoading: boolean;
};

const Button: React.FC<props> = ({ createLoading }) => {
  return (
    <div
      className={
        createLoading
          ? (styles.inputButton, styles.inputLoading)
          : styles.inputButton
      }
    >
      create todo
    </div>
  );
};

export default Button;
