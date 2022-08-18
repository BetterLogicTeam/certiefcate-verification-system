import React from "react";
import Pdf from "react-to-pdf";

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
      <Pdf targetRef={ref} filename="certiefcate.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Download as PDF</button>}
      </Pdf>
    </>
  );
};

export default PDF;
