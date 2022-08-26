import React, { useState } from "react";

// import {
//   exportComponentAsJPEG,
//   exportComponentAsPDF,
//   exportComponentAsPNG,
// } from "react-component-export-image";

import { loadWeb3 } from '../apis/api'
import { certificateContractAddress, certificateContractAbi } from '../utilies/contract';
import { toast } from "react-toastify";

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
  alert("you are inside submit"+acc)
  if (acc == "No Wallet") {
    toast.error("No Wallet Connected")
    
}
else if (acc == "Wrong Network") {
toast.error("Wrong Newtwork please connect to test net")

}
 else {

try {
  console.log('what is all input data',allinputdata)
  const web3 = window.web3;
  let nftContractOf = new web3.eth.Contract(certificateContractAbi, certificateContractAddress);
  let hash = await nftContractOf.methods.storedata(cnic_value,allinputdata[0],allinputdata[1],allinputdata[2],allinputdata[3]).send({
    from: acc,
})
toast.success("Successfully uploaded data")
console.log("what is hash",hash)
  
} catch (error) {
  toast.error(error)
}
 

}

}
  const IpfsStorage = async (value) => {
    
    await authenticate({ signingMessage: "Log in using Moralis" })
      .then(async function (user) {
        console.log("logged in user:", user);
        const fileIpfs = new Moralis.File(value.name,value);
        await fileIpfs.saveIPFS(null, { useMasterKey: true });
        toast.success("successfully uploaded")
        let urlimage = fileIpfs._ipfs;
        console.log('what is moralis url',fileIpfs._ipfs)

        setAllinputdata([...allinputdata,urlimage])

        setfilename(urlimage)
        
     
      })
      .catch(function (error) {
        toast.error(error)
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
    
    IpfsStorage(event.target.files[0])

    // setFile(URL.createObjectURL(event.target.files[0]));
    setIsSelected(true);
  };





 
  return (
    <div className="container mt-5 border py-3" >
      <form className="">


      <div class="mb-3">
  <label for="formFile" class="form-label text-white">Enter Cnic</label>
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

      <div className="clearfix">
      <div class="mb-3">
  <label for="formFile" class="form-label text-white" >Upload audio</label>
  <input class="form-control" type="file" name="file" onChange={changeHandlerAudio} />
  
</div>  

<div class="mb-3">
  <label for="formFile" class="form-label text-white">Upload Video</label>
  <input class="form-control" type="file" name="file" accept="video/*" onChange={changeHandlerViedo} />
  
</div>

<div class="mb-3">
  <label for="formFile" class="form-label text-white">Upload Image</label>
  <input class="form-control" type="file" name="file" accept="image/*" onChange={changeHandlerImage} />
  
</div>

<div class="mb-3">
  <label for="formFile" class="form-label text-white" accept=".pdf">Upload pdf</label>
  <input class="form-control" type="file" name="file" onChange={changeHandlerPdf} />
  
</div>

<button  className="btn ms-auto text-white border navbg float-md-right" onClick={submitdata}>
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
