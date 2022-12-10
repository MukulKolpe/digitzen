import { React, useState, useRef } from "react";
import "./UploadFile.css";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const UploadFile = () => {
  const inputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [trxhash, setTrxhash] = useState("");
  const [tokenId, setTokenId] = useState("");

  const onSubmit = async () => {
    const form = new FormData();
    form.append("file", inputRef.current.files[0]);

    const options = {
      method: "POST",
      body: form,
      headers: {
        Authorization: "5ebb74ed-e7f3-4fe0-bb64-5e161d21f78a",
      },
    };

    await fetch(
      "https://api.nftport.xyz/v0/mints/easy/files?" +
        new URLSearchParams({
          chain: "goerli",
          name: title,
          description: description,
          mint_to_address: address,
        }),
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.error(err));

    toast.success("Document Uploaded Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      theme: "dark",
    });
  };
  return (
    <form className="upload-form">
      <label name="acc_add" className="normal-label">
        Wallet Address
      </label>
      <input
        name="acc_add"
        className="acc_add"
        onChange={(e) => setAddress(e.target.value)}
      />
      <label name="file" className="drop-container">
      <span class="drop-title">Drop files here </span>

       <br/><span class="drop-title">or</span>
       <input
        type="file"
        className="upload"
        ref={inputRef}
        name="uploadImage"
      />
      </label>
      <label name="title" className="normal-label">
        Document Name
      </label>
      <input
        name="title"
        className="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label name="desc" className="normal-label">
        Document Description
      </label>
      <textarea
        name="desc"
        className="desc"
        onChange={(e) => setDescription(e.target.value)}
      />
      
     
      <button type="button"  onClick={onSubmit} className = "button_slide slide_right">
        Submit
      </button>
      <ToastContainer />
    </form>
  );
};

export default UploadFile;
