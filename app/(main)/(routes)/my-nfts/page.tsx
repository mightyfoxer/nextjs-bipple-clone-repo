"use client";

import React, { use, useEffect } from "react";
import { appConstants } from "@/lib/constants";
import { useWallet } from "@solana/wallet-adapter-react";

const MyNFTsPage: React.FC = () => {
  const { publicKey } = useWallet();

  const getAssetsByOwner = async () => {
    const response = await fetch(appConstants.HELIUS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getAssetsByOwner",
        params: {
          ownerAddress: publicKey?.toBase58(),
          page: 1, // Starts at 1
          limit: 1000,
        },
        displayOptions: {
          showUnverifiedCollections: false,
          showCollectionMetadata: true,
          showGrandTotal: false,
          showFungible: false,
          showNativeBalance: false,
          showInscription: false,
        },
      }),
    });
    const { result } = await response.json();
    console.log("Assets by Owner: ", result.items);
  };

  useEffect(() => {
    if (publicKey) {
      getAssetsByOwner();
    }
  }, [publicKey]);

  const [values, setValues] = React.useState([true, false, false, false]);
  function handleOver() {
    setValues([true, false, false, false]);
  }
  function handlePropertes() {
    setValues([false, true, false, false]);
  }
  function handleOffers() {
    setValues([false, false, true, false]);
  }
  function handleActivity() {
    setValues([false, false, false, true]);
  }
  return (
    <h1>My NFTs</h1>
  );
};

export default MyNFTsPage;
