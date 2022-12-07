import React from 'react';
import { AdminLayout } from '@app/layouts';
import { ReactElement } from 'react';
import ChartInfo from '../../modules/business/dashboard/components/chart-container';
import Loyalty from '../../modules/business/dashboard/components/loyalty';
import SelectBox, { SelectBox_Component } from '../../modules/business/dashboard/components/select-box';
import styles from './style.module.scss';
import Table from '../../modules/business/dashboard/components/table';
import Image from '../../modules/business/dashboard/components/image';
import { useDashboard } from '../../modules/business/dashboard/hooks/use-dashboard';

const PageDashboard = () => {
    const { getAndConvertBalance2TokenTableData, balances, userTokenList } = useDashboard();

    React.useEffect(() => {
        getAndConvertBalance2TokenTableData();
    }, []);

    return (
        <div id={styles.dashboard_wrapper} className={['page-container'].join(' ')}>
            <InformationWrapper />
            <ChartWrapper balances={balances}/>
            <PortfolioTableWrapper userTokenList={userTokenList}/>
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

const InformationWrapper = () => {
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
                    value: 0,
                    data: [], //Array.from({ length: 30 }, () => Math.floor(Math.random() * 20)),
                    change_percentage_24h: 0,
                    isLoading: false,
                },
                'Total balance (NFT)',
                '',
                '',
                <></>,
            )}
            <div className={styles.div_2}>
                {InfoDOM(0, 'Total income', 'fml fm-arrow-square-down')}
                {InfoDOM(0, "Yesterday's PNL", 'fml fm-trend-up')}
            </div>
        </div>
    );
};

const ChartWrapper = (props: any) => {
    const { balances } = props;
    const TOKEN_CONFIG: Array<SelectBox_Component.Value> = [
        {
            label: 'USDT',
            value: process.env.NEXT_PUBLIC_MINT_USDT_ADDRESS || '',
            icon: '/svg/icon-token-usdt.svg',
        },
        {
            label: 'USDC',
            value: process.env.NEXT_PUBLIC_MINT_USDC_ADDRESS || '',
            icon: '/svg/icon-token-usdc.svg',
        },
    ];
    const NFT_CONFIG: Array<SelectBox_Component.Value> = [
        {
            label: 'NFT',
            value: process.env.NEXT_PUBLIC_MINT_NFT_ADDRESS || '',
            icon: '/svg/icon-metain-nft.svg',
        },
    ];

    const [selectToken, setSelectToken] = React.useState(TOKEN_CONFIG[0]);
    const [selectNFT, setSelectNFT] = React.useState(NFT_CONFIG[0]);

    return (
        <div id={styles.chart_wrapper}>
            {ChartDOM(
                {
                    value: balances?.[selectToken.label] || 0,
                    data: Array.from({ length: 20 }, () => Math.random()),
                    change_percentage_24h: 0,
                    isLoading: false,
                },
                'Token portfolio',
                balances?.[selectToken.label]?.toString() || 0,
                selectToken.label,
                <SelectBox
                    className={styles.selectbox_1}
                    value={[selectToken]}
                    options={TOKEN_CONFIG}
                    height="3.2rem"
                    dropdownWidth="22.5rem"
                    C_onChange={(item: any) => setSelectToken(item[0])}
                />,
            )}
            {ChartDOM(
                {
                    value: 0,
                    data: [], //Array.from({length: 30}, () => Math.floor(Math.random() * 20)),
                    change_percentage_24h: 0,
                    isLoading: false,
                },
                'NFT portfolio',
                '0',
                'NFT',
                <SelectBox
                    className={styles.selectbox_1}
                    value={[selectNFT]}
                    options={NFT_CONFIG}
                    height="3.2rem"
                    dropdownWidth="17.5rem"
                    C_onChange={(item: any) => setSelectNFT(item[0])}
                />,
            )}
        </div>
    );
};

const PortfolioTableWrapper = (props: any) => {
    const { userTokenList } = props;

    return (
        <div id={styles.token_wrapper} className="mBlock">
            <div className={styles.div_1}>
                <span className={[styles.span_1, 'header'].join(' ')}>Portfolio summary</span>
            </div>
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
        </div>
    );
};

PageDashboard.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default PageDashboard;
