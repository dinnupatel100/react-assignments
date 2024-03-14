import {useSelector, useDispatch} from 'react-redux'
import type { RootState } from '../store/store'
import {increment, decrement, reset} from '../reducers/CounterReducer'

const Counter = () => {
  const count = useSelector((state:RootState) => state.counter.count)
  const dispatch = useDispatch()
  return (
    <div>
      <h1>Counter :{count}</h1>
      <p>
        <button onClick= {()=>dispatch(increment())}>Increment</button>
        <button onClick= {()=>dispatch(decrement())}>Decrement</button>
        <button onClick= {()=>dispatch(reset())}>Reset</button>
      </p>
    </div>
  )
}

export default Counter;