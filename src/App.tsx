import React from "react";
import Button from "./components/button/Button";
import Input from "./components/input/Input";
import Todos from "./components/todos/Todos";
import axios from "axios";

type todosProps = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

function App() {
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

  const createTodo = async () => {
    setCreateLoading(true);
    axios({
      method: "post",
      url: "https://jsonplaceholder.typicode.com/todos",
      data: {
        title: inputValue,
        completed: false,
      },
    })
      .then((response) => {
        console.log(response.data);
        setCreateLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
        setCreateLoading(false);
      });
  };

  //  delete
  const deleteTodo = async (id: number) => {
    const res = await axios({
      method: "delete",
      url: `https://jsonplaceholder.typicode.com/todos/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (todos) {
          const FilteredTOdos = () => {
            return todos.filter((obj) => obj.id !== id);
          };
          setTodos(FilteredTOdos);
        }
      })
      .catch((error) => {
        alert("Не удалось удалить элемент списка дел");
        console.log(error.message);
      });
  };

  return (
    <div className="App">
      <div className="input-wrapper">
        <Input inputValue={inputValue} setInputValue={setInputValue} />
        <div onClick={createTodo}>
          <Button createLoading={createLoading} />
        </div>
      </div>
      {todos ? (
        todos.map((obj: any, i): any => (
          <Todos key={i} {...obj} deleteTodo={deleteTodo} />
        ))
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

export default App;
