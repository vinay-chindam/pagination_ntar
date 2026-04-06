import React, { useEffect,useState } from 'react'

function Pagination2() {
    const url='https://jsonplaceholder.typicode.com/posts'
    const [data,setData]=useState([])
    const [page,setPage]=useState(1)
    const [limit]=useState(10)
    const totalPages=Math.ceil(data.length/limit)

    const startIndex=(page-1)*limit
    const endIndex=startIndex+limit
    const currentData=data.slice(startIndex,endIndex)
    async function fetchData(){
        const res= await fetch(url)
        const json=await res.json()
        setData(json)
    }

    useEffect(()=>{
        fetchData()
        
    })

    function handlePrev(){
        if(page==1){
            return
        }
        setPage((prev)=>prev-1)
    }
    function handleNext(){
        if(page>totalPages-1){
            return
        }
        setPage((prev)=>prev+1)
    }
  return (
    <div>
        { data.length>0 &&
            currentData.map((card)=><div>
                <h3>{card.title}</h3>
            </div>)
        }

        <div>
            {
                page>1 &&
                <button onClick={handlePrev}>Prev</button>
            }
            
            <span>{page}</span>
            {
                page<totalPages &&
                <button onClick={handleNext}>Next</button>
            }
            
        </div>
    </div>
  )
}

export default Pagination2