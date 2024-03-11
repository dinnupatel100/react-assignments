import { useState, useEffect } from 'react';

type ITodo = {
  id: number;
  title: string;
  description: string;
  assignee: string;
  isCompleted: boolean;
  dueDate: string;
}

export const useFetch = (url:string)=>{
  const [data,setData] = useState<ITodo[]>([])
  const [error,setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(()=>{
      const fetchData = async ()=>{
          try{
              setIsLoading(true)
              const res = await fetch(url).then(res=>res.json()).catch(rej => { throw new Error(`${rej}`)})
              setData(res)
              setError('')
              setIsLoading(false)
          }catch(err:any){
              setError(err)
              setData([])
              setIsLoading(false)
          }
      }
      fetchData()
  },[])

  return { data ,error ,isLoading}
}

