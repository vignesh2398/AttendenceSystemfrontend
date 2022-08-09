import React, { useEffect,useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

export const TimeSheet = () => {
    const [data,setdata]=useState([]);
    const[loginvalue,setlogin]=useState({logindate:"",logintime:"",logoutdate:"",logouttime:""})
    const[timedate,settimedate]=useState({_id:"",Login:"",Logout:""})
    
    let navigate = useNavigate();
    let auth= async()=>{
    let token = sessionStorage.getItem('token');
    if(token)
    {
        let res = await axios.get(`https://employeeattendence123.herokuapp.com/emply/verify-token/${token}`)
        if(res.data.statusCode===401)
        {
            sessionStorage.clear();
            navigate('/employeelogin')
        }
        if(res.data.statusCode===400)
        {
            const vv= await res.data.payload
        const data = setdata(res.data.payload)
        console.log(vv ," verfication completed")
        
        }

    }
    else{
        navigate('/employeelogin')
    }
    }

    let update= async()=>{
        const iattendenceinput= await axios.post(`https://employeeattendence123.herokuapp.com/updateattendence`,timedate)
            if(iattendenceinput.data.statusCode===200)
            {
                alert("timesheet updated")
                navigate('/')
                
            }
            else
            {
                alert("please fill all details")
            }


            
        

    }


const handlesumbit=async(e)=>{
    e.preventDefault();
var momentObj = moment(loginvalue.logindate + loginvalue.logintime , 'YYYY-MM-DDLT');
var momentObj2 = moment(loginvalue.logoutdate + loginvalue.logouttime , 'YYYY-MM-DDLT');
// conversion
var logindate = momentObj.format('YYYY-MM-DDTHH:mm:s');
var logoutdate2 = momentObj2.format('YYYY-MM-DDTHH:mm:s');
settimedate({_id:data.attendnce,Login:logindate,Logout:logoutdate2})

console.log(logindate.toString)


console.log(logindate,"its time",logoutdate2)
            console.log(loginvalue)
            console.log("its time",timedate)
            update()
    }
    
    const handlechange=(e)=>{
    const { name, value } = e.target;
        console.log(value)
   

        setlogin({...loginvalue,[name]:value})
       

    }

    useEffect(()=>{
        auth()
    },[])
  return (
    <div>
<div className='container col-3'>

<form onSubmit={handlesumbit} >
  <div class="form-group">
    <h1>TimeSheet</h1>
    <h5>Hello {data?.name}</h5>
    <label for="exampleInputEmail1">Login Time</label>
    <input type="date" class="form-control" id="exampleInputEmail1" onChange={handlechange} name="logindate" 
    aria-describedby="emailHelp" placeholder="Enter email"/>
    <input type="time" class="form-control" id="exampleInputEmail1" onChange={handlechange} name="logintime" 
     aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Logout Time</label>
    <input type="date" class="form-control" id="exampleInputPassword1" name="logoutdate" onChange={handlechange}  placeholder="Log out"/>
    <input type="time" class="form-control" id="exampleInputPassword1" name="logouttime" onChange={handlechange} placeholder="Log out time"/>
  </div>
 
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
    
    
    </div>
  )
}
