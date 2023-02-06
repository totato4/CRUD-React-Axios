import React from "react";
import axios from "axios";
import styles from "./Todos.module.css";

type todosProps = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

const Todos = ({ id, completed, title, deleteTodo, userId }: any) => {
  const [checkboxValue, setCheckboxValue] = React.useState<boolean>(completed);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const completedProp = completed;

  // update
  const toggleCompleteTodo = async () => {
    setIsLoading(true);
    setCheckboxValue(!checkboxValue);
    const res = await axios({
      method: "patch",
      url: `https://jsonplaceholder.typicode.com/todos/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: id,
        completed: !checkboxValue,
        title: title,
        userId: userId,
      },
    })
      .then((response) => {
        setIsLoading(false);
      })
      .catch((error) => {
        setCheckboxValue(!checkboxValue);
        setIsLoading(false);
        console.log(error.message);
      });
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.container}>
        {isLoading ? (
          <input
            type="checkbox"
            checked={checkboxValue}
            className="checkbox"
            disabled
          />
        ) : (
          <input
            type="checkbox"
            onChange={() => toggleCompleteTodo()}
            checked={checkboxValue}
            className="checkbox"
          />
        )}
        <span
          className={
            isLoading ? styles.title + " " + styles.todoLoading : styles.title
          }
        >
          {title}
        </span>
      </label>
      <div onClick={() => deleteTodo(id)} className={styles.icon}>
        <svg
          fill="#000000"
          version="1.1"
          id="Capa_1"
          width="12px"
          height="12px"
          viewBox="0 0 94.926 94.926"
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0
		c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096
		c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476
		c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62
		s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Todos;
