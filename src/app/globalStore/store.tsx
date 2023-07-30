'use client';

import { createContext } from 'react';
import { SmartContract, useContract } from '@thirdweb-dev/react';
import { sportsPredictor_Address } from '@/constants/ContractAdresses';
import { BaseContract } from 'ethers';

export const Store = createContext();

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
  } = useContract(sportsPredictor_Address);

  return <Store.Provider value={contract}>{children}</Store.Provider>;
}
