import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

const MainBanner = () => {
    return (
        <div id={styles['main-project-info-banner']} className="mBlock">
            <div className={styles.div_1}>
                <span className={styles.span_1}>Faucet Token</span>
                <span className={styles.span_2}>XXXXXXXXXXXXXXXXXXXX</span>

                <ul className={styles.listTutorialSteps}>
                    <li className={styles.tutorialStep}>
                        <h4 className={styles.tutorialStepHeader}>
                            <span className={styles.tutorialStepBullet}>1</span>
                            XXXXXXXXXXXXXXXXXXXX
                        </h4>
                        <p
                            className={styles.tutorialStepContent}
                            dangerouslySetInnerHTML={{ __html: '<span>TEST HML</span>' }}
                        ></p>
                    </li>
                    <li className={styles.tutorialStep}>
                        <h4 className={styles.tutorialStepHeader}>
                            <span className={styles.tutorialStepBullet}>2</span>
                            XXXXXXXXXXXXXXXXXXXX
                        </h4>
                        <p className={styles.tutorialStepContent}>XXXXXXXXXXXXXXXXXXXX</p>
                    </li>
                    <li className={styles.tutorialStep}>
                        <h4 className={styles.tutorialStepHeader}>
                            <span className={styles.tutorialStepBullet}>3</span>
                            XXXXXXXXXXXXXXXXXXXX
                        </h4>
                        <p className={styles.tutorialStepContent}>XXXXXXXXXXXXXXXXXXXX</p>
                    </li>
                </ul>

                {/* <Link href={'/admin/vot/building/1'}>
                    <span className={[styles.button_1, 'mButton mButton-cp6-bn1'].join(' ')}>
                        XXXXXXXXXXXXXXXXXXXX AAA
                    </span>
                </Link> */}
            </div>

            {/* <div className={styles.div_4}>
                <div className={styles.item_1}>
                    <span className={styles.span_8}>XXXXXXXXXXXXXXXXXXXX</span>
                    <span className={styles.span_9}>
                        YYYYYYYYY NFT
                    </span>
                </div>
                <div className={styles.item_1}>
                    <span className={styles.span_8}>XXXXXXXXXXXXXXXXXXXX</span>
                    <span className={styles.span_9}>
                        YYYYYYYY $
                    </span>
                </div>
                <div className={styles.item_1}>
                    <span className={styles.span_8}>XXXXXXXXXXXXXXXXXXXX</span>
                    <span className={styles.span_9}>
                        YYYYYYYY NFT
                    </span>
                </div>
            </div> */}
        </div>
    );
};

MainBanner.displayName = 'MainBanner';

export { MainBanner };
