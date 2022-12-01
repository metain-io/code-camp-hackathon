import { AdminLayout } from '@app/layouts';
import { ReactElement } from 'react';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import { OpportunityTrustPortfolioDetailProvider } from '@opportunity-trust-portfolio/components';
import { useOpportunityTrustPortfolioDetailContext } from '@opportunity-trust-portfolio/components/opportunity-trust-portfoio-detail-provider/opportunity-trust-portfolio-detail-context';
import moment from 'moment';

import styles from './styles.module.scss';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import Image from '@app/layouts/admin-layout/navigation/components/image';

const PageOpportunityTrustPortfolio = () => {
    return (
        <OpportunityTrustPortfolioDetailProvider>
            <div id={styles.row_1} className="row">
                <Breadcrumb />
                <div id={styles.column_2}>
                    <div id={styles.info_wrapper} className="mBackground-style-1">
                        <Summary />
                        <Gallery />
                        <Partners />
                    </div>

                    <div className={[styles.block_1, 'mBlock'].join(' ')}>
                        <Documents />
                        <Description />
                        <HighlightProperties />
                        <Roadmap />
                        <Map />
                    </div>
                </div>
                <div id={styles.column_3}></div>
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

const Summary = () => {
    const { name, type, address, price, valuationDate, expectedNetRentalYield, expectedPropertyValueAppreciation } =
        useOpportunityTrustPortfolioDetailContext();

    return (
        <>
            <div className={styles.div_1}>
                <span className={styles.span_1}>{name}</span>
                <span className={styles.span_2}>{type}</span>
                <span className={styles.span_3}>{address}</span>
            </div>
            <div className={styles.div_2}>
                <div className={styles.div_3}>
                    <span className={styles.span_4}>Target Raise</span>
                    <span className={styles.span_5}>{price} US$</span>
                    <span className={styles.span_6}>Valuation at {valuationDate}</span>
                </div>
                <div className={[styles.div_3, styles.border_left].join(' ')}>
                    <span className={styles.span_7}>{expectedNetRentalYield}%</span>
                    <span className={styles.span_8}>Expected net rental yield</span>
                </div>
                <div className={styles.div_3}>
                    <span className={styles.span_7}>{expectedPropertyValueAppreciation}%</span>
                    <span className={styles.span_8}>Expected property value appreciation</span>
                </div>
            </div>
        </>
    );
};

const Gallery = () => {
    const { imageUrls, name } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div className={styles.div_4}>
            <LightGallery
                plugins={[lgZoom, lgThumbnail]}
                mode="lg-fade"
                licenseKey={process.env.NEXT_PUBLIC_LIGHT_GALLERY_LICENSE_KEY}
            >
                {Object.entries(imageUrls).map(([key, src]: any) => {
                    return (
                        <div
                            key={`${name}-Image-${key}`}
                            className={[styles.item_1, key >= 5 ? 'd-none' : ''].join(' ')}
                            data-srcset={src}
                            data-src={src.replace('/image/vot/', '/image/vot/thumb/')}
                            data-sub-html="<h4>Photo by - <a href='https://metain.io/'>Metain</a></p>"
                        >
                            <img className={styles.image_1} src={src.replace('/image/vot/', '/image/vot/thumb/')} />
                            {key === '0' && (
                                <button
                                    id="see_all_images_button"
                                    className={[styles.button_1, 'mButton mButton-cp6-bn1'].join(' ')}
                                    // data-bs-toggle="modal"
                                    // data-bs-target={`#${styles.gallery_modal}`}
                                >
                                    See all photos
                                </button>
                            )}
                        </div>
                    );
                })}
            </LightGallery>
        </div>
    );
};

const Partners = () => {
    const { partnerResponsibilitiess } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div id={styles.partner_wrapper} className={[styles.partner_1, 'mBackground-style-1'].join(' ')}>
            {partnerResponsibilitiess.map((value) => {
                const { name, partners } = value;

                return (
                    <div key={`Partner-${name}`} className={styles.item_1}>
                        <span className={styles.span_2}>{name}</span>
                        <div className={styles.div_1}>
                            {partners.map((value, index) => {
                                const { imageUrl, name: partnerName } = value;
                                return (
                                    <Image
                                        className={[styles.image_1, styles[`image_${partnerName}`]].join(' ')}
                                        src={imageUrl}
                                        alt={`Metain Partner ${name} ${partnerName}`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const Documents = () => {
    const { documents } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div id={styles.document_wrapper}>
            <span className={styles.span_2}>Documents</span>
            <div className={styles.item_container}>
                {documents.map((doc: any) => {
                    return (
                        <a
                            key={`Document-${doc.name}`}
                            href={doc.disable ? '' : doc.href}
                            className={[styles.item_1, doc.disable ? styles.disable : ''].join(' ')}
                            // isOpenNewTab={doc.href != '#' && doc.href != ''}
                        >
                            <i className={[styles.icon_1, 'fms fm-file-plus'].join(' ')}></i>
                            <span className={styles.span_3}>{doc.name}</span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

const Description = () => {
    const { description } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div id={styles.property_wrapper}>
            <span className={styles.span_1}>About the Property</span>
            <span className={styles.span_2}>{description}</span>
        </div>
    );
};

const HighlightProperties = () => {
    const { highlightProperties, holdingTimes, operateStatus } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div id={styles.property_wrapper}>
            <span className={styles.span_1}>
                <span className={styles.span_0}>Property Highlights</span>
                <span className={[styles.span_3, 'mButton mButton-cp6-bp1'].join(' ')}>{operateStatus}</span>
            </span>
            <span className={styles.span_4}>Holding Times: {holdingTimes}</span>
            <div className={[styles.div_1].join(' ')}>
                {highlightProperties.map((value: any) => {
                    return (
                        <div
                            key={`Hightlight-${value.name}-${value.content}`}
                            className={[styles.item_1, value.content.includes('%') ? styles.percent : ''].join(' ')}
                        >
                            <span className={styles.span_5}>{value.name}</span>
                            <span className={styles.span_6}>{value.content}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const Roadmap = () => {
    const { roadmap } = useOpportunityTrustPortfolioDetailContext();
    const currentDate = moment();

    return (
        <div id={styles.roadmap_wrapper}>
            <span className={styles.span_1}>Roadmap</span>
            <div className={styles.div_1}>
                {roadmap.map((value: any, index: number) => {
                    const { title, timeLabel } = value;

                    let className = '';
                    let percent = 0;

                    const startDate = moment(value.startDate);
                    const endDate = moment(value.endDate);
                    const nextStartDate = moment(roadmap[index + 1]?.startDate);

                    if (currentDate >= startDate || currentDate >= endDate) {
                        className = styles.passed;
                    }

                    if (roadmap[index + 1] === undefined) {
                        className = styles.newest;
                    }

                    if (currentDate >= startDate && currentDate < nextStartDate) {
                        className = styles.current;

                        const passedDay = currentDate.diff(startDate, 'days');
                        const remainDay = nextStartDate.diff(currentDate, 'days');

                        percent = (passedDay / (remainDay + passedDay)) * 100;
                    }

                    return (
                        <div
                            className={[styles.item_1, className].join(' ')}
                            style={{ '--percent': `${percent}%` } as React.CSSProperties}
                        >
                            <span className={styles.span_4}></span>
                            <span className={styles.span_2}>{title}</span>
                            <span className={styles.span_3}>{timeLabel}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const Map = () => {
    return (
        <div id={styles.map_wrapper} className={styles.margin}>
            <span className={styles.span_11}>Map</span>
            <iframe
                src="https://www.google.com/maps/d/u/1/embed?mid=1t-0oVYXvgrPMQmNlfx12YO_UxXxqoq8&ehbc=2E312F"
                width="100%"
                height="480px"
            ></iframe>
        </div>
    );
};
