import {Formik, Form, Field, ErrorMessage} from 'formik'
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
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
    <div className='taskform'>
      <Form>
        <h2>Task Form</h2>
        <Field
          type="text" 
          placeholder="Enter a title"
          name="title"
        />
        <ErrorMessage name="title">
          {titleError => <p className="error">{titleError}</p>}
        </ErrorMessage>
        <Field
          type="text" 
          placeholder="Enter a description" 
          name="description"
        />
        <ErrorMessage name="description">
          {descriptionError => <p className="error">{descriptionError}</p>}
        </ErrorMessage>
        <Field
          type="text" 
          placeholder="Enter assignee"
          name="assignee"
        />
        <ErrorMessage name="assignee">
          {assigneeError => <p className="error">{assigneeError}</p>}
        </ErrorMessage>
        <Field
          type="date" 
          placeholder="Enter a due date" 
          name="dueDate"
        />
        <ErrorMessage name="dueDate">
          {dueDateError => <p className="error">{dueDateError}</p>}
        </ErrorMessage>

        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </Form>
    </div>
    </Formik>
  )
}

export default TaskForm