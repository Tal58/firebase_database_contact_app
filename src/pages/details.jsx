import React,{useEffect} from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./details.css"

const Details = () => {
  const {state:user}= useLocation()
  const navigate = useNavigate()
  console.log(user)
  const notify = () =>
  toast.success(`You can see details of ${user[1]["username"]}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
useEffect(()=>{
  notify();
})

  return (
    <div className="pages">   
    <Card style={{ width: '18rem' }}> 
    <Card.Body>
    <Card.Img variant="top img-thumbnai" src={user[1]["flag"]} />
      <Card.Title className='User'><b>Avatar:</b>{user[1]["avatar"]}</Card.Title>
      <Card.Title><b>User Name:</b>{user[1]["username"]}</Card.Title>
      <Card.Title>
      <b> Phone Number:</b>{user[1]["phone"]}
      </Card.Title>
      <Card.Title>
        <b>Gender:</b>{user[1]["gender"]}
      </Card.Title>
      <Button onClick={()=>navigate(-1)} variant="success">Home Page</Button>
    </Card.Body>
  </Card>
  <ToastContainer />
  </div>
  )
}

export default Details