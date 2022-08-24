import React, { useState } from "react";

import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";

import { loadWeb3 } from '../apis/api'
import { certificateContractAddress, certificateContractAbi } from '../utilies/contract';

// Plugins

// Import the styles

// Worker

import { useMoralis, useMoralisFile } from "react-moralis";
import Moralis from "moralis";
function Upload_image() {
  const ref = React.createRef();
  const [selectedFile, setSelectedFile] = useState();
  const [audio, setAudio] = useState();
  const [video, setVideo] = useState();
  const [pdf, setPdf] = useState();
  const [image, setImage] = useState();




  const [file, setFile] = useState();
  const { saveFile, moralisFile } = useMoralisFile();
  const [allinputdata, setAllinputdata] = useState([]);
  const {
    authenticate, isAuthenticated, isAuthenticating, user, account, logout 
  } = useMoralis();
  const [isSelected, setIsSelected] = useState(false);
  //   console.log("what is inside file", selectedFile);
  const [cnic_value, setcnic_value] = useState();
    const [filename, setfilename] = useState();
   
const submitdata=async()=>{
 
  let acc = await loadWeb3();

  alert('what is accout'+acc)


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
  let hash = await nftContractOf.methods.storedata(cnic_value,allinputdata[0],allinputdata[1],allinputdata[2],allinputdata[3]).send({
    from: acc,
   

})
alert('successfully uploaded data')
console.log(hash)
  
} catch (error) {
  alert(error)
}
 

}

}
  const IpfsStorage = async (value) => {
    // setIsSpinner(true);
    // e.preventDefault();
    console.log(" what is file",value);

    await authenticate({ signingMessage: "Log in using Moralis" })
      .then(async function (user) {
        console.log("logged in user:", user);
        const fileIpfs = new Moralis.File(value.name,value);
        await fileIpfs.saveIPFS(null, { useMasterKey: true });
        console.log("what is return from moralis", fileIpfs._ipfs);
        let urlimage = fileIpfs._ipfs;

        setAllinputdata([...allinputdata,urlimage])

        setfilename(urlimage)
        console.log('what is inside urlImage',urlimage)
     
      })
      .catch(function (error) {
        console.log(error);
        // setIsSpinner(false);
      });
  };

  const submit = (event) => {
    event.preventDefault();
    // setAllinputdata([...allinputdata,image,pdf,video,audio])
    // setfinalvalue(cnic_value);
    // login()
    IpfsStorage()
  };
  console.log('what is inside array',allinputdata)
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    // setFile(URL.createObjectURL(event.target.files[0]));
    setIsSelected(true);
  };


  const changeHandlerPdf = (event) => {
    setPdf(event.target.files[0]);

    IpfsStorage(event.target.files[0])


    // setFile(URL.createObjectURL(event.target.files[0]));
    setIsSelected(true);
  };

  const changeHandlerImage = (event) => {
    setImage(event.target.files[0]);
    IpfsStorage(event.target.files[0])

    // setFile(URL.createObjectURL(event.target.files[0]));
    setIsSelected(true);
  };
  const changeHandlerAudio = (event) => {
    setAudio(event.target.files[0]);
    IpfsStorage(event.target.files[0])

    // setFile(URL.createObjectURL(event.target.files[0]));
    setIsSelected(true);
  };

  const changeHandlerViedo = (event) => {
    setVideo(event.target.files[0]);
    console.log('what is video',event.target.files[0])
    IpfsStorage(event.target.files[0])

    // setFile(URL.createObjectURL(event.target.files[0]));
    setIsSelected(true);
  };





 
  return (
    <div className="container mt-5">
      <form>


      <div class="mb-3">
  <label for="formFile" class="form-label">Enter Cnic</label>
  <input class="form-control" type="number"
       
       placeholder="Enter cnic "
       name="cnic"
       max={13}
       value={cnic_value}
       onChange={(e) => {
         setcnic_value(e.target.value);
       }} />
  
</div>
      {/* <input
        type="number"
        placeholder="Enter cnic "
        name="cnic"
        max={13}
        value={cnic_value}
        onChange={(e) => {
          setcnic_value(e.target.value);
        }}
      /> */}
      {/* <button type="submit" onClick={submit}>
        Submit
      </button> */}
      {/* <button type="submit" className="btn btn-secondary ml-3" onClick={submit}>
        upload on moralis
      </button> */}
  
      </form>   

      <div>
          <div class="mb-3">
  <label for="formFile" class="form-label">Upload pdf</label>
  <input class="form-control" type="file" name="file" onChange={changeHandlerPdf} />
  
</div>
<div class="mb-3">
  <label for="formFile" class="form-label">Upload Image</label>
  <input class="form-control" type="file" name="file" onChange={changeHandlerImage} />
  
</div>
<div class="mb-3">
  <label for="formFile" class="form-label">Upload Video</label>
  <input class="form-control" type="file" name="file" onChange={changeHandlerViedo} />
  
</div>
<div class="mb-3">
  <label for="formFile" class="form-label">Upload audio</label>
  <input class="form-control" type="file" name="file" onChange={changeHandlerAudio} />
  
</div>
<button  className="btn btn-secondary ml-3" onClick={submitdata}>
        submit
      </button>
   
        
      </div>
      {/* {isSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
        
          <p>
          lastModifiedDate:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          <p className="text-center">
            <img className="" src={filename} ref={ref} />
         
          </p>

          <Pdf targetRef={ref} filename="certiefcate.pdf">
            {({ toPdf }) => <button onClick={toPdf}>Download as PDF</button>}
          </Pdf>
          <div className="text-center">
          <button  className="btn btn-secondary" onClick={() => exportComponentAsPDF(ref)}>
            Export As PDF
          </button>
          <button  className="btn btn-secondary mx-2" onClick={() => exportComponentAsPNG(ref)}>
            Export As PNG
          </button>
          <button className="btn btn-secondary" onClick={() => exportComponentAsJPEG(ref)}>
            Export As JPEG
          </button>
          </div>
       
        </div>
      ) : (
        <p>Select a file to show details</p>
      )} */}
      
    </div>
  );
}
export default Upload_image;
