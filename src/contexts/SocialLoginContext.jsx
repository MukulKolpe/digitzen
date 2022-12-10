import React, { useCallback, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { getSocialLoginSDK } from "@biconomy/web3-auth";
import { activeChainId } from "../utils/chainConfig";
export const Web3AuthContext = React.createContext({
    connect: () => Promise.resolve(null),
    disconnect: () => Promise.resolve(),
    getUserInfo: () => Promise.resolve(),
    loading: false,
    provider: null,
    ethersProvider: null,
    web3Provider: null,
    chainId: activeChainId,
    address: "",
    userInfo: null,
});
export const useWeb3AuthContext = () => useContext(Web3AuthContext);
export var SignTypeMethod;
(function (SignTypeMethod) {
    SignTypeMethod["PERSONAL_SIGN"] = "PERSONAL_SIGN";
    SignTypeMethod["EIP712_SIGN"] = "EIP712_SIGN";
})(SignTypeMethod || (SignTypeMethod = {}));
const initialState = {
    provider: null,
    web3Provider: null,
    ethersProvider: null,
    address: "",
    chainId: activeChainId,
};
export const Web3AuthProvider = ({ children }) => {
    const [web3State, setWeb3State] = useState(initialState);
    const { provider, web3Provider, ethersProvider, address, chainId } = web3State;
    const [loading, setLoading] = useState(false);
    const [socialLoginSDK, setSocialLoginSDK] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    // if wallet already connected close widget
    useEffect(() => {
        console.log("hidelwallet");
        if (socialLoginSDK && socialLoginSDK.provider) {
            socialLoginSDK.hideWallet();
        }
    }, [address, socialLoginSDK]);
    const connect = useCallback(async () => {
        if (address)
            return;
        if (socialLoginSDK === null || socialLoginSDK === void 0 ? void 0 : socialLoginSDK.provider) {
            setLoading(true);
            console.info("socialLoginSDK.provider", socialLoginSDK.provider);
            const web3Provider = new ethers.providers.Web3Provider(socialLoginSDK.provider);
            const signer = web3Provider.getSigner();
            const gotAccount = await signer.getAddress();
            const network = await web3Provider.getNetwork();
            setWeb3State({
                provider: socialLoginSDK.provider,
                web3Provider: web3Provider,
                ethersProvider: web3Provider,
                address: gotAccount,
                chainId: Number(network.chainId),
            });
            setLoading(false);
            return;
        }
        if (socialLoginSDK) {
            socialLoginSDK.showWallet();
            return socialLoginSDK;
        }
        setLoading(true);
        const sdk = await getSocialLoginSDK(ethers.utils.hexValue(80001));
        sdk.showConnectModal();
        sdk.showWallet();
        setSocialLoginSDK(sdk);
        setLoading(false);
        return socialLoginSDK;
    }, [address, socialLoginSDK]);
    const getUserInfo = useCallback(async () => {
        if (socialLoginSDK) {
            const userInfo = await socialLoginSDK.getUserInfo();
            console.log("userInfo", userInfo);
            setUserInfo(userInfo);
        }
    }, [socialLoginSDK]);
    // after social login -> set provider info
    useEffect(() => {
        (async () => {
            if (window && window.location.hash && !address) {
                const sdk = await getSocialLoginSDK(ethers.utils.hexValue(80001));
                setSocialLoginSDK(sdk);
            }
        })();
    }, [connect, address]);
    // after metamask login -> get provider event
    useEffect(() => {
        const interval = setInterval(async () => {
            if (address) {
                clearInterval(interval);
            }
            if (socialLoginSDK && !address) {
                connect();
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [address, connect, socialLoginSDK]);
    const disconnect = useCallback(async () => {
        if (!socialLoginSDK || !socialLoginSDK.web3auth) {
            console.error("Web3Modal not initialized.");
            return;
        }
        await socialLoginSDK.logout();
        setWeb3State({
            provider: null,
            web3Provider: null,
            ethersProvider: null,
            address: "",
            chainId: activeChainId,
        });
        setUserInfo(null);
        window.getSocialLoginSDK = null;
        socialLoginSDK.hideWallet();
        setSocialLoginSDK(null);
    }, [socialLoginSDK]);
    return (React.createElement(Web3AuthContext.Provider, { value: {
            connect,
            disconnect,
            getUserInfo,
            loading,
            provider: provider,
            ethersProvider: ethersProvider || null,
            web3Provider: web3Provider || null,
            chainId: chainId || 0,
            address: address || "",
            userInfo,
        } }, children));
};