import { useEffect } from "react"
import {FC, useState, createContext, useContext} from 'react'
import {
  QueryState,
  QueryRequestContextProps,
  initialQueryRequest,
  WithChildren,
} from '../../../../../../_metronic/helpers'
import { useChainNetworkSwitch } from "../../../../../../_metronic/partials"

const QueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

const QueryRequestProvider: FC<WithChildren> = ({children}) => {
  const {network} = useChainNetworkSwitch();
  const [state, setState] = useState<QueryState>({ ...initialQueryRequest.state, network })

  const updateState = (updates: Partial<QueryState>) => {
    const updatedState = {...state, ...updates, network} as QueryState
    setState(updatedState)
  }

  useEffect(() => updateState({}), [network])

  return (
    <QueryRequestContext.Provider value={{state, updateState}}>
      {children}
    </QueryRequestContext.Provider>
  )
}

const useQueryRequest = () => useContext(QueryRequestContext)
export {QueryRequestProvider, useQueryRequest}
