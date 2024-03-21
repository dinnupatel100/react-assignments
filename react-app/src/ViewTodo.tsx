import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const ViewTodo = () => {
  const [title,setTitle] = useState<string>("")
  const param = useParams();

  useEffect(()=>{
    const fetchData = async() => {
      const res = await fetch("http://localhost:5000/todos/"+param.id).then(res=>res.json())
      console.log("response : ", res.title)
      setTitle(res.title)
    }
    fetchData();
  },[param.id])

  return (
  <div>
  <label>Title : </label>
  <p>{title}</p>
  </div>
  )
}

export default ViewTodo