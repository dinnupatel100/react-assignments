import { useState } from "react"
import { useNavigate } from "react-router-dom";
import {format} from 'date-fns'

const AddTodo = () => {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const navigate = useNavigate()

  const handleSubmit = async ()=>{
    try{
      await fetch("http://localhost:5000/todos",{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          'title':title,
          'isCompleted': false,
          'dueDate': date
        })
      }).then(()=> navigate('/') );
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="my-20 mx-80">
      {/* <h2 className="bg-gray-800 text-white h-10 px-64 py-2 rounded-xl">Add Todo</h2> */}
      <input
      className="h-8 mt-8 px-5 mx-28 w-96 border-solid border-2 border-gray-100 rounded-md"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="add a todo title"
      />
      <input
      className="h-8 mt-4 px-5 mx-28 border-solid border-2 border-gray-100 rounded-md w-96"
      type="date"
      value={format(date, 'yyyy-MM-dd')}
      onChange={(e) => setDate(new Date(e.target.value))}
      />
      <button
        className= "bg-gray-900 h-8  text-white my-6 mb-20 px-5 mx-28 rounded-md w-96"
        id="add"
        onClick={handleSubmit}
      >
      ADD
      </button>
    </div>
  )
}

export default AddTodo