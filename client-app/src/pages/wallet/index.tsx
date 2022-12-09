import React from 'react';
import { AdminLayout } from '@app/layouts';
import { ReactElement } from 'react';
import ChartInfo from '@business/wallet/components/chart-container';
import Loyalty from '@business/wallet/components/loyalty';
import SelectBox, { SelectBox_Component } from '@business/wallet/components/select-box';
import styles from './style.module.scss';
import Table from '@business/wallet/components/table';
import Image from '@business/wallet/components/image';
import { useWallet } from '@business/wallet/hooks/use-wallet';
import CheckBox from '@business/wallet/components/check-box';

const PageWallet = () => {
    const { getAndConvertBalance2TokenTableData, balances, userTokenList, userNFTList, dashboardData, nftBalances } = useWallet();
    const [specificTab, setSpecificTab] = React.useState<'token' | 'nft'>('nft');

    return (
        <div id={styles.wallet_wrapper} className={['page-container'].join(' ')}>
            <InformationWrapper dashboardData={dashboardData}/>
            <PortfolioTableWrapper userTokenList={userTokenList} userNFTList={userNFTList} specificTab={specificTab} setSpecificTab={setSpecificTab}/>
        </div>
    );
};

const ChartDOM = (
    chartValue: any,
    chartName: string,
    tokenQuanlity: string,
    tokenName: string,
    appendItem: React.ReactNode,
) => {
    const status = chartValue.change_percentage_24h > 0 ? 'increase' : 'decrease';

    return (
        <ChartInfo
            className={styles.div_1}
            chartName={chartName}
            chartValue={`${chartValue.value === 0 ? '- -' : chartValue.value} US$`}
            tokenQuanlity={tokenQuanlity}
            tokenName={tokenName}
            chartData={chartValue.data}
            tagStatus={status}
            tagValue={`${Math.abs(chartValue.change_percentage_24h).toFixed(2)}%`}
            appendItem={appendItem}
            enable={true}
            isLoading={chartValue?.isLoading}
        />
    );
};

const InformationWrapper = (props: any) => {
    const { dashboardData } = props;
    const InfoDOM = (value: number, name: string, icon: string) => {
        return (
            <div className={[styles.div_3, 'mBlock'].join(' ')}>
                <i className={[styles.icon_1, icon].join(' ')}></i>
                <span className={styles.span_1}>{name}</span>
                <span className={styles.span_2}>{value.toFixed(2)} US$</span>
            </div>
        );
    };

    return (
        <div id={styles.information_wrapper}>
            <div className={styles.loyalty}>
                <Loyalty theme="frame" />
            </div>
            {ChartDOM(
                {
                    value: dashboardData.totalNFTValue,
                    data: [], //Array.from({ length: 30 }, () => Math.floor(Math.random() * 20)),
                    change_percentage_24h: 0,
                    isLoading: false,
                },
                'Total balance (NFT)',
                '',
                '',
                <></>,
            )}
            {ChartDOM(
                {
                    value: 0,
                    data: [], //Array.from({ length: 30 }, () => Math.floor(Math.random() * 20)),
                    change_percentage_24h: 0,
                    isLoading: false,
                },
                'Monthly Profit',
                '',
                '',
                <></>,
            )}
        </div>
    );
};

const PortfolioTableWrapper = (props: any) => {
    const { userTokenList, userNFTList, specificTab, setSpecificTab } = props;

    return (
        <div id={styles.token_wrapper} className="mBlock">
            {/* <div className={styles.div_1}>
                <span className={[styles.span_1, 'header'].join(' ')}>Portfolio summary</span>
            </div> */}

            <div className={styles.div_1}>
                    <span className={[styles.span_1, 'header'].join(' ')}>{'Wallet information'}</span>
                    <CheckBox
                        theme="slide"
                        className={styles.checkbox_1}
                        textArray={['NFT', 'Portfolio']}
                        value={specificTab === 'token'}
                        width="38rem"
                        // @ts-ignore
                        C_onChange={(value) => {
                            const nextValue = value ? 'token' : 'nft';
                            setSpecificTab(nextValue);

                            // if (nextValue == 'token') {
                            //     dispatchGetBalance({});
                            // }
                        }}
                    />
                </div>
                {
                    {
                        token: (
                            <Table
                                key="User-Token-Table"
                                theme="user_token"
                                columnArray={[
                                    {
                                        value: 'drag',
                                        label: '',
                                    },
                                    {
                                        value: 'name',
                                        label: 'Tokens',
                                        customRender: (row) => {
                                            return (
                                                <>
                                                    <div className={styles.table_div_1}>
                                                        <Image
                                                            src={`/svg/icon-token-${row.symbol?.toLowerCase()}.svg`}
                                                            className={styles.image_1}
                                                        />
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                            }}
                                                        >
                                                            <span className={styles.span_1}>{row.name}</span>
                                                            <span className={styles.span_2}>{row.symbol}</span>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        },
                                    },
                                    {
                                        value: 'amount',
                                        label: 'Amount',
                                        customRender: (row) => {
                                            return <>{row.amount}</>;
                                        },
                                    },
                                    {
                                        value: 'current_price',
                                        label: 'Price',
                                        customRender: (row) => {
                                            const { symbol, current_price } = row;

                                            return <>{`${current_price} US$`}</>;
                                        },
                                    },
                                    // {
                                    //     value: "total_volume",
                                    //     label: t('AdminLayout.Wallet.text_15'),
                                    // },
                                    // {
                                    //     value: "price_change_percentage_24h",
                                    //     label: t('AdminLayout.Wallet.text_16'),
                                    // },
                                    // {
                                    //     value: "chart_data",
                                    //     label: "",
                                    // },
                                ]}
                                tableArray={userTokenList}
                            />
                        ),
                        nft: (
                            <Table
                                key="User-NFT-Table"
                                theme="user_token"
                                columnArray={[
                                    {
                                        value: 'drag',
                                        label: '',
                                    },
                                    {
                                        value: 'name',
                                        label: 'NFT',
                                        customRender: (row) => {
                                            return (
                                                <>
                                                    <div className={styles.table_div_1}>
                                                        <Image
                                                            src={`/svg/icon-metain-nft.svg`}
                                                            className={styles.image_1}
                                                        />
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                            }}
                                                        >
                                                            <span className={styles.span_1}>{row.name}</span>
                                                            <span className={styles.span_2}>{row.symbol}</span>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        },
                                    },
                                    {
                                        value: 'amount',
                                        label: 'Amount',
                                        customRender: (row) => {
                                            return <>{row.amount}</>;
                                        },
                                    },
                                    {
                                        value: 'current_price',
                                        label: 'Price',
                                        customRender: (row) => {
                                            const { symbol, current_price } = row;

                                            return <>{`${current_price} US$`}</>;
                                        },
                                    },
                                    // {
                                    //     value: "total_volume",
                                    //     label: t('AdminLayout.Wallet.text_15'),
                                    // },
                                    // {
                                    //     value: "price_change_percentage_24h",
                                    //     label: t('AdminLayout.Wallet.text_16'),
                                    // },
                                    // {
                                    //     value: "chart_data",
                                    //     label: "",
                                    // },
                                ]}
                                tableArray={userNFTList}
                            />
                        ),
                    }[specificTab as string]
                }
        </div>
    );
};

PageWallet.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default PageWallet;
