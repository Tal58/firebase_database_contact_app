import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ButtonAbout, CoveredDiv } from './About.styled'

function About() {
    const navigate = useNavigate()
    const notify = () =>
  toast.success(`You can see details of Mihail Tal`, {
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
    <CoveredDiv>
    <p>👩‍💻 I'm currently working on Full Stack Development...</p>

    <p>🧠 I'm currently learning all tools which are required for becoming a master of FS...</p>
    
    <p>👯‍♀️ I'm looking to collaborate with everyone who would like to make a useful project to mankind...</p>

    <p>🤔 Ask me about anything you want...</p>

    <img alt='' src="https://media1.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"/> 

    <ButtonAbout  onClick={()=> navigate(-1)}>Back</ButtonAbout>
    <ToastContainer />
    </CoveredDiv>
  )
}

export default About