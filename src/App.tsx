import React from "react";
import Button from "./components/button/Button";
import Input from "./components/input/Input";
import Todos from "./components/todos/Todos";
import axios from "axios";
import { selectTodos } from "./components/RTK/todoSlice/Selectors";
import { useAppSelector, useAppDispatch } from "./components/RTK/store";
import { Itodo } from "./components/RTK/todoSlice/types";
import { fetchTodo } from "./components/RTK/todoSlice/todoSlice";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

type todosProps = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

const App: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>("");

  // FETCH TODO
  const dispatch = useAppDispatch();

  const myTodo = useAppSelector(selectTodos);
  const status = useAppSelector((state) => state.todoSlice.status);

  React.useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <main className="main">
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
      </main>
      <Footer />
    </div>
  );
};

export default App;
