import { useState, useEffect } from 'react';
type ITodo = {
  id: number;
  title: string;
  isCompleted: boolean;
}

export const useFetch = (url:string)=>{
  const [data,setData] = useState<ITodo[]>([])
  const [error,setError] = useState<string>('')

  useEffect(()=>{
      const fetchData = async ()=>{
          try{
              const res = await fetch(url).then(res=>res.json()).catch(rej => { throw new Error(`${rej}`)})
              setData(res)
              setError('')
          }catch(err:any){
              setError(err)
              setData([])
          }
      }
      fetchData()
  },[])

  return { data ,error}
}

