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
// import DocViewer from "react-doc-viewer";
import DocViewer, { PDFRenderer, PNGRenderer, DocViewerRenderers } from "react-doc-viewer";
import PDFViewer from 'mgr-pdf-viewer-react';
// import useDownloader from 'react-use-downloader';

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
import { toast } from "react-toastify";

function Checkcertificate() {

    // const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const ref = React.createRef();
    const myref = React.createRef();

    const [isShow, setIsshow] = useState(false);
    const [pdfFile, setPdfFile] = useState('');

    const file = './certiefcate.pdf'
    const type = 'pdf'

    const [cnic_value, setcnic_value] = useState();
    const [filename, setfilename] = useState([]);
    const docs = [
        // { uri: "https://ipfs.moralis.io:2053/ipfs/QmXnT7nMu3fBojxvkza12s3tdVRp88GGF3QrcEbNTaRwLe",fileType:"pdf" }
        { uri: "https://ipfs.moralis.io:2053/ipfs/QmXnT7nMu3fBojxvkza12s3tdVRp88GGF3QrcEbNTaRwLe", fileType: "pdf" },
        // Local File
    ];

    const submitdata = async () => {

        let acc = await loadWeb3();

        if (acc == "No Wallet") {
            toast.error("No Wallet Connected")
           
        }
        else if (acc == "Wrong Network") {
           
            toast.error("Wrong Newtwork please connect to test net")

        }
        else {

            try {
                
                const web3 = window.web3;
                let nftContractOf = new web3.eth.Contract(certificateContractAbi, certificateContractAddress);
                let hash = await nftContractOf.methods.getData(cnic_value).call()
                toast.success("Successfull Fetched")
                console.log('what is return from blockchain', hash)
                setPdfFile(hash[4]);
                setfilename(hash)
                setIsshow(true)


            } catch (error) {
                toast.error(error)
            }


        }

    }


    return (

        <div className="container my-5">

            <form>
                <div class="form-group">
                    <label for="" className="text-white">Enter Cnic:</label>
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

                    <div className="col-4">


                        <img className="img-fluid" src={filename[3]} ref={ref} />
                        {pdfFile && <button className="btn btn-secondary  mt-3" onClick={() => exportComponentAsPNG(ref)}>
                            Export As PNG
                        </button>
                        }

                    </div>
                    <div className="col-4">
                        <iframe
                            width="300"
                            height="330"
                            src={filename[2]}
                            frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />                 

                    </div>
                    <div className="col-4">
                        {pdfFile && <ReactAudioPlayer
                            src={filename[1]}
                            controls
                        />}

                    </div>
               



                    <div className="col-12 mt-5">

                        {/* <DocViewer  style={{ width: '100%', height: 450 }} documents={docs} pluginRenderers={DocViewerRenderers}/> */}

                        {pdfFile && <PDFViewer document={{
                            url: pdfFile
                        }} />}


                    </div>
                </div>

                {isShow == true ? <div className="text-center">

                    {/* <Pdf targetRef={ref} filename="certiefcate.pdf">
                        {({ toPdf }) => <button className="btn btn-secondary" onClick={toPdf}>Export As PDF</button>}
                    </Pdf> */}
                    {/* <PDFReader url={"http://www.africau.edu/images/default/sample.pdf"} width={500} ></PDFReader> */}
                    <button className="btn btn-secondary mx-2" onClick={() => exportComponentAsPDF(myref)}>
                        Export As PDF
                    </button>

                </div> : ""}


            </div>


        </div>
    );
}
export default Checkcertificate;
