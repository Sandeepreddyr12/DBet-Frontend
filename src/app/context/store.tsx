'use client';

import { createContext } from 'react';
import { SmartContract, useContract } from '@thirdweb-dev/react';
import { BaseContract } from 'ethers';

export const Store = createContext<SmartContract<BaseContract> | undefined>(undefined);

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    contract,
    isLoading,
    error: errors,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useContract(process.env.NEXT_PUBLIC_SPORTSPREDICTOR_ADDRESS);

  return <Store.Provider value={contract}>{children}</Store.Provider>;
}
