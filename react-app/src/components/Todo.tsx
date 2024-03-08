import { useState, useEffect } from "react";
import {useFetch} from '../hooks/useFetch';
import { Navigate, useNavigate } from "react-router-dom";
import {format,formatDistance} from 'date-fns'

const Todo = () => {
  // todo data
  interface ITodo {
    id: number;
    title: string;
    isCompleted: boolean;
    dueDate: string;
  }

  let {data, error, isLoading} = useFetch('http://localhost:5000/todos');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const navigate = useNavigate();

  useEffect(()=>{
    setTodos(data);
  },[data])

  if(isLoading){
    console.log("Loading......");
  }

  

  const handleDelete = async (todo: ITodo) => {
    todos.splice(todos.indexOf(todo), 1);
    setTodos([...todos]);
    await fetch('http://localhost:5000/todos/'+todo.id, { method: 'DELETE' }).then(()=>console.log("Deleted successfully"));
  };
  
  const handleCheck = async (todo: ITodo) => {
    todo.isCompleted = !todo.isCompleted;
    setTodos([...todos]);
    await fetch('http://localhost:5000/todos/'+todo.id, 
    { method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "isCompleted": todo.isCompleted, "title":todo.title})
    })
  };

  return (
    <div className="todo-app">
      <h1>Todo list</h1>
      <button onClick={()=>navigate('/add') } id="add-todo">Add Todo</button>
      {
        //List all the todos
        todos.map((todo: ITodo) => (
          <>
            <div className="container"
              id="title"
            >
              <input
                id="checkbox"
                checked={todo.isCompleted}
                onChange={() => {
                  handleCheck(todo);
                }}
                type="checkbox"
              />
              <h3 
                onClick = {()=> navigate('/view/'+todo.id)}
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >{todo.title}
              </ h3>
              <p>due {formatDistance(todo.dueDate, new Date(Date.now()),{addSuffix:true})}</p>
              <button
                id="delete"
                onClick={() => {
                  handleDelete(todo);
                }}
              >
                {" "}
                Delete{" "}
              </button>
            </div>
          </>
        ))
      }
    </div>
  );
};

export default Todo;