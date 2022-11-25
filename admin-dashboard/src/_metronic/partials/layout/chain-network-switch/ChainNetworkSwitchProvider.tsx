import React, {createContext, useContext, useEffect, useState} from 'react'

export const SUPPORTED_CHAINS = ['avax', 'matic', 'hbar', 'okx', 'sol', 'bnb', 'eth', 'trx', 'btc'];

export type ChainNetworkType = string

type ChainNetworkContextType = {
  network: ChainNetworkType
  updateNetwork: (_mode: ChainNetworkType) => void
}

const chainNetworkSKey = 'kt_chain_network_value'

const getChainNetworkFromLocalStorage = (lsKey: string): ChainNetworkType => {
  if (!localStorage) {
    return SUPPORTED_CHAINS[0]
  }

  const data = localStorage.getItem(lsKey)
  if (!data) {
    return SUPPORTED_CHAINS[0]
  }

  if (SUPPORTED_CHAINS.includes(data)) {
    return data
  }
  
  return SUPPORTED_CHAINS[0]
}

const defaultChainNetwork: ChainNetworkContextType = {
  network: getChainNetworkFromLocalStorage(chainNetworkSKey),
  updateNetwork: (_mode: ChainNetworkType) => {}
}

const ChainNetworkContext = createContext<ChainNetworkContextType>({
  network: defaultChainNetwork.network,
  updateNetwork: (_mode: ChainNetworkType) => {}
})

const useChainNetworkSwitch = () => useContext(ChainNetworkContext)

const ChainNetworkSwitchProvider = ({children}: {children: React.ReactNode}) => {
  const [network, setNetwork] = useState<ChainNetworkType>(defaultChainNetwork.network)

  const updateNetwork = (_network: ChainNetworkType, saveInLocalStorage: boolean = true) => {
    setNetwork(_network)
    if (saveInLocalStorage && localStorage) {
      localStorage.setItem(chainNetworkSKey, _network)
    }
  }

  useEffect(() => {
    updateNetwork(network, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ChainNetworkContext.Provider value={{network, updateNetwork}}>
      {children}
    </ChainNetworkContext.Provider>
  )
}

export {ChainNetworkSwitchProvider, useChainNetworkSwitch}
