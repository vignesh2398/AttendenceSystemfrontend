import React from 'react'
import axios from 'axios';
import  { useEffect, useState } from 'react'
import { Admin_DashBoard } from './Admin_DashBoard'
var url='https://employeeattendence123.herokuapp.com/viewattence'
export const Delete_employee = () => {const [user,setusers]=useState([]);
    const [index,setindex]=useState(1);
    const [count,setcount]=useState(1);
    const handledelete=async(id)=>{
        console.log(id)
        const del= await axios.delete(`${url}/delete/${id}`)
        if(del)
        {
            setcount(count+1)
        }
    }


  
    useEffect(()=>{
      async function fetchData() {
        // You can await here
        try {
          const res=await axios.get(url)
           console.log(res.data.users)
           
           setusers(res.data.users)
          } catch (error) {
            console.log(error)
          }
          // ...
        }
        fetchData();
        async function fetchattendence(){
        
        }
        
        
      },[count])
   
      
      
      
      return (
        <>
        <Admin_DashBoard/>
  {
    user?
    
    <div className="container col-4">
    <table class="table table-bordered ">
    <thead>
      <tr>
        <th scope="col">Employeeid</th>
        <th scope="col">Name</th>
        <th scope="col">CTC</th>
        <th scope="col">No.s days present</th>
        <th scope="col">Salary</th>
      
        
      </tr>
    </thead>
        {  user.map((user)=>{
       
            const abc= (user.attendnce.atte).length
            const Salary= (user.ctc)/264*abc
          return(
    <tbody>
      <tr>
        {console.log(abc)}
        <td>{user?.Employeeid}</td>
        <td>{user?.name}</td>
        <td>{user?.ctc}</td>
        <td>{abc}</td>
        <td>{Salary}</td>
        <td>  <button type="button" class="btn btn-danger" onClick={()=>handledelete(user._id)}>Delete</button></td>
        
      </tr>
      
    </tbody>
  )
  })}
  </table>
  </div>
    //close
  :<div><p>loading..</p></div>
  }
  
  </>
  
    )
}
