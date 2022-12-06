import { PropsWithChildren } from 'react';
import { FormBuyNftContext } from './form-buy-nft-context';
import { useFormBuyNft } from './use-form-buy-nft';

type FormBuyNftProviderProps = PropsWithChildren<{ id?: string }>;

const FormBuyNftProvider = (props: FormBuyNftProviderProps) => {
    const { children, id } = props;

    const value = useFormBuyNft();

    return <FormBuyNftContext.Provider value={value}>{children}</FormBuyNftContext.Provider>;
};

export { FormBuyNftProvider };
