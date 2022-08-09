import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

var url='https://employeeattendence123.herokuapp.com/login'
const Login = () => {
    const[loginvalue,setlogin]=useState({"Email":"","Password":""})
    const [message,setmessgae]=useState(false)
    const [loading,setloading]=useState(false)
    let navigate = useNavigate();
    const handlechange=(e)=>{
        const { name, value } = e.target;
        setlogin({...loginvalue,[name]:value})

    }
    const handlesumbit=async(e)=>{
        e.preventDefault();
        setloading(true)
        let res=await axios.post(url,loginvalue)
        if(res.data.statusCode===200)
        {
            setmessgae(false)
            setloading(false)
            sessionStorage.setItem('token',res.data.token)
            navigate('/AdminDashBoard')
            console.log(res.data.token)
        }
        else{
            setmessgae(true)
            setloading(false)
            console.log("user not exist"+res.data.statusCode)
        }
        console.log(loginvalue)

    }

    var redirect=()=>{
        let token = sessionStorage.getItem('token');
        if(token)
        {
            navigate('/AdminDashBoard')
        }
    }
    

    useEffect(()=>{
        redirect()
        },[])
  return (
    <><form className="container col-6" onSubmit={handlesumbit}>
    <div className="form-group ">
        <h1>Admin Login</h1>
      <label hrmlfor="exampleInputEmail1">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
      name="Email" value={loginvalue.Email} onChange={handlechange} placeholder="Enter email"/>

    </div>
    <div className="form-group">
      <label htmlfor="exampleInputPassword1">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" name="Password" value={loginvalue.Password} 
      onChange={handlechange} 
        placeholder="password"/>
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
    <div className='my-3'>{message?<span>incorrect details</span>:<></>}</div>
  <div className='my-3'>{loading?<p>loading..</p>:<></>}</div>
  </form></>
  )
}

export default Login