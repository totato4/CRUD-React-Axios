import React from "react";
import styles from "../button/Button.module.css";
import { useAppDispatch, useAppSelector } from "./../RTK/store";
import { fetchAddTodo } from "../RTK/todoSlice/todoSlice";

type props = {
  text: string;
};

const Button: React.FC<props> = ({ text }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.todoSlice.status);
  const createTodo = (text: string) => {
    // dispatch(fetchAddTodo(text));
    console.log(text);
  };

  return (
    <div
      // className={

      //     ? (styles.inputButton, styles.inputLoading)
      //     : styles.inputButton
      // }
      className={styles.inputButton}
      onClick={() => dispatch(fetchAddTodo(text))}
    >
      create todo
    </div>
  );
};

export default Button;
