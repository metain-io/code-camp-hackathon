import Anchor from '@app/layouts/admin-layout/navigation/components/anchor';
import { useOpportunityTrustPortfolioDetailContext } from '../opportunity-trust-portfolio-detail-context';
import { OpportunityTrustPortfolioDetailStatus } from '../opportunity-trust-portfolio-detail-reducer';
import styles from './styles.module.scss';

const OtpDetailDocuments = () => {
    const { status, data } = useOpportunityTrustPortfolioDetailContext();

    const hideContent = status != OpportunityTrustPortfolioDetailStatus.LoadSucceeded;

    return (
        <div className={styles['otp-detail-documents']}>
            {hideContent
                ? '- -'
                : data?.showcaseInfo.documents.map((doc: any) => {
                      const { name, href, disable } = doc;

                      return (
                          <Anchor
                              key={`Document-${name}`}
                              href={disable ? '#' : href}
                              className={styles['item']}
                              disabled={disable}
                              isOpenNewTab={href != '#' && href != ''}
                          >
                              <i className={[styles['item_icon'], 'fms fm-file-plus'].join(' ')}></i>
                              <span className={styles['item_label']}>{name}</span>
                          </Anchor>
                      );
                  })}
        </div>
    );
};

export { OtpDetailDocuments };
