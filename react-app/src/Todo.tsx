import { useState, useEffect } from "react";
import {useFetch} from './useFetch';

const Todo = () => {
  // todo data
  interface ITodo {
    id: number;
    title: string;
    isCompleted: boolean;
  }

  let {data, error} = useFetch('http://localhost:5000/todos');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [title, setTitle] = useState<string>("");
  let countid = 10;

  useEffect(()=>{
    setTodos(data)
  },[data])

  const handleDelete = (todo: ITodo) => {
    todos.splice(todos.indexOf(todo), 1);
    setTodos([...todos]);
  };

  const handleCheck = (todo: ITodo) => {
    todo.isCompleted = !todo.isCompleted;
    setTodos([...todos]);
  };

  return (
    <div className="todo-app">
      <h1>Todo list</h1>
      {
        //input todo
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="add a todo title"
          />
          <button
            id="add"
            onClick={() => {
              setTodos([
                ...todos,
                { id: countid++, title: title, isCompleted: false },
              ]);
            }}
          >
            {" "}
            ADD
          </button>
        </>
      }

      {
        //List all the todos
        todos.map((todo: ITodo) => (
          <>
            <h3
              id="title"
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              <input
                id="checkbox"
                checked={todo.isCompleted}
                onChange={() => {
                  handleCheck(todo);
                }}
                type="checkbox"
              />
              {todo.title}
              <button
                id="delete"
                onClick={() => {
                  handleDelete(todo);
                }}
              >
                {" "}
                Delete{" "}
              </button>
            </h3>
          </>
        ))
      }
    </div>
  );
};

export default Todo;