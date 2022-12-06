export type Offering = {
    version: '0.1.0';
    name: 'offering';
    instructions: [
        {
            name: 'depositNft';
            accounts: [
                {
                    name: 'applicationState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'escrowNftWalletState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'treasurer';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'mintOfNft';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'mintOfUsd';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'treasurerNftWallet';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'rent';
                    isMut: false;
                    isSigner: false;
                },
            ];
            args: [
                {
                    name: 'applicationIdx';
                    type: 'u64';
                },
                {
                    name: 'stateBump';
                    type: 'u8';
                },
                {
                    name: 'amount';
                    type: 'u64';
                },
                {
                    name: 'price';
                    type: 'u64';
                },
            ];
        },
        {
            name: 'buy';
            accounts: [
                {
                    name: 'applicationState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'escrowNftWalletState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'buyerUsdWallet';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'buyerNftWallet';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'treasurerUsdWallet';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'buyer';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'mintOfNft';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'mintOfUsd';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'treasurer';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
            ];
            args: [
                {
                    name: 'applicationIdx';
                    type: 'u64';
                },
                {
                    name: 'stateBump';
                    type: 'u8';
                },
                {
                    name: 'walletBump';
                    type: 'u8';
                },
                {
                    name: 'amount';
                    type: 'u64';
                },
            ];
        },
    ];
    accounts: [
        {
            name: 'state';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'idx';
                        type: 'u64';
                    },
                    {
                        name: 'price';
                        type: 'u64';
                    },
                ];
            };
        },
    ];
};

export const IDL: Offering = {
    version: '0.1.0',
    name: 'offering',
    instructions: [
        {
            name: 'depositNft',
            accounts: [
                {
                    name: 'applicationState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'escrowNftWalletState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'treasurer',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'mintOfNft',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'mintOfUsd',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'treasurerNftWallet',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'applicationIdx',
                    type: 'u64',
                },
                {
                    name: 'stateBump',
                    type: 'u8',
                },
                {
                    name: 'amount',
                    type: 'u64',
                },
                {
                    name: 'price',
                    type: 'u64',
                },
            ],
        },
        {
            name: 'buy',
            accounts: [
                {
                    name: 'applicationState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'escrowNftWalletState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'buyerUsdWallet',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'buyerNftWallet',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'treasurerUsdWallet',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'buyer',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'mintOfNft',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'mintOfUsd',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'treasurer',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'applicationIdx',
                    type: 'u64',
                },
                {
                    name: 'stateBump',
                    type: 'u8',
                },
                {
                    name: 'walletBump',
                    type: 'u8',
                },
                {
                    name: 'amount',
                    type: 'u64',
                },
            ],
        },
    ],
    accounts: [
        {
            name: 'state',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'idx',
                        type: 'u64',
                    },
                    {
                        name: 'price',
                        type: 'u64',
                    },
                ],
            },
        },
    ],
};
