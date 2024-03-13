import {useQuery} from '@tanstack/react-query'
import axios from 'axios';
import { ITodo } from '../types/ITodo';


export const useFetch = (url:string)=>{
  const {data, error, isPending} = useQuery({
        queryKey: ['todos'],
        queryFn: async() => await axios.get<ITodo[]>(url)
  })

  console.log("Data : ", data?.data);
  
  return { data, error, isPending }
}



