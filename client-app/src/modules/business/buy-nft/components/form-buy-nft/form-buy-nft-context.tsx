import React from 'react';
import { FormBuyNftState } from './use-form-buy-nft';

type FormBuyNftContextState = FormBuyNftState & {
    id: string;
    name: string;

    selectableTokens: Array<any>;
    selectedToken: { symbol: string; iconUrl: string } | null;

    handleAmountNftChanged: (value: string) => void;
    handleAmountTokenChanged: (value: string) => void;
    handleSelectedTokenIndexChanged: (index: number) => void;
    handlePurchaseNft: () => void;
};

const FormBuyNftContext = React.createContext({} as FormBuyNftContextState);

export { FormBuyNftContext };
export const useFormBuyNftContext = () => React.useContext(FormBuyNftContext);
