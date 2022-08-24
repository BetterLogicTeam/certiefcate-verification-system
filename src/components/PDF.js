import React from "react";
import Pdf from "react-to-pdf";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
const ref = React.createRef();

const PDF = (props) => {
  return (
    <>
      <div className="Post" ref={ref}>
        <h1>Student Name:{props.name}</h1>
        {/* <img src={props.image} alt={props.title} /> */}
        <p>Institute Name:{props.institute}</p>
        <p>Program Name:{props.program}</p>
      </div>

      <button onClick={() => exportComponentAsPDF(ref)}>Export As PDF</button>
      <button onClick={() => exportComponentAsPNG(ref)}>Export As PNG</button>
      <button onClick={() => exportComponentAsJPEG(ref)}>Export As JPEG</button>

      {/* <Pdf targetRef={ref} filename="certiefcate.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Download as PDF</button>}
      </Pdf> */}
    </>
  );
};

export default PDF;
