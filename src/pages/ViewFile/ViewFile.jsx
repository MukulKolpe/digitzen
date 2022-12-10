import {React ,useState}from "react";
import "./ViewFile.css";

const ViewFile = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [nfts, setNfts] = useState([])

  const getDocuments = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: '5ebb74ed-e7f3-4fe0-bb64-5e161d21f78a'
      }
    };
    
    fetch(`https://api.nftport.xyz/v0/accounts/${walletAddress}?chain=goerli&page_size=50&include=metadata`, options)
      .then(response => response.json())
      .then((response) => {
        setNfts(response.nfts)
        console.log(nfts)
      } )
      .catch(err => console.error(err));
  }
  
  return (
    <form className="form">
    <input type="text" className="input" onChange={(e) => {setWalletAddress(e.target.value)}} placeholder="Enter wallet address"/><br/>
    <button className="button" type="button" onClick={getDocuments}>
        View
      </button>
      {nfts.map((nft) => (
        <div>
         
          <h5>{nft.metadata.description}</h5>
          <img src={nft.file_url}/>
        </div>
      ))}
    </form>
  )
};

export default ViewFile;
