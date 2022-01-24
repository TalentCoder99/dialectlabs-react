import React, { useEffect, useState } from 'react';
import * as anchor from '@project-serum/anchor';
import { BellIcon } from '@heroicons/react/outline';
import NotificationCenter from '../NotificationCenter';
import { ApiProvider, connected, useApi, WalletType } from '../../api/ApiContext';

type PropTypes = {
  wallet: WalletType;
  network?: string;
  rpcUrl?: string;
  publicKey: anchor.web3.PublicKey;
};

function WrappedBell(props: PropTypes): JSX.Element {
  const [open, setOpen] = useState(false);
  const { setWallet, setNetwork, setRpcUrl } = useApi();

  useEffect(() => setWallet(connected(props.wallet) ? props.wallet : null), [connected(props.wallet)]);
  useEffect(() => setNetwork(props.network || null), [props.network]);
  useEffect(() => setRpcUrl(props.rpcUrl || null), [props.rpcUrl]);

  return (
    <div className="flex flex-col items-end">
      <button
        className="flex items-center justify-center rounded-full w-12 h-12 focus:outline-none bg-gray-200"
        onClick={() => setOpen(!open)}
      >
        <BellIcon className="w-6 h-6 rounded-full" />
      </button>
      {open && (
        <div className="z-50 absolute top-16 w-96 h-96">
          <NotificationCenter {...props} />
        </div>
      )}
    </div>
  );
}

export function Bell(props: PropTypes): JSX.Element {
  return (
    <ApiProvider>
        <WrappedBell {...props} />
    </ApiProvider>
  );
}
