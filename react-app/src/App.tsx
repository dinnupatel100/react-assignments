import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Todo from './components/Todo'
import AddTodo from './components/AddTodo'
import Error from './components/Error'
import ViewTodo from './components/ViewTodo'
import Navbar from './components/Navbar'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  return  (<>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Todo />}/>
          <Route path='/add' element={<AddTodo />}/> 
          <Route path= '/view/:id' element={<ViewTodo/>}/>
          <Route path= '*' element={<Error/>}/>
        </Routes >
      </QueryClientProvider>
    </BrowserRouter>
    </>
  )
}

export default App