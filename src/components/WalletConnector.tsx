import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const WalletConnector: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const navigate = useNavigate();
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Установите MetaMask!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      navigate("/dashboard");
    } catch (err) {
      console.error("Ошибка подключения:", err);
    }
  };

  const signMessage = async () => {
    if (!window.ethereum || !account) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const message = "Авторизация через MetaMask";

    try {
      const signature = await signer.signMessage(message);
      setSignature(signature);
    } catch (err) {
      console.error("Ошибка подписи:", err);
    }
  };

  return (
    <div>
      {!account ? (
        <button onClick={connectWallet}>Подключить MetaMask</button>
      ) : (
        <div>
          <p>Адрес: {account}</p>
          <button onClick={signMessage}>Подписать сообщение</button>
          {signature && (
            <p>
              Подпись: <code>{signature}</code>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletConnector;
