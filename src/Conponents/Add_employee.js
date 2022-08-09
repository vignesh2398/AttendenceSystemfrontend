import React from 'react'
import { Admin_DashBoard } from './Admin_DashBoard'
import { Admin_sideBar } from './Admin_sideBar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

var url='https://employeeattendence123.herokuapp.com/emply/register'

export const Add_employee = () => {
    
    const[registervalue,setregister]=useState({"name":"","email":"","Employeeid":"","ctc":"","password":""})
    const [message,setmessgae]=useState(false)
    const [loading,setloading]=useState(false)
    let navigate = useNavigate();
    const handlechange=(e)=>{
        const { name, value } = e.target;
        setregister({...registervalue,[name]:value})

    }
    const handlesumbit=async(e)=>{
        e.preventDefault();
        setloading(true)
        let res=await axios.post(url,registervalue)
        if(res.data.statusCode===200)
        {
            setmessgae(false)
            setloading(false)
           alert("user created")
            console.log(res.data.data)
        }
        else{

            if(res.data.statusCode===400)
            {
                setmessgae(true)
                setloading(false)
                console.log(registervalue)
            }
            else{
                setmessgae(true)
                console.log(registervalue)

            }
           
        }

    }
  return (
    <>
    
    <Admin_DashBoard/>
    <form className="container col-4 my-1" onSubmit={handlesumbit}>
    <div className="form-group ">
        <h1>Employee Register Form</h1>
      <label hrmlfor="exampleInputEmail1 my-2" >Name</label>
      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
      name="name" value={registervalue.name} onChange={handlechange} placeholder="Enter Name"/>
      
      <label hrmlfor="exampleInputEmail1">Employeeid</label>
      <input type="test" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
      name="Employeeid" value={registervalue.Employeeid} onChange={handlechange} placeholder="Enter Employee ID"/>
      
      <label hrmlfor="exampleInputEmail1">Email</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
      name="email" value={registervalue.email} onChange={handlechange} placeholder="Enter email"/>

      <label hrmlfor="exampleInputEmail1">ctc</label>
      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
      name="ctc" value={registervalue.ctc} onChange={handlechange} placeholder="Enter CTC"/>
    </div>
    <div className="form-group">
      <label htmlfor="exampleInputPassword1">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={registervalue.Password} 
      onChange={handlechange} 
        placeholder="password"/>
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
    <div className='my-3'>{message?<span>"User exist"</span>:<></>}</div>
  <div className='my-3'>{loading?<p>loading..</p>:<></>}</div>
  </form>

  
    </>
  )
}
