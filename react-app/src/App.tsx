import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Todo from './Todo'
import AddTodo from './AddTodo'
import Error from './Error'
import ViewTodo from './ViewTodo'

function App() {
  return  (<>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Todo />}/>
          <Route path='/add' element={<AddTodo />}/> 
          <Route path= '/view/:id' element={<ViewTodo/>}/>
          <Route path= '*' element={<Error/>}/>
        </Routes >
      </BrowserRouter>
    </>
  )
}

export default App