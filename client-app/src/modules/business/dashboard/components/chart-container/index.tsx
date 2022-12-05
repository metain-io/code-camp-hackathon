import React from "react";

import styles from "./style.module.scss";
import Image from "../image";
import Chart from "../chart";

const ChartInfo = (props: ChartInfo_Component.Props) => {
    /* Props **************************************************************************************************************************************************/
    const {
        className = "",
        chartName = "",
        chartValue = "",
        tokenQuanlity = "",
        tokenName = "",
        tagValue = "",
        tagStatus = "",
        chartData = [],
        appendItem = () => <></>,
        enable = true,
        isLoading = true
    } = props;

    /* Stores *************************************************************************************************************************************************/

    /* Hooks **************************************************************************************************************************************************/

    /* Variables **********************************************************************************************************************************************/
    const hiddenText = "- -";

    /* Life Circle ********************************************************************************************************************************************/
    React.useEffect(() => {
        
    }, [])

    /* Functions **********************************************************************************************************************************************/

    /* Events *************************************************************************************************************************************************/

    /* Components *********************************************************************************************************************************************/
    const HeaderWrapper = () => {
        return (
            <div className={[styles.header_wrapper, "chart-header"].join(" ")}>
                <span className={styles.span_1}>{chartName}</span>
                <span className={[styles.span_2, "mTag"].join(" ")} data-status={enable ? tagStatus : ""}>
                    {enable ? tagValue : hiddenText}
                </span>
                <div className={styles.div_1}>{appendItem}</div>
            </div>
        );
    };

    const BodyWrapper = () => {
        return (
          <div className={[styles.body_wrapper, "chart-body"].join(" ")}>
            {isLoading ? (
                    <>
                        <Image src="/svg/loading-chart.svg" className={styles.image_1} />
                    </>
                ) : 
                enable && chartData.length !== 0 ? (
                    <Chart status={tagStatus} array={chartData} />
                ) : (
                    <Image src="/svg/image-chart-nodata.svg" className={styles.image_1} />
                )
            }
          </div>
        );
    };

    const FooterWrapper = () => {
        return (
            <div className={[styles.footer_wrapper, "chart-footer"].join(" ")}>
                <span className={styles.span_1}>{enable ? chartValue : hiddenText}</span>
                <span className={styles.span_2}>{tokenQuanlity !== "" && `(${enable ? tokenQuanlity : hiddenText} ${tokenName})`}</span>
            </div>
        );
    };

    /* Render *************************************************************************************************************************************************/
    return (
        <div className={[styles.chartinfo_container, className, "mBlock"].join(" ")}>
            {HeaderWrapper()}
            {BodyWrapper()}
            {FooterWrapper()}
        </div>
    );
};

export default ChartInfo;
