import { useState } from "react"
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate()
  // let countId = 10;

  const handleSubmit = async ()=>{
    try{
      await fetch("http://localhost:5000/todos",{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          // 'id': countId+=1,
          'title':title,
          'isCompleted': false
        })
      }).then(()=> navigate('/') );
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
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
    </>
  )
}

export default AddTodo