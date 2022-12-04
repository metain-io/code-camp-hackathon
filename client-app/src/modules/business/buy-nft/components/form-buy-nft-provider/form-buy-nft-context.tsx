import React from 'react';
import { FormBuyNftStatus } from './use-form-buy-nft';

type FormBuyNftContextState = {
    id: string;
    name: string;

    status: FormBuyNftStatus;
    error: any;
    formData: {
        amountNft: string;
        amountToken: string;
        selectedTokenIndex: number;
    };

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
