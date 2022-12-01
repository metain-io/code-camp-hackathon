import React from 'react';
import { AdminLayout } from '@app/layouts';
import { ReactElement } from 'react';
import ChartInfo from './components/chart-container';
import Loyalty from './components/loyalty';
import SelectBox, { SelectBox_Component } from './components/select-box';
import styles from './style.module.scss'

const PageDashboard = () => {
    return (
        <div className="page-container">
            <InformationWrapper />
            <ChartWrapper />
        </div>
    );
};

const ChartDOM = (chartValue: any, chartName: string, tokenQuanlity: string, tokenName: string, appendItem: React.ReactNode) => {
    const status = chartValue.change_percentage_24h > 0 ? "increase" : "decrease";

    return (
        <ChartInfo
            className={styles.div_1}
            chartName={chartName}
            chartValue={`${chartValue.value === 0 ? '- -' : chartValue.value.toFixed(2)} US$`}
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
            <div className={[styles.div_3, "mBlock"].join(" ")}>
                <i className={[styles.icon_1, icon].join(" ")}></i>
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
            {ChartDOM({
                value: 12345,
                data: Array.from({length: 30}, () => Math.floor(Math.random() * 20)),
                change_percentage_24h: 1.1,
                isLoading: false
            }, 'Total balance (NFT)', "", "", <></>)}
            <div className={styles.div_2}>
                {InfoDOM(0, 'Total income', "fml fm-arrow-square-down")}
                {InfoDOM(0, "Yesterday's PNL", "fml fm-trend-up")}
            </div>
        </div>
    );
};

const ChartWrapper = () => {
    const TOKEN_CONFIG: Array<SelectBox_Component.Value> = [
        {
            label: 'USDT',
            value: 'A7yGbWrtgTjXVdxky86CSEyfH6Jy388RYFWfZsH2D8hr',
            icon: '/svg/icon-token-usdt.svg',
        },
        {
            label: 'USDC',
            value: '3GUqiPovczNg1KoZg5FovwRZ4KPFb95UGZCCTPFb9snc',
            icon: '/svg/icon-token-usdc.svg',
        },
    ];
    const NFT_CONFIG: Array<SelectBox_Component.Value> = [
        {
            label: 'NFT',
            value: 'A7yGbWrtgTjXVdxky86CSEyfH6Jy388RYFWfZsH2D8hr',
            icon: '/svg/icon-metain-nft.svg',
        }
    ];

    const [selectToken, setSelectToken] = React.useState(TOKEN_CONFIG[0]);
    const [selectNFT, setSelectNFT] = React.useState(NFT_CONFIG[0]);

    return (
        <div id={styles.chart_wrapper}>
            {ChartDOM(
                {
                    value: 12345,
                    data: Array.from({length: 30}, () => Math.floor(Math.random() * 20)),
                    change_percentage_24h: 1.1,
                    isLoading: false
                },
                'My token portfolio',
                '12345',
                selectToken.label,
                <SelectBox
                    className={styles.selectbox_1}
                    value={[selectToken]}
                    options={TOKEN_CONFIG}
                    height="3.2rem"
                    dropdownWidth="22.5rem"
                    C_onChange={(item: any) => setSelectToken(item[0])}
                />
            )}
            {ChartDOM(
                {
                    value: 123450,
                    data: [], //Array.from({length: 30}, () => Math.floor(Math.random() * 20)),
                    change_percentage_24h: 1.1,
                    isLoading: false
                },
                'My NFT portfolio',
                '12345',
                'NFT',
                <SelectBox
                    className={styles.selectbox_1}
                    value={[selectNFT]}
                    options={NFT_CONFIG}
                    height="3.2rem"
                    dropdownWidth="17.5rem"
                    C_onChange={(item: any) => setSelectNFT(item[0])}
                />
            )}
        </div>
    );
};

PageDashboard.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default PageDashboard;
