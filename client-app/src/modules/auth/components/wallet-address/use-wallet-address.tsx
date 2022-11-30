import { selectLoginUsername, selectLoginWalletAddress } from '@auth/redux/login/slice';
import React from 'react';
import { useSelector } from 'react-redux';

const useWalletAddress = () => {
    const [copyState, setCopyState] = React.useState<string | null>(null);
    const walletAddress = useSelector(selectLoginWalletAddress);

    const handleCopyToClipboard = () => {
        if (walletAddress) {
            navigator.clipboard.writeText(walletAddress).then(() => {
                setCopyState(() => {
                    setTimeout(() => {
                        setCopyState(null);
                    }, 1000);
                    return 'Copied';
                });
            });
        }
    };

    return {
        walletAddress,
        copyState,
        handleCopyToClipboard,
    };
};

export { useWalletAddress };
