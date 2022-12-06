import React from 'react';
import { FormBuyNftState } from './form-buy-nft-reducer';

type FormBuyNftContextState = FormBuyNftState & {
    selectableTokens: Array<any>;
    selectedToken: { symbol: string; iconUrl: string } | null;
    selectedTokenBalance?: number;

    handleAmountNftChanged: (value: string) => void;
    handleAmountTokenChanged: (value: string) => void;
    handleSelectedTokenIndexChanged: (index: number) => void;
    handlePurchaseNft: () => void;
};

const FormBuyNftContext = React.createContext({} as FormBuyNftContextState);

export { FormBuyNftContext };
export const useFormBuyNftContext = () => React.useContext(FormBuyNftContext);
