import { useState, useEffect } from "react";
import {useFetch} from './useFetch';
import { useNavigate } from "react-router-dom";
import "../stylesheets/Todo.css";

export interface ITodo {
  id: number;
  title: string;
  isCompleted: boolean;
}

 const Todo = () => {
  // todo data
  
  let {data, error, isLoading} = useFetch('http://localhost:5000/todos');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  useEffect(()=>{
    setTodos(data)
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
    todo.isCompleted = !(todo.isCompleted);
    setTodos([...todos]);
    await fetch('http://localhost:5000/todos/'+todo.id,
    { method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "isCompleted": todo.isCompleted, "title":todo.title})
    })
  };

  const handleSearch = (e:any) => {
    const searchVal = e.target.value
    setSearch(searchVal)
    if(searchVal){
      const newArr = todos.filter(todo=>todo.title.toLowerCase().includes(searchVal.toLowerCase()))
      setTodos(newArr)
    }else{
      setTodos(data)
    }
  }

  const handleSort = () => {
    setTodos([...todos].sort((a,b)=>a.title.localeCompare(b.title)))
  }

  const handleStatus = () => {
    setTodos(todos.filter(todo=>todo.isCompleted))
  }

  const handleTodos = () => {
    setTodos(data);
  }

  return (
    <div className="todo-app">
      <h1>Todo list</h1>
      <input
        type="text"
        id="search"
        placeholder="search todo"
        value={search}
        onChange={handleSearch}
      />
      <button id="sort" onClick={handleSort}>Sort by title</button>
      <button onClick={handleStatus}>Completed todos</button>
      <button onClick={handleTodos}>All Todos</button>
      <button onClick={()=>navigate('/add')}>Add Todo</button>
      {
        //List all the todos
        todos.map((todo: ITodo) => (
          <div className="main-container">
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
              <p id="todo"
                onClick = {()=> navigate('/view/'+todo.id)}
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >{todo.title}
              </ p>
              <button
                id="delete"
                onClick={() => {
                  handleDelete(todo);
                }}
                style={{textDecoration:"none"}}
              >Delete
              </button>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Todo;