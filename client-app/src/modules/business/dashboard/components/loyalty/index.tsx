import React from 'react';
import styles from './style.module.scss';
import Image from '../image';

const Loyalty = (props: Loyalty_Component.Props) => {
    const { theme = 'banner' } = props;

    const BannerWrapper = () => {
        return (
            // <Anchor href="/Admin/Loyalty">
            <div id={styles.banner_wrapper}>
                <i className={[styles.icon_1, 'fms fm-star'].join(' ')}></i>
                <span className={styles.span_1}>Metain Loyalty Level</span>
                <span className={styles.span_2}>Basic level</span>
                {/* <button className={[styles.button_1, "mButton mButton-cn1-bp6"].join(" ")}>{t('Component.Loyalty.text_3')}</button> */}
            </div>
            // </Anchor>
        );
    };

    const FrameWrapper = () => {
        return (
            // <Anchor href="/Admin/Loyalty">
            <div id={styles.frame_wrapper}>
                <div className={styles.div_1}>
                    <span className={styles.span_1}>Loyalty level</span>
                    <Image src="/image/zero/image-loyalty-basic.png" className={styles.image_1} />
                    <span className={styles.span_2}>Basic</span>
                </div>
                <button className={[styles.button_1, 'mButton mButton-cn1-bp5'].join(' ')}>
                    Upgrade
                </button>
            </div>
            // </Anchor>
        );
    };

    /* Render *************************************************************************************************************************************************/
    const ConditionalRender = () => {
        switch (theme) {
            case 'banner':
                return BannerWrapper();
            case 'frame':
                return FrameWrapper();
            default:
                return <React.Fragment></React.Fragment>;
        }
    };

    return ConditionalRender();
};

export default Loyalty;
