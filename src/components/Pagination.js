import { useEffect, useState } from "react"


function Pagination(){

    const [data,setData]=useState([])
    const [page,setPage]=useState(1)
    const [limit]=useState(10) 
    const totalPages=Math.ceil(data.length/limit)  
    
     async function fetchData(){
        const resp=await fetch('https://jsonplaceholder.typicode.com/posts')
        const data=await resp.json()
        setData(data)
    }
    useEffect(()=>{
        fetchData()
    },[])

    function handleNext(){
        setPage((prev)=>prev+1)
    }
    function handlePrev(){
        if(page>1)
        setPage((prev)=>prev-1)
    }

    const startIndex=(page-1)*limit
    const endIndex=startIndex+limit
    const currentData=data.slice(startIndex,endIndex)

    return (
        <>

        <h2>Pagination</h2>
        <div>
            { data.length>0 &&
                currentData.map((card)=><div>
                    <span>{card.title}</span>
                </div>)
            }
        </div>
        <div>
            {
                page>1 &&
                <button onClick={handlePrev}>prev</button>
            }
            
            <span>{page}</span>
            {
                page<totalPages &&
                <button onClick={handleNext}>Next</button>
            }
            
        </div>
        </>
    )
}

export default Pagination;