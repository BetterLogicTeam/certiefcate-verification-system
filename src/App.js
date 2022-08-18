import React, { useState } from "react";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
import Upload_File from "./components/Upload_File";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Certiefcate from "./components/Certiefcate";

export const App = () => {
  return (
    <div className="App">
      <nav>
        <Link to="/certiefcate">
          <button>Generate certiefcate </button>
        </Link>
        {/* <Link to="/uploadcertiefcate">Generate certiefcate</Link> */}
      </nav>
      <nav>
        <Link to="/uploadcertiefcate">
          <button>Upload Certiefcate</button>
        </Link>
      </nav>
      <Routes>
        <Route path="/certiefcate" element={<Certiefcate />} />
        <Route path="/uploadcertiefcate" element={<Upload_File />} />
      </Routes>
    </div>
  );
};

export default App;
