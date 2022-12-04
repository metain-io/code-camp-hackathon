import { PropsWithChildren } from 'react';
import { FormBuyNftContext } from './form-buy-nft-context';
import { useFormBuyNft } from './use-form-buy-nft';

type FormBuyNftProviderProps = PropsWithChildren<{}>;

const FormBuyNftProvider = (props: FormBuyNftProviderProps) => {
    const { children } = props;

    const value = useFormBuyNft();

    return <FormBuyNftContext.Provider value={value}>{children}</FormBuyNftContext.Provider>;
};

export { FormBuyNftProvider };
