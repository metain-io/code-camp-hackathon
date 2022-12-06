import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import { useOpportunityTrustPortfolioDetailContext } from '../opportunity-trust-portfolio-detail-context';
import { OpportunityTrustPortfolioDetailStatus } from '../opportunity-trust-portfolio-detail-reducer';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import styles from './styles.module.scss';

const OtpDetailGallery = () => {
    const { status, data } = useOpportunityTrustPortfolioDetailContext();

    const hideContent = status != OpportunityTrustPortfolioDetailStatus.LoadSucceeded;

    return (
        <div className={styles['otp-detail-gallery']}>
            <LightGallery
                plugins={[lgZoom, lgThumbnail]}
                mode="lg-fade"
                licenseKey={process.env.NEXT_PUBLIC_LIGHT_GALLERY_LICENSE_KEY}
            >
                {hideContent
                    ? '- -'
                    : data?.showcaseInfo.imageUrls &&
                      Object.entries(data?.showcaseInfo.imageUrls).map(([key, src]: any) => {
                          return (
                              <div
                                  key={`${data?.showcaseInfo.name}-Image-${key}`}
                                  className={[styles.item_1, key >= 5 ? 'd-none' : ''].join(' ')}
                                  data-srcset={src}
                                  data-src={src.replace('/image/vot/', '/image/vot/thumb/')}
                                  data-sub-html="<h4>Photo by - <a href='https://metain.io/'>Metain</a></p>"
                              >
                                  <img
                                      className={styles.image_1}
                                      src={src.replace('/image/vot/', '/image/vot/thumb/')}
                                  />
                                  {key === '0' && (
                                      <button
                                          id="see_all_images_button"
                                          className={[styles.button_1, 'mButton mButton-cp6-bn1'].join(' ')}
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

export { OtpDetailGallery };
