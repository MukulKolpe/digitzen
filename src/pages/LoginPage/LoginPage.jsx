import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSmartAccountContext } from "../../contexts/SmartAccountContext";
import { useWeb3AuthContext } from "../../contexts/SocialLoginContext";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const {
    address,
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
  console.log("address", address);
  return React.createElement(
    "div",
    { className: classes.bgCover },
    React.createElement(
      "main",
      { className: classes.container },
      React.createElement(
        "h1",
        null,
        "Please sign in to upload your documents"
      ),
      React.createElement(Button, {
        onClickFunc: !address
          ? connect
          : () => {
              setSelectedAccount(null);
              disconnect();
            },
        title: !address ? "Connect Wallet" : "Disconnect Wallet",
      }),
      eoaLoading && React.createElement("h2", null, "Loading EOA..."),
      address &&
        React.createElement(
          "div",
          null,
          React.createElement("h2", null, "EOA Address"),
          React.createElement("p", null, address)
        ),
      scwLoading && React.createElement("h2", null, "Loading Smart Account..."),
      selectedAccount &&
        address &&
        React.createElement(
          "div",
          null,
          React.createElement("h2", null, "Smart Account Address"),
          React.createElement("p", null, selectedAccount.smartAccountAddress)
        ),
      address &&
        React.createElement(Button, {
          onClickFunc: () => getUserInfo() && navigate("/upload"),
          title: "Upload Documents",
        }),
      userInfo &&
        React.createElement(
          "div",
          { style: { maxWidth: 800, wordBreak: "break-all" } },
          React.createElement("h2", null, "Organizer Info"),
          React.createElement("image", userInfo.profileImage),
          React.createElement(
            "pre",
            { style: { whiteSpace: "pre-wrap" } },
            userInfo.name
          ),
          React.createElement(
            "pre",
            { style: { whiteSpace: "pre-wrap" } },
            userInfo.email
          )
        ),
      userInfo &&
        React.createElement("div", {
          style: { maxWidth: 800, wordBreak: "break-all" },
        })
    )
  );
};
const useStyles = makeStyles(() => ({
  bgCover: {
    backgroundColor: "#1a1e23",
    backgroundSize: "cover",
    width: "100%",
    minHeight: "100vh",
    color: "#fff",
    fontStyle: "italic",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "80vh",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 50,
    fontSize: 60,
    background: "linear-gradient(90deg, #12ECB8 -2.21%, #00B4ED 92.02%)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  animateBlink: {
    animation: "$bottom_up 2s linear infinite",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  "@keyframes bottom_up": {
    "0%": {
      transform: "translateY(0px)",
    },
    "25%": {
      transform: "translateY(20px)",
    },
    "50%": {
      transform: "translateY(0px)",
    },
    "75%": {
      transform: "translateY(-20px)",
    },
    "100%": {
      transform: "translateY(0px)",
    },
  },
}));
export default LoginPage;
