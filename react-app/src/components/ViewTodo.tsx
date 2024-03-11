import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

interface ITodo {
  id: number;
  title: string;
  description: string;
  assignee: string;
  isCompleted: boolean;
  dueDate: string;
}

const ViewTodo = () => {
  const [todo,setTodo] = useState<ITodo>()
  const param = useParams();

  useEffect(()=>{
    const fetchData = async() => {
      const res = await fetch("http://localhost:5000/todos/"+param.id).then(res=>res.json())
      setTodo(res)
    }
    fetchData();
  },[param.id])

  return (
  <div className="my-10">
    { todo &&
    <div className="text-2xl font-medium">
    <p className="mt-5">title : {todo.title}</p>
    <p className="mt-1">description : {todo.description}</p>
    <p className="mt-1">assignee : {todo.assignee}</p>
    <p className="">dueDate : {todo.dueDate}</p>
    </div>
    }
  </div>
  )
}

export default ViewTodo