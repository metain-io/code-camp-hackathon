import { AdminLayout } from '@app/layouts';
import {
    OpportunityTrustPortfolioDetailProvider,
    OtpDetailDescription,
    OtpDetailDocuments,
    OtpDetailGallery,
    OtpDetailHighlightProperties,
    OtpDetailMap,
    OtpDetailPartners,
    OtpDetailRoadmap,
    OtpDetailSummary,
} from '@opportunity-trust-portfolio/components';
import { useOpportunityTrustPortfolioDetailContext } from '@opportunity-trust-portfolio/components/opportunity-trust-portfoio-detail-provider/opportunity-trust-portfolio-detail-context';
import { ReactElement } from 'react';
import styles from './styles.module.scss';

const PageOpportunityTrustPortfolio = () => {
    return (
        <OpportunityTrustPortfolioDetailProvider>
            <div id={styles.row} className="row">
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

                <div id={styles.column_2}></div>
            </div>
        </OpportunityTrustPortfolioDetailProvider>
    );
};

PageOpportunityTrustPortfolio.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default PageOpportunityTrustPortfolio;

// ------------------
const Breadcrumb = () => {
    const { id, name } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div className="mBreadcrumb-style-4 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="div_1">
                <span className="span_1">
                    {id}: {name}
                </span>
                <span className="mTag span_2" data-status="successfull">
                    Total Return: Est 15-25% APY
                </span>
            </div>
        </div>
    );
};

const OtpInfoHeading = () => {
    const { name, type, address } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div className={styles.div_1}>
            <span className={styles.span_1}>{name}</span>
            <span className={styles.span_2}>{type}</span>
            <span className={styles.span_3}>{address}</span>
        </div>
    );
};

const SectionHighlightProptiesHeader = () => {
    const { operateStatus, holdingTimes } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div id={styles['section-highlight-properties-header']}>
            <span className={styles.span_1}>
                <span className={[styles.span_0].join(' ')}>Property Highlights</span>
                <span className={[styles.span_3, 'mButton mButton-cp6-bp1'].join(' ')}>{operateStatus}</span>
            </span>
            <span className={styles.span_4}>Holding Times: {holdingTimes}</span>
        </div>
    );
};
