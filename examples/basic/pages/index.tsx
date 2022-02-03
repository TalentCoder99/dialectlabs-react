import React, { useEffect, useState } from 'react';
import * as anchor from '@project-serum/anchor';

import { Bell } from '@dialectlabs/react-ui';
import { WalletContext, Wallet } from '../components/Wallet';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';

const JET_PUBLIC_KEY = new anchor.web3.PublicKey(
  'HGuoH5EgezVA9M6kh5ie15xrLPuJBo9SDWfMjr778CHE'
);
const MANGO_PUBLIC_KEY = new anchor.web3.PublicKey(
  'FkZPdBJMUFQusgsC3Ts1aHRbdJQrjY18MzE7Ft7J4cb4'
);

function AuthedHome() {
  // const wallet = useAnchorWallet();
  const wallet = useWallet();
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const newColorScheme = event.matches ? 'dark' : 'light';
        setTheme(newColorScheme);
      });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row justify-end p-2 items-center space-x-2">
        <Bell
          wallet={wallet}
          network={'localnet'}
          publicKey={MANGO_PUBLIC_KEY}
          theme={theme}
        />
        <Wallet />
      </div>
      <div className="h-full text-4xl flex flex-col justify-center">
        <div className="text-center">Pretty sophisticated service</div>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <WalletContext>
      <AuthedHome />
    </WalletContext>
  );
}