import {useFormik} from 'formik'
import * as yup from 'yup'
import '../stylesheets/TaskForm.css'

const initialValues = {
  title: "",
  description: "",
  assignee:"",
  dueDate:""
}

const onSubmit = (values:object)=>{
  console.log(values)
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

const TaskForm = () => {
  
  const {touched, errors, getFieldProps, handleReset, handleSubmit} = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })
  
  return (
    <div className='taskform'>
      <form onSubmit={handleSubmit}>
        <h2>Task Form</h2>
        <input 
          type="text" 
          placeholder="Enter a title"
          {...getFieldProps('title')}
          // value= {values.title}
          // onBlur = {handleBlur}
          // onChange = {handleChange}
        />
        {touched.title && errors.title && <p>{errors.title}</p>}
        <input 
          type="text" 
          placeholder="Enter a description" 
          {...getFieldProps('description')}
        />
        {touched.description && errors.description && <p>{errors.description}</p>}
        <input 
          type="text" 
          placeholder="Enter assignee"
          {...getFieldProps('assignee')}
          />
          {touched.assignee && errors.assignee && <p>{errors.assignee}</p>}
        <input 
          type="date" 
          placeholder="Enter a due date" 
          {...getFieldProps('dueDate')}
        />
        {touched.dueDate && errors.dueDate && <p>{errors.dueDate}</p>}

        <button type="submit">Submit</button>
        <button onClick={handleReset}>Reset</button>
      </form>
    </div>
  )
}

export default TaskForm