import { useState, useEffect } from "react";
import {useFetch} from '../hooks/useFetch';
import { Link, useNavigate } from "react-router-dom";
import {formatDistance} from "date-fns"
import { ArrowDownAZ, ArrowDownZA, ListChecks, Plus, Search, XSquare} from "lucide-react"

export interface ITodo {
  id: number;
  title: string;
  description: string;
  assignee: string;
  isCompleted: boolean;
  dueDate: string;
}

 const Todo = () => {
  // todo data
  const {data, error, isLoading} = useFetch('http://localhost:5000/todos');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  useEffect(()=>{
    setTodos(data)
  },[data])

  const handleDelete = async (todo: ITodo) => {
    todos.splice(todos.indexOf(todo), 1);
    setTodos([...todos]);
    await fetch('http://localhost:5000/todos/'+todo.id, { method: 'DELETE' });
  };
  
  const handleCheck = async (todo: ITodo) => {
    todo.isCompleted = !(todo.isCompleted);
    setTodos([...todos]);
    await fetch('http://localhost:5000/todos/'+todo.id,
    { method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
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

  const handleSort = (order:string) => {
    if (order == 'asc')
    {
      setTodos([...todos].sort((a,b)=>a.title.localeCompare(b.title)))
    }else if (order == 'desc')
    {
      setTodos([...todos].sort((a,b)=>b.title.localeCompare(a.title)))
    }
  }

  const handleStatus = () => {
    setTodos(todos.filter(todo=>todo.isCompleted))
  }

  const handleTodos = () => {
    setTodos(data);
  }
  
  return (
    <div>
      <p className="bg-white text-gray-950 px-10 py-5 h-20 text-3xl font-bold border-solid border-2 border-gray-200">Dashboard</p>
    <div className=" p-2 my-10 mx-48">
      <div className="ml-12">
      <div className="flex space-x-4">
        <div>
        <Search className="text-gray-400 absolute"/>
        <input
          type="text"
          id="search"
          className="px-10 h-10 bg-indigo-50 rounded-xl w-96 border focus:outline-none focus:border-gray-400 "
          placeholder="search todo"
          value={search}
          onChange={handleSearch}
        />
        </div>
        <button className="flex bg-gray-900 py-2 rounded-xl w-30 p-2 text-sm text-white shadow-lg hover:text-gray-950 hover:bg-white border-solid border-2 border-gray-900 ">
          <Link to='/add' className="flex"><Plus className="h-5" /> Add todo </Link>
        </button>
        <button className="text-white bg-gray-800 px-3 py-1 rounded-md hover:bg-white hover:text-black border-solid border-2 border-gray-900"
          onClick={()=>handleSort('asc')}> <ArrowDownAZ />
        </button>
        <button className="text-white bg-gray-800 px-3 py-1 rounded-md hover:bg-white hover:text-black border-solid border-2 border-gray-900"
          onClick={()=>handleSort('desc')}> <ArrowDownZA />
        </button>
        <button className="text-white bg-gray-800 px-3 py-1 rounded-md hover:bg-white hover:text-black border-solid border-2 border-gray-900"
          onClick={handleStatus}><ListChecks />
        </button>
        <button className="text-white bg-gray-800 px-3 py-1 rounded-md hover:bg-white hover:text-black border-solid border-2 border-gray-900"
          onClick={handleTodos}>All Todo
        </button>
      </div>
      </div>
      { isLoading && <h3>Loading......</h3> }
      <div className="divide-y my-8 ">
        <div className="grid grid-cols-5 gap-0 py-2 font-serif font-bold text-xl text-center">
          <p className="row-span-3 px-5">Title</p>
          <p className="col-span-2">Due</p>
          <p className="mx-20">Status</p>
          <p className="mx-16">Action</p>
        </div>
      {
        //List all the todos
        todos.map((todo: ITodo) => (
          <div className="flex">
            <div className="flex py-2 text-base font-sans "
              id="title" 
            >
              <p className="px-6 w-80" 
                id="todo"
                onClick = {()=> navigate('/view/'+todo.id)}
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >{todo.title}
              </ p>
              <p className="ml-4 w-60">{formatDistance(new Date(todo?.dueDate), new Date())} </p>
              <input
              className="ml-12 w-5"
                id="checkbox"
                checked={todo.isCompleted}
                onChange={() => {
                  handleCheck(todo);
                }}
                type="checkbox"
              />
              <button
                className="ml-36"
                id="delete"
                onClick={() => {
                  handleDelete(todo);
                }}
                style={{textDecoration:"none"}}
              ><XSquare className="text-red-700 size-7"/>
              </button>
            </div>
          </div>
        ))
      }
      </div>
    </div>
    </div>
  );
};

export default Todo;