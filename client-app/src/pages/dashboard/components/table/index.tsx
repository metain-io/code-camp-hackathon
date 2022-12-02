import React from 'react';
import { useResponsive } from '@shared/hooks';
import Image from '../image';
import styles from './style.module.scss';
import stringUtils from '@libs/utils/string-utils';
import Chart from '../chart';
import { Table_Component } from './type';
 
const Table = (props: Table_Component.Props) => {
    /* Props **************************************************************************************************************************************************/
    const {
        theme = 'normal',
        className = '',
        mobileLayout = true,
        columnArray = [],
        tableArray = [],
        emptyDataMessage = '',
        C_onClick = () => {},
        C_onButtonClick = () => {},
    } = props;

    /* Stores *************************************************************************************************************************************************/

    /* Hooks **************************************************************************************************************************************************/
    const deviceType = useResponsive();

    const [S_tableArray, S_changeTableArray] = React.useState<
        | Table_Component.Row[]
        | Table_Component.NFT_Row[]
    >(tableArray);
    const [S_loading, S_setLoading] = React.useState(tableArray && tableArray.length > 0 ? false : true);

    /* Variables **********************************************************************************************************************************************/

    /* Life Circle ********************************************************************************************************************************************/
    React.useEffect(() => {
        if (tableArray.length !== 0) {
            S_changeTableArray(tableArray);
        }
    }, [props.tableArray]);

    React.useEffect(() => {
        S_setLoading(false);
    }, [S_tableArray])

    /* Functions **********************************************************************************************************************************************/

    /* Events *************************************************************************************************************************************************/

    /* Components *********************************************************************************************************************************************/
    const ColumnDOM = ({ label, value, customRender }: any, rowValue: any) => {
        if (customRender !== undefined) {
            return customRender(rowValue);
        }

        const status = rowValue.price_change_percentage_24h > 0 ? 'increase' : 'decrease';

        switch (value) {
            case 'drag':
                return <i className={[styles.icon_1, 'fml fm-bars'].join(' ')}></i>;
            case 'name':
                return (
                    <div className={styles.div_1}>
                        <Image
                            src={`/svg/icon-token-${rowValue.symbol?.toLowerCase()}.svg`}
                            className={styles.image_1}
                        />
                        <span className={styles.span_1}>{rowValue.name}</span>
                        <span className={styles.span_2}>{rowValue.symbol}</span>
                    </div>
                );
            case 'vot_name':
                return (
                    <div className={styles.div_1}>
                        <Image src={`/image/vot/dct-building.png`} className={styles.image_1} />
                        <span className={styles.span_1}>{rowValue.vot_name}</span>
                    </div>
                );
            case 'price_change_percentage_24h':
                return (
                    <span className={[styles.span_3, 'mTag'].join(' ')} data-status={status}>
                        {Math.abs(rowValue.price_change_percentage_24h)}%
                    </span>
                );
            case 'status':
                return (
                    <span className={[styles.span_3, 'mTag'].join(' ')} data-status={rowValue.status.toLowerCase()}>
                        {rowValue.status}
                    </span>
                );
            case 'receive':
                const array = rowValue.receive.split('/');

                return (
                    <div className={styles.div_2}>
                        <span className={styles.span_4}>{array[0]}</span>
                        <span className={styles.separator}> / </span>
                        <span className={styles.span_4}>{array[1]}</span>
                    </div>
                );
            case 'asset':
            case 'origin':
                const iconName = rowValue[value].toLowerCase();

                return <span data-icon={iconName}>{rowValue[value]}</span>;
            case 'current_price':
                return <span>{rowValue.current_price.toString()} US$</span>;
            case 'market_cap':
                return <span>{rowValue.market_cap}</span>;
            case 'total_volume':
                return <span>{rowValue.total_volume}</span>;
            case 'available':
                return <span>{rowValue.available}</span>;
            case 'value':
                return <span>{rowValue.value}</span>;
            case 'holding':
                return <span>{rowValue.holding}</span>;
            case 'from':
            case 'to':
            case 'address':
                return <span>{stringUtils.format2ShortId(rowValue[value], deviceType === 'mobile' ? 5 : 30, 5)}</span>;
            case 'chart_data':
                return (
                    <Chart
                        className={styles.chart_1}
                        status={status}
                        array={rowValue.chart_data}
                        width="9rem"
                        height="4.5rem"
                    />
                );
            case 'order_id':
                return <span>#{rowValue[value]}</span>;
            case 'bonus':
                return <span>+ {rowValue[value]} US$</span>;
            case 'amount':
                return <span>{rowValue[value].toString()} NFT</span>;
            case 'trash':
                return <i className="fml fm-trash-times" onClick={() => C_onButtonClick(rowValue)}></i>;
        }

        return <span>{rowValue[value]}</span>;
    };

    const LoadingRow = (colSpan: number = 1) => {
        return (
            <tr key={`Table-Browser-Row-Loading`}>
                <td key={`Table-Mobile-Column-Loading`} className="table-loading-row" colSpan={colSpan}>
                    {/*<Image className={[styles.image_1, styles.loading_row].join(" ")} src="/gif/animation-loading.gif" width={24} height={24} />*/}
                    <div className="mLoading"></div>
                </td>
            </tr>
        );
    };

    const EmptyRow = (colSpan: number = 1) => {
        return (
            <tr key={`Table-Browser-Row-Empty`}>
                <td
                    key={`Table-Mobile-Column-Empty`}
                    className={'empty_row'}
                    colSpan={colSpan}
                    style={{ textAlign: 'center', fontStyle: 'italic', color: '#64748B88' }}
                >
                    <span>{emptyDataMessage === '' ? 'Empty record' : emptyDataMessage}</span>
                </td>
            </tr>
        );
    };

    const BrowserWrapper = () => {
        return (
            <table className={styles.browser_wrapper}>
                <thead>
                    <tr>
                        {Object.entries(columnArray).map(([columnKey, columnValue]: any) => {
                            return (
                                <th key={`Table-Browser-Head-${columnKey}`} className={styles[columnValue.value]}>
                                    {columnValue.label}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {S_loading ? (
                        <>{LoadingRow(columnArray.length)}</>
                    ) : S_tableArray.length > 0 ? (
                        Object.entries(S_tableArray).map(([rowKey, rowValue]: any) => {
                            return (
                                <tr
                                    key={`Table-Browser-Row-${rowKey}`}
                                    className={rowValue.disabled ? styles.disabled : ''}
                                    onClick={() => C_onClick(rowValue)}
                                >
                                    {Object.entries(columnArray).map(([columnKey, columnValue]: any) => (
                                        <td
                                            key={`Table-Mobile-Column-${rowKey}-${columnKey}`}
                                            className={styles[columnValue.value]}
                                            data-column={columnValue.value}
                                        >
                                            {ColumnDOM(columnValue, rowValue)}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    ) : (
                        <>{EmptyRow(columnArray.length)}</>
                    )}
                </tbody>
            </table>
        );
    };

    const MobileWrapper = () => {
        return (
            <div className={styles.mobile_wrapper}>
                {Object.entries(S_tableArray).map(([rowKey, rowValue]: any) => {
                    return (
                        <div
                            key={`Table-Mobile-Row-${rowKey}`}
                            className={styles.row}
                            onClick={() => C_onClick(rowValue)}
                        >
                            {Object.entries(columnArray).map(([columnKey, columnValue]: any) => {
                                return (
                                    <div
                                        key={`Table-Mobile-Column-${rowKey}-${columnKey}`}
                                        className={[styles.column, styles[columnValue.value]].join(' ')}
                                    >
                                        <span className={styles.title}>{columnValue.label}</span>
                                        {ColumnDOM(columnValue, rowValue)}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    };

    /* Render *************************************************************************************************************************************************/
    return (
        <div
            className={[
                styles.pwTable,
                styles[theme],
                mobileLayout ? styles[deviceType] : styles.browser,
                className,
            ].join(' ')}
        >
            {
                {
                    browser: BrowserWrapper(),
                    'tablet-large': BrowserWrapper(),
                    tablet: BrowserWrapper(),
                    mobile: mobileLayout ? MobileWrapper() : BrowserWrapper(),
                }[deviceType]
            }
        </div>
    );
};

export default Table;
