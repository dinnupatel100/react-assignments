import { useNavigate } from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as yup from 'yup'

// const navigate = useNavigate()

const initialValues = {
  title: "",
  description: "",
  assignee:"",
  dueDate:""
}

const validationSchema = yup.object({
  title:yup.string()
        .max(20,"title length must be less than 20 characters")
        .required("Title is required"),
  description:yup.string()
        .required("Description is required"),
  assignee:yup.string()
        .required("Assignee is required"),
  dueDate:yup.date()
        .min(new Date(),"due date cannot be less than current data")
        .required("Due Date is required")
})

const AddTodo = () => {
  const navigate = useNavigate()

  const onSubmit = async(values:any)=>{
    await fetch("http://localhost:5000/todos",{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({title:values.title,
        description:values.description,
        assignee:values.assignee,
        dueDate:values.dueDate,
        isCompleted:false
      })
    }).then(()=>{
      navigate('/')
    })
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <div className="mt-20 mx-80 ">
      <Form className="my-10 mx-16 border-solid border-2 border-gray-300 rounded-md">
        <Field
        className="h-10 mt-16 px-5 mx-16 w-96 border-solid border-2 border-gray-100 rounded-md"
        name = "title"
        placeholder="todo title"
        />
        <ErrorMessage name="title">
          {titleError => <p className="text-red-700 mx-20 text-sm">{titleError}</p>}
        </ErrorMessage>

        <Field
        className="h-10 mt-3 px-5 mx-16 w-96 border-solid border-2 border-gray-100 rounded-md"
        name = "description"
        placeholder="todo description"
        />
        <ErrorMessage name="description">
          {descriptionError => <p className="text-red-700 mx-20 text-sm">{descriptionError}</p>}
        </ErrorMessage>

        <Field
        className="h-10 mt-3 px-5 mx-16 w-96 border-solid border-2 border-gray-100 rounded-md"
        name = "assignee"
        placeholder="todo assignee"
        />
        <ErrorMessage name="assignee">
          {assigneeError => <p className="text-red-700 mx-20 text-sm">{assigneeError}</p>}
        </ErrorMessage>
        <Field
        className="h-10 mt-3 px-5 mx-16 w-96 border-solid border-2 border-gray-100 rounded-md"
        name = "dueDate"
        placeholder="todo due date"
        type="date"
        />
        <ErrorMessage name="dueDate">
          {dueDateError => <p className="text-red-700 mx-20 text-sm">{dueDateError}</p>}
        </ErrorMessage>
        
        <button
          className= "bg-gray-900 h-10  text-white my-6 mb-20 px-5 mx-16 rounded-md w-96"
          type="submit"
        >
        ADD
        </button>
      </Form>
      </div>
    </Formik>
  )
}

export default AddTodo