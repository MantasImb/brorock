import { ethers } from "ethers";

/**
 * Connects to an Ethereum wallet using ethers.js
 * @returns user address
 */
export async function connectWallet(): Promise<string> {
  // Check if the browser has an Ethereum provider (e.g., MetaMask)
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create a new ethers provider using the injected provider
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Get the signer (the user's account)
      const signer = await provider.getSigner();

      // Optionally, you can get the user's address
      const address = await signer.getAddress();
      console.log('Connected address:', address);

      return address;
    } catch (error) {
      console.error('User rejected the request:', error);
      throw new Error('User rejected the connection request.');
    }
  } else {
    console.error('No Ethereum provider found. Install MetaMask or another wallet.');
    throw new Error('No Ethereum provider found.');
  }
}

/**
 * Checks if an Ethereum wallet is connected and returns the address if it is.
 * @returns {Promise<string | null>} A promise that resolves to the connected address or null if not connected.
 */
export async function checkWalletConnection(): Promise<string | null> {
  if (window.ethereum) {
    try {
      // Request the list of connected accounts
      const accounts = (await window.ethereum.request({
        method: 'eth_accounts',
      })) as string[];

      if (accounts && accounts.length > 0) {
        // Wallet is connected
        const address = accounts[0];
        console.log('Wallet is connected:', address);
        return address;
      } else {
        // Wallet is not connected
        console.log('No wallet connected.');
        return null;
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
      throw error;
    }
  } else {
    console.error('Ethereum provider not found. Please install MetaMask.');
    throw new Error('Ethereum provider not found. Please install MetaMask.');
  }
}

export async function getUserSignature(message: string): Promise<string> {
  if (window.ethereum) {
    try {
      // Create a new ethers provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Get the user's address (optional)
      const address = await signer.getAddress();

      // Sign the message
      const signature = await signer.signMessage(message);

      console.log('Message signed by:', address);
      console.log('Signature:', signature);

      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  } else {
    console.error('Ethereum provider not found. Please install MetaMask.');
    throw new Error('Ethereum provider not found. Please install MetaMask.');
  }
}
