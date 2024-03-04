import {useEffect, useState} from 'react'
import {format} from 'date-fns'

interface ITodo{
  id: number
  title : string
  dueDate : Date
}

const Todo = () => {
  const [todos,setTodos] = useState<ITodo[]>([])
  const [title, setTitle] = useState<string>("")
  const [date, setDate] = useState(new Date())

  const fetchData = async () => {
    const data = await fetch('http://localhost:5000/todos').then(res=>res.json())
    setTodos(data)
  }

  useEffect(() => {
    fetchData()
  }, [todos])

  const handleSubmit = (event:any) => {
    event.preventDefault()
    setTodos([...todos])
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title:title, dueDate: date})
    })
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>title : </label>
      <input
        type="text"
        value ={title}
        onChange={(e)=> setTitle(e.target.value)}
      />
      <label>Due date : </label>
      <input 
        type="date"
        value={format(date, 'yyyy-MM-dd')}
        onChange = {(e)=>setDate(new Date(e.target.value))}
      />
      <button type="submit">Add Todo</button>
    </form>

    {
      todos.map((todo:ITodo) => (
        <div key={todo.id}>
          <h2>{todo.title}</h2>
          <p>{format(todo.dueDate, 'yyyy-MM-dd')}</p>
        </div>
      ))
    }
    </>
  )
}

export default Todo