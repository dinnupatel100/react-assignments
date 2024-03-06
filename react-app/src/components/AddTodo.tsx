import { useState } from "react"
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate()

  const handleSubmit = async ()=>{
    try{
      await fetch("http://localhost:5000/todos",{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          'title':title,
          'isCompleted': false
        })
      }).then(()=> navigate('/') );
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="todo-app">
      <h2>Add Todo</h2>
      <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="add a todo title"
      />
      <button
        id="add"
        onClick={handleSubmit}
      >
      ADD
      </button>
    </div>
  )
}

export default AddTodo