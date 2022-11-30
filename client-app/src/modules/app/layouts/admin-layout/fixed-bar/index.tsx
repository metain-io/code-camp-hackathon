import { useHelper } from '@shared/hooks';
import fnUtils from '@shared/utils/fnUtils';
import stringUtils from '@shared/utils/stringUtils';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import Image from './components/image';
import styles from './style.module.scss';

const FixedBar = () => {
    return (
        <div id={styles.fixedbar_container}>
            <WalletWrapper />
            <div className={styles.separator}></div>
            <AccountWrapper />
        </div>
    );
};

const WalletWrapper = () => {
    const { copyToClipboard } = useHelper();
    const [copied, setCopied] = React.useState(false);
    const copyTimerRef = React.useRef(null);

    let usernameContent = 'WALLET_ADDRESS';
    let usernameContentFormated = usernameContent;
    try {
        usernameContentFormated = stringUtils.format2ShortId(usernameContent, 5, 3);
    } catch (ex) {
        console.log('====== WalletWrapper - error: ', ex);
    }

    return (
        <div
            id={styles.wallet_wrapper}
            data-tip={true}
            data-for="tooltip-username"
            onClick={() => {
                copyToClipboard(usernameContent);
                setCopied(true);
                fnUtils.debounce(
                    copyTimerRef,
                    () => {
                        setCopied(false);
                    },
                    1000,
                );
            }}
        >
            <Image className={styles.image_1} src={'/svg/icon-token-sol.svg'} alt="" />
            <span className={styles.span_1}>{usernameContentFormated}</span>
            <ReactTooltip id="tooltip-username" uuid="tooltip-username" type="info" effect="solid">
                <div className={styles.commission_tooltip_area}>
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                </div>
            </ReactTooltip>
        </div>
    );
};

const AccountWrapper = () => {
    const logoutHandler = () => {
        // dispatchLogoutUserRequested({});
    };

    return (
        <div id={styles.account_wrapper}>
            <div className={styles.div_1} data-bs-toggle="dropdown" data-bs-auto-close="outside">
                <Image className={styles.image_1} src="/image/zero/image-default-avatar-2.png" alt="" />
                <i className={[styles.icon_1, 'fms fm-ellipsis-v-alt'].join(' ')}></i>
            </div>
            <div className={[styles.dropdown_1, 'dropdown-menu'].join(' ')}>
                <div className={styles.div_2}>
                    <Image className={styles.image_2} src="/image/zero/image-default-avatar-2.png" alt="" />
                    {/* <span className={styles.span_1}>John Doe</span>
                    <span className={styles.span_2}>johndoe@email.com</span>
                    <span className={[styles.span_3, "mTag mTag-cg6-bg2"].join(" ")} data-status="verified">
                        Verified
                    </span> */}
                </div>

                <div className={styles.div_4}>
                    {/* <Anchor href="/Admin/Account/Information" className={styles.anchor_1}> */}
                    {/* <Anchor href="/Admin/Account/Information" className={styles.anchor_1} onClickHandler={onClickAccountInformationHandler}>
                        <i className={[styles.icon_3, "fml fm-user-circle"].join(" ")}></i>
                        {t('AdminLayout.FixedBar.text_2')}
                    </Anchor>
                    <Anchor href="/Admin/Account/Setting" className={styles.anchor_1}>
                        <i className={[styles.icon_3, "fml fm-sliders-h"].join(" ")}></i>
                        {t('AdminLayout.FixedBar.text_3')}
                    </Anchor>
                    <Anchor href="/Admin/Reward" className={styles.anchor_1}>
                        <i className={[styles.icon_3, "fml fm-ribbon"].join(" ")}></i>
                        {t('AdminLayout.FixedBar.text_4')}
                    </Anchor>*/}
                    <span className={styles.span_4} onClick={logoutHandler}>
                        <i className={[styles.icon_3, 'fml fm-arrow-square-right'].join(' ')}></i>
                        Logout
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FixedBar;
