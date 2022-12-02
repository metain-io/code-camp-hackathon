import React from 'react';

type FormBuyNftContextState = {
    id: string;
    name: string;
    amountNft: number | null;
    amountToken: number | null;
    selectableTokens: Array<any>;
    selectedTokenIndex: number;
    handleAmountNftChanged: (value: string) => void;
    handleAmountTokenChanged: (value: string) => void;
    handleSelectedTokenIndexChanged: (index: number) => void;
    handlePurchaseNft: () => void;
};

const FormBuyNftContext = React.createContext({} as FormBuyNftContextState);

export { FormBuyNftContext };
export const useFormBuyNftContext = () => React.useContext(FormBuyNftContext);
