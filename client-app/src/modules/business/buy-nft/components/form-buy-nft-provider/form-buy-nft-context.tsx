import React from 'react';

export enum FormBuyNftStatus {
    Idle,
    Loading,
    LoadFailed,
    LoadFinished,
    Processing,
    ProcessFailed,
    ProcessSucceeded,
}

type FormBuyNftContextState = {
    status: FormBuyNftStatus;
    error: any;

    id: string;
    name: string;

    amountNft: string;
    amountToken: string;
    selectableTokens: Array<any>;
    selectedTokenIndex: number;
    selectedToken: { symbol: string; iconUrl: string } | null;

    handleAmountNftChanged: (value: string) => void;
    handleAmountTokenChanged: (value: string) => void;
    handleSelectedTokenIndexChanged: (index: number) => void;
    handlePurchaseNft: () => void;
};

const FormBuyNftContext = React.createContext({} as FormBuyNftContextState);

export { FormBuyNftContext };
export const useFormBuyNftContext = () => React.useContext(FormBuyNftContext);
