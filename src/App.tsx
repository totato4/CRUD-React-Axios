import React from "react";
import Button from "./components/button/Button";
import Input from "./components/input/Input";
import Todos from "./components/todos/Todos";
import axios from "axios";
import { selectTodos } from "./components/RTK/todoSlice/Selectors";
import { useAppSelector, useAppDispatch } from "./components/RTK/store";
import { Itodo } from "./components/RTK/todoSlice/types";
import { fetchTodo } from "./components/RTK/todoSlice/todoSlice";

type todosProps = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

const App: React.FC = () => {
  const [todos, setTodos] = React.useState<todosProps[] | false>(false);

  React.useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => {
        setTodos(response.data);
      });
  }, []);

  const [inputValue, setInputValue] = React.useState<string>("");
  const [createLoading, setCreateLoading] = React.useState<boolean>(false);
  const [post, setPost] = React.useState<boolean>(false);
  const createPost = () => setPost(!post);

  // FETCH TODO
  const dispatch = useAppDispatch();

  const myTodo = useAppSelector(selectTodos);
  const status = useAppSelector((state) => state.todoSlice.status);

  React.useEffect(() => {
    dispatch(fetchTodo());
  }, []);
  React.useEffect(() => {}, [myTodo]);

  return (
    <div className="App">
      <div className="todos">
        <h1>FETCH todo</h1>
        <Input inputValue={inputValue} setInputValue={setInputValue}>
          <Button text={inputValue} />
        </Input>
        <div role="items" className="todos-wrapper">
          {status == "error" ? (
            <div
              onClick={() => {
                fetchTodo();
              }}
            >
              Попробовать снова
            </div>
          ) : (
            myTodo.map((obj, i) => <Todos key={i} {...obj} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
