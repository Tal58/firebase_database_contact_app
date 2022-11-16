import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ResponsiveAppBar from "./pages/Navbar";
import './App.css';
import Details from "./pages/details";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
 <ResponsiveAppBar />
      <div className="App">
        <Routes>
          <Route path="/" element= {<Home />} />
          <Route path="details" element= {<Details />} /> 
          <Route path="about" element= {<About />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
