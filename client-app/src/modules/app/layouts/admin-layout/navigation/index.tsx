import React from 'react';
import { useRouter } from 'next/router';

import styles from './style.module.scss';
import ReactTooltip from 'react-tooltip';
import Anchor from './components/anchor';
import Image from './components/image';

const Navigation = () => {
    /* Props **************************************************************************************************************************************************/

    /* Stores *************************************************************************************************************************************************/

    /* Hooks **************************************************************************************************************************************************/
    const router = useRouter();

    const navigationRef = React.useRef<HTMLDivElement>(null);
    const [collapseList, setCollapseList] = React.useState<string[]>([]);
    const [hasClaimableREIT, setHasClaimableREIT] = React.useState(false);

    /* Variables **********************************************************************************************************************************************/
    const menuList = React.useMemo(() => {
        let result: Array<any> = [
            {
                title: 'Client Menu',
                children: [
                    {
                        name: 'Dashboard',
                        icon: 'fms fm-building',
                        url: 'dashboard',
                        className: hasClaimableREIT ? styles.notify_error : '',
                    },
                    {
                        name: 'Buy NFT',
                        icon: 'fms fm-arrow-square-right',
                        url: 'buy-nft',
                        className: '',
                    },
                    {
                        name: 'Token Faucet',
                        icon: 'fms fm-gas-pump',
                        url: 'faucet-token',
                    },
                    {
                        name: 'Claim Dividends',
                        icon: 'fms fm-usd-circle',
                        url: 'claim-dividends',
                        className: '',
                    },
                ],
            },
            {
                title: 'Server Menu',
                children: [
                    {
                        name: 'Share Dividend',
                        icon: 'fms fm-usd-circle',
                        url: 'share-dividend',
                        className: hasClaimableREIT ? styles.notify_error : '',
                    },
                ],
            },
        ];

        return result;
    }, [hasClaimableREIT]);

    /* Life Circle ********************************************************************************************************************************************/
    React.useEffect(() => {
        document.addEventListener('click', E_toggleNavigation);
        return () => {
            document.removeEventListener('click', E_toggleNavigation);
        };
    }, []);

    /* Functions **********************************************************************************************************************************************/
    function E_toggleNavigation(event: any) {
        if (event.target.closest(`#${styles.navigation_wrapper}`) !== null) {
            return;
        }

        if (event.target.id === styles.button_wrapper) {
            navigationRef.current!.classList.add(styles.active);
        } else {
            navigationRef.current!.classList.remove(styles.active);
        }
    }

    function F_toggleCollapse(item: string) {
        let mirrorList = collapseList;

        if (mirrorList.includes(item)) {
            mirrorList = mirrorList.filter((value) => value !== item);
        } else {
            mirrorList = [...mirrorList, item];
        }

        setCollapseList(mirrorList);
    }

    /* Events *************************************************************************************************************************************************/

    /* Components *********************************************************************************************************************************************/
    const ActionDOM = ([key, value]: [string, Navigation_Component.Action]) => {
        const routerArray = router.pathname.split('/');
        const urlArray = value.url.split('/');

        return (
            <li
                key={`Navigation-Item-2-${key}`}
                className={[styles.item_2, value?.className, routerArray[1] === urlArray[0] ? styles.active : ''].join(
                    ' ',
                )}
                data-tip={!!value.tooltips}
                data-for={!!value.tooltips && `tooltip-${key}`}
            >
                <b className={styles.b_1}></b>
                <b className={styles.b_2}></b>
                <Anchor className={styles.anchor_1} href={`/${value.url}`} disabled={value.disabled}>
                    <i className={[value.icon, styles.icon_1].join(' ')}></i> {value.name}
                    {!!value.tooltips && (
                        <>
                            <ReactTooltip id={`tooltip-${key}`} type="warning" effect="solid" place="right">
                                <div className={styles.commission_tooltip_area} style={{ maxWidth: '163px' }}>
                                    <span dangerouslySetInnerHTML={{ __html: value.tooltips.content }}></span>
                                </div>
                            </ReactTooltip>
                        </>
                    )}
                </Anchor>
            </li>
        );
    };

    const GroupDOM = ([key, value]: [string, Navigation_Component.Group]) => {
        const toggleClass = collapseList.includes(value.title) ? styles.collapse : '';

        return (
            <li key={`Navigation-Item-1-${key}`} className={styles.item_1}>
                <span className={[styles.span_1, toggleClass].join(' ')} onClick={() => F_toggleCollapse(value.title)}>
                    {value.title}
                </span>
                <ul className={[styles.list_2, toggleClass].join(' ')}>
                    {Object.entries(value.children).map(ActionDOM)}
                </ul>
            </li>
        );
    };

    /* Render *************************************************************************************************************************************************/
    return (
        <React.Fragment>
            <i id={styles.button_wrapper} className={[styles.icon_1, 'fml fm-bars'].join(' ')}></i>
            <div ref={navigationRef} id={styles.navigation_wrapper}>
                <div id={styles.logo_block}>
                    <Anchor href="/admin/dashboard">
                        <Image src="/image/zero/image-logo.png" />
                    </Anchor>
                </div>
                <div id={styles.scroll_block}>
                    <nav className={[styles.nav_1, 'navbar'].join(' ')}>
                        <div id="menu-collapse" className={[styles.collapse_1, 'navbar-collapse'].join(' ')}>
                            <ul className={styles.list_1}>{Object.entries(menuList).map(GroupDOM)}</ul>
                        </div>
                    </nav>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Navigation;
