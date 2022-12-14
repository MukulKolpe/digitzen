import { React, useState } from "react";
import "./ViewFile.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useSmartAccountContext } from "../../contexts/SmartAccountContext";
import { useWeb3AuthContext } from "../../contexts/SocialLoginContext";
import Card from "../../components/Card/Card"

const ViewFile = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [nfts, setNfts] = useState([]);
  const {
    loading: eoaLoading,
    userInfo,
    connect,
    disconnect,
    getUserInfo,
  } = useWeb3AuthContext();
  const {
    selectedAccount,
    loading: scwLoading,
    setSelectedAccount,
  } = useSmartAccountContext();
  const info = () =>
    toast.info("Copied to Clipboard", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 500,
      theme: "dark",
    });

  const getDocuments = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "5ebb74ed-e7f3-4fe0-bb64-5e161d21f78a",
      },
    };

    fetch(
      `https://api.nftport.xyz/v0/accounts/${walletAddress}?chain=goerli&page_size=50&include=metadata`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setNfts(response.nfts);
        console.log(nfts);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="header-area">
        <label name="saAdress" id="saAdress" className="normal-label">
          Copy your Wallet Address
        </label>
        <div className="text-clipboard">
          {(selectedAccount) ? (
            <text name="saAdress" id="saAdress" className="saAdress">
              {selectedAccount.smartAccountAddress}
          </text>
          ) : (
            <text name="saAdress" id="saAdress" className="saAdress">
              Please login to view your documents
          </text>
          )}
          {(selectedAccount) ? (
            <CopyToClipboard
              text={selectedAccount.smartAccountAddress}
              onCopy={() => info()}
            >
            <ContentCopyIcon />
          </CopyToClipboard>
          ) : (
            <CopyToClipboard
              text="Please login to view your documents"
              onCopy={() => info()}
            >
            <ContentCopyIcon />
          </CopyToClipboard>
          )}
          
        </div>
      </div>
      <form className="form">
        <input
          type="text"
          className="input"
          onChange={(e) => {
            setWalletAddress(selectedAccount.smartAccountAddress);
          }}
          placeholder="Enter wallet address"
        />
        <br />
        <button className="button" type="button" onClick={getDocuments}>
          View
        </button>
        {(nfts) != null ? (nfts.map((nft) => (
          <div className="w-100 grid grid-cols-2 md:grid-cols-1 py-4 mt-4 ml-0">
          <Card 
            title = {nft.metadata.name}
            description = {nft.metadata.description}
            imageUrl={nft.file_url}
            contract_address={nft.metadata.contract_address}
          />
        </div>
        ))) : (
          <div>Please login to view your documents</div>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default ViewFile;