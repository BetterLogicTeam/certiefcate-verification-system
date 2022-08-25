import React, { useState } from "react";
// Import the main component
// import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library  
// Import the styles
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
// import { Worker } from "@react-pdf-viewer/core"; // install this library
import Upload_File from "./components/Upload_File";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Certiefcate from "./components/Certiefcate";
import Upload_image from "./components/Upload_image";
import Checkcertificate from "./components/Checkcertificate";

export const App = () => {
  return (

<>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="#">Better Logics</a>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
        {/* <li class="nav-item">
        <Link to="/certiefcate" className="text-decoration-none">
        <a class="nav-link text-decoration-none" href="#">Generate certiefcate </a>
          
        </Link>
        </li> */}
        {/* <li class="nav-item">
        <Link to="/uploadpdf" className="text-decoration-none">
        <a class="nav-link text-decoration-none" href="#">Upload pdf </a>
          
        </Link>
        </li> */}
        <li class="nav-item">
        <Link to="/" className="text-decoration-none">
        <a class="nav-link text-decoration-none" href="#">Upload Files </a>
          
        </Link>
        </li>
        <li class="nav-item">
        <Link to="/checkcertificate" className="text-decoration-none">
        <a class="nav-link text-decoration-none" href="#">Checkcertificate </a>
          
        </Link>
        </li>
        
       
      </ul>
      
    </div>
  </div>
</nav>
<div className="App" style={{backgroundColor:"#152733"}}>
     <h2 className="mb-5 container pt-3 text-white"> Certificates Verification system</h2>
       
      
      <Routes>
        {/* <Route path="/certiefcate" element={<Certiefcate />} />
        <Route path="/uploadpdf" element={<Upload_File />} /> */}
        <Route path="/" element={<Upload_image />} />
        <Route path="/checkcertificate" element={<Checkcertificate />} />

      </Routes>
    </div></>


    
  );
};

export default App;
