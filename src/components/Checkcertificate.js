import React, { useState } from "react";
import Pdf from "react-to-pdf";
// import PDFViewer from 'pdf-viewer-reactjs'
// import PDFViewer from 'pdf-viewer-reactjs'
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player';
import {
    exportComponentAsJPEG,
    exportComponentAsPDF,
    exportComponentAsPNG,
} from "react-component-export-image";
import { loadWeb3 } from '../apis/api'
import { certificateContractAddress, certificateContractAbi } from '../utilies/contract';
import FileViewer from 'react-file-viewer';


// import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
// import { Worker } from "@react-pdf-viewer/core"; // install this library
import { useMoralis, useMoralisFile } from "react-moralis";
import Moralis from "moralis";
import { PDFReader } from 'reactjs-pdf-view';
function Checkcertificate() {
    // const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const ref = React.createRef();
    const [isShow, setIsshow] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const file = 'http://www.africau.edu/images/default/sample.pdf'
  const type = 'pdf'

    const [cnic_value, setcnic_value] = useState();
    const [filename, setfilename] = useState([]);

    const submitdata = async () => {

        let acc = await loadWeb3();

        alert('what is accout' + acc)

        if (acc == "No Wallet") {
            alert("No Wallet Connected")
        }
        else if (acc == "Wrong Network") {
            alert("Wrong Newtwork please connect to test net")
        }
        else {

            try {
                const web3 = window.web3;
                let nftContractOf = new web3.eth.Contract(certificateContractAbi, certificateContractAddress);
                let hash = await nftContractOf.methods.getData(cnic_value).call()
                console.log('what is return from blockchain',hash)
                // setPdfFile(hash[1]);
                setfilename(hash)
                setIsshow(true)


            } catch (error) {
                alert(error)
            }


        }

    }

    console.log('what is return from blockchain',filename)

    return (
        <div className="container my-5">

            <form>
                <div class="form-group">
                    <label for="">Enter Cnic:</label>
                    <input class="form-control" type="number"
                        placeholder="ENTER CNIC NUMBER "
                        name="cnic"
                        max={13}
                        value={cnic_value}
                        onChange={(e) => {
                            setcnic_value(e.target.value);
                        }} />

                </div>
                <button className="btn btn-secondary" onClick={submitdata}>
                    submit
                </button>
            </form>

            <div>
            {pdfFile && (
          <>
           {/* <Pdf targetRef={ref} filename="certiefcate.pdf">
                        {({ toPdf }) => <button className="btn btn-secondary my-3" onClick={toPdf}>Export As PDF</button>}
                    </Pdf>

                    <PDFViewer
            document={{
                url: {pdfFile}
            }}
        /> */}


            {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js" >
              <Viewer
                fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}
                ref={ref}
              />
            </Worker> */}
            
          </>
          
        )}
<div className="row container mt-3">
<FileViewer
        fileType='png'
        filePath={filename[3]}
        
       />
<div className="col-4">

      <img className="img-fluid" src={filename[3]} ref={ref} />

                
</div>
<div className="col-4">

<ReactAudioPlayer
  src={filename[1]}
  autoPlay
  controls
/>

                
</div>
<div className="col-4">
     <iframe
        width="500"
        height="300"
        src={filename[2]}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        
        />

{/* <ReactPlayer url={filename[2]} loop={true} playing={false} controls={true}  /> */}


                
</div>
</div>
                
           


                {/* <iframe
      width="150"
      height="20"
      src={filename[1]}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    /> */}

    {/* <iframe
        width="500"
        height="300"
        src={filename[2]}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        /> */}

                {isShow == true ? <div className="text-center">

                    {/* <Pdf targetRef={ref} filename="certiefcate.pdf">
                        {({ toPdf }) => <button className="btn btn-secondary" onClick={toPdf}>Export As PDF</button>}
                    </Pdf> */}
                     <PDFReader url={"http://www.africau.edu/images/default/sample.pdf"} width={500} ></PDFReader>
                    <button className="btn btn-secondary mx-2" onClick={() => exportComponentAsPDF(ref)}>
                        Export As PDF
                    </button>
                    <button className="btn btn-secondary mx-2" onClick={() => exportComponentAsPNG(ref)}>
                        Export As PNG
                    </button>
                    <button className="btn btn-secondary" onClick={() => exportComponentAsJPEG(ref)}>
                        Export As JPEG
                    </button>
                </div> : ""}


            </div>


        </div>
    );
}
export default Checkcertificate;
