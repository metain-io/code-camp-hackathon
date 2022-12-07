import React from 'react';
import { AdminLayout } from '@app/layouts';
import { FormBuyNft } from '@business/buy-nft/components';
import { FormBuyNftProvider } from '@business/buy-nft/components/form-buy-nft/form-buy-nft-provider';
import {
    OpportunityTrustPortfolioDetailProvider,
    OpportunityTrustPortfolioDetailStatus,
    OtpDetailDescription,
    OtpDetailDocuments,
    OtpDetailGallery,
    OtpDetailHighlightProperties,
    OtpDetailMap,
    OtpDetailPartners,
    OtpDetailRoadmap,
    OtpDetailSummary,
    useOpportunityTrustPortfolioDetailContext,
} from '@opportunity-trust-portfolio/components';
import { ReactElement } from 'react';
import styles from './styles.module.scss';
import WalletService from '@crypto-wallet/services/crypto-wallet-service';

const PageOpportunityTrustPortfolio = () => {
    return (
        <div id={styles.row} className="row">
            <OpportunityTrustPortfolioDetailProvider>
                <Breadcrumb />
                <div id={styles.column_1}>
                    <div id={styles.block_1} className="mBackground-style-1">
                        <OtpInfoHeading />
                        <div className={styles['gap']} />

                        <OtpDetailSummary />
                        <div className={styles['gap']} />

                        <OtpDetailGallery />

                        <div className={styles['divider']} />

                        <OtpDetailPartners />
                    </div>

                    <div id={styles.block_2} className={'mBlock'}>
                        <section>
                            <span className={styles['section-title']}>Documents</span>
                            <OtpDetailDocuments />
                        </section>

                        <section>
                            <span className={styles['section-title']}>About the Property</span>
                            <OtpDetailDescription />
                        </section>

                        <section>
                            <SectionHighlightProptiesHeader />
                            <OtpDetailHighlightProperties />
                        </section>

                        <section>
                            <span className={styles['section-title']}>Roadmap</span>
                            <OtpDetailRoadmap />
                        </section>

                        <section>
                            <span className={styles['section-title']}>Map</span>
                            <OtpDetailMap />
                        </section>
                    </div>
                </div>
            </OpportunityTrustPortfolioDetailProvider>

            <div id={styles.column_2}>
                <OpportunityTrustPortfolioDetailProvider>
                    <FormBuyNftProvider>
                        <FormBuyNft />
                    </FormBuyNftProvider>
                </OpportunityTrustPortfolioDetailProvider>
            </div>
        </div>
    );
};

PageOpportunityTrustPortfolio.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default PageOpportunityTrustPortfolio;

// ------------------
const Breadcrumb = () => {
    const { status, data } = useOpportunityTrustPortfolioDetailContext();

    const hideContent = status != OpportunityTrustPortfolioDetailStatus.LoadSucceeded;

    return (
        <div className="mBreadcrumb-style-4 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="div_1">
                <span className="span_1">
                    {hideContent ? '- -' : data?.showcaseInfo.id}: {hideContent ? '- -' : data?.showcaseInfo.name}
                </span>
                <span className="mTag span_2" data-status="successfull">
                    Total Return: Est 15-25% APY
                </span>
            </div>
        </div>
    );
};

const OtpInfoHeading = () => {
    const { status, data } = useOpportunityTrustPortfolioDetailContext();

    const hideContent = status != OpportunityTrustPortfolioDetailStatus.LoadSucceeded;

    return (
        <div className={styles.div_1}>
            <span className={styles.span_1}>{hideContent ? '- -' : data?.showcaseInfo.name}</span>
            <span className={styles.span_2}>{hideContent ? '- -' : data?.showcaseInfo.type}</span>
            <span className={styles.span_3}>{hideContent ? '- -' : data?.showcaseInfo.address}</span>
        </div>
    );
};

const SectionHighlightProptiesHeader = () => {
    const { status, data } = useOpportunityTrustPortfolioDetailContext();

    const hideContent = status != OpportunityTrustPortfolioDetailStatus.LoadSucceeded;

    return (
        <div id={styles['section-highlight-properties-header']}>
            <span className={styles.span_1}>
                <span className={[styles.span_0].join(' ')}>Property Highlights</span>
                <span className={[styles.span_3, 'mButton mButton-cp6-bp1'].join(' ')}>
                    {hideContent ? '- -' : data?.showcaseInfo.operateStatus}
                </span>
            </span>
            <span className={styles.span_4}>
                Holding Times: {hideContent ? '- -' : data?.showcaseInfo.holdingTimes}
            </span>
        </div>
    );
};
