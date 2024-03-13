import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {formatDistance} from "date-fns"
import { ArrowDownAZ, ArrowDownZA, ListChecks, Plus, Search, XSquare} from "lucide-react"
import { ITodo } from "../types/ITodo";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import {useReducer} from 'react'

const initialValues = {
  search : '',
  page : 1,
  limit : 3,
  order : 'asc',
  todoStatus : '',
  totalPages : 1
}

const reducer = (currentState:any, action:any)=>{
  switch(action.type){
    case "SET_ORDER" : return {...currentState, order: action.value};
    case 'SET_PAGE' : return {...currentState, page: action.value};
    case 'SET_LIMIT' : return {...currentState, limit: action.value};
    case'SET_SEARCH' : return {...currentState, search: action.value};
    case 'SET_TODOSTATUS' : return {...currentState, todoStatus: action.value};
    case 'SET_TOTALPAGES' : return {...currentState, totalPages: action.value};
    default : return currentState;
  }
}

const Todo = () => {
  // todo data
  const [state, dispatch] = useReducer(reducer, initialValues);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const navigate = useNavigate();
  const {data, error, isPending} = useQuery({
    queryKey: ['todos', state.page, state.limit, state.search, state.order, state.todoStatus],
    queryFn: async() => {
        const res = await axios.get(`http://localhost:5000/todos?_page=${state.page}&_limit=${state.limit}&title_like=${state.search}&_sort=title&_order=${state.order}&isCompleted_like=${state.todoStatus}`);
        dispatch({type:'SET_TOTALPAGES', value: Math.ceil(res.headers['x-total-count']/state.limit)})
        if(!state.limit) dispatch({type:'SET_TOTALPAGES', value:1})
        return res.data
    },
  })
  
  useEffect(()=>{
    if(!data) return;
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

  if(error){
    return <p>{error.message}</p>
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
          value={state.search}
          onChange={(e)=>{ dispatch({type:'SET_SEARCH', value: e.target.value});
                           dispatch({type:'SET_PAGE',value:1})}}
        />
        </div>
        <button className="flex bg-gray-900 py-2 rounded-xl w-30 p-2 text-sm text-white shadow-lg hover:text-gray-950 hover:bg-white border-solid border-2 border-gray-900 ">
          <Link to='/add' className="flex"><Plus className="h-5" /> Add todo </Link>
        </button>
        <button className="text-white bg-gray-800 px-3 py-1 rounded-md hover:bg-white hover:text-black border-solid border-2 border-gray-900"
          onClick={()=>dispatch({type: 'SET_ORDER', value: 'asc'})}> <ArrowDownAZ />
        </button>
        <button className="text-white bg-gray-800 px-3 py-1 rounded-md hover:bg-white hover:text-black border-solid border-2 border-gray-900"
          onClick={()=>dispatch({type: 'SET_ORDER', value: 'desc'})}> <ArrowDownZA />
        </button>
        <button className="text-white bg-gray-800 px-3 py-1 rounded-md hover:bg-white hover:text-black border-solid border-2 border-gray-900"
          onClick={()=>{dispatch({type:'SET_TODOSTATUS',value:'true'}); dispatch({type:'SET_PAGE', value:1})}}><ListChecks />
        </button>
        <button className="text-white bg-gray-800 px-3 py-1 rounded-md hover:bg-white hover:text-black border-solid border-2 border-gray-900"
          onClick={()=>dispatch({type:'SET_TODOSTATUS',value:''})}>All Todo
        </button>
      </div>
      </div>
      { isPending ? <h3>Loading......</h3> : 
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
        <div className="flex justify-center gap-10">
          <button className="mt-10 bg-gray-800 px-3 py-1 text-white rounded-md disabled:opacity-45"
            onClick={()=>dispatch({type:'SET_PAGE', value: state.page-1 })} disabled={state.page === 1}>Previous
          </button>
          <p className="mt-10">Page: {state.page}/{state.totalPages}</p>
          <button className="mt-10 bg-gray-800 px-3 py-1 text-white rounded-md disabled:opacity-45"
            onClick={()=>dispatch({type:'SET_PAGE', value: state.page+1 })} disabled={state.page >= state.totalPages}>Next
          </button>
          <input className="mt-10 w-20" type="number" placeholder="limit" value={state.limit} onChange={(e)=>{dispatch({type:'SET_LIMIT', value:parseInt(e.target.value)});dispatch({type:'SET_PAGE',value:1})}}/>
        </div>
      </div>
      }
    </div>
    </div>
  );
};

export default Todo;