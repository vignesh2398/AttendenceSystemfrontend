
import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import axios from "axios";
import { Admin_sideBar } from './Admin_sideBar';
import { Add_employee } from './Add_employee';
import Login from './LoginForm';

var url='https://employeeattendence123.herokuapp.com'
export const Admin_DashBoard = () => {

    let navigate = useNavigate();
    let auth = async()=>{
        let token = sessionStorage.getItem('token');
        if(token)
        {
            let res = await axios.get(`${url}/users/verify-token/${token}`)
            if(res.data.statusCode===401)
            {
                sessionStorage.clear();
                navigate('/AdminLogin')
  
            }
        }
        else{
          navigate('/AdminLogin')
        }
    }
  
    useEffect(()=>{
  auth()
  },[])
  const logout=async()=>{
    sessionStorage.clear();
    navigate('/AdminLogin')
  
  }
  return (
    <>
    <Admin_sideBar  />
    <div className="conatiner col-2 my-2">
        <button onClick={logout}>logout</button>
    </div> 
    

    </>

  )
}
