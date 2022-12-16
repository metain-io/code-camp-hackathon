import { OpportunityTrustPortfolioService } from '@opportunity-trust-portfolio/services/opportunity-trust-portfolio-service';
import { useRouter } from 'next/router';
import React from 'react';

const useListOpportunityTrustPortfolios = () => {
    const [otps, setOtps] = React.useState<Array<any>>([]);
    const router = useRouter();

    React.useEffect(() => {
        OpportunityTrustPortfolioService.getListOtp().then((otps) => setOtps(otps));
    }, []);

    const handleItemClicked = (otp: any) => {
        if (otp.operateStatus != 'Operating') {
            return;
        }

        router.replace(`/portfolio/${otp.slug}`);
    };

    return { otps, handleItemClicked };
};

export { useListOpportunityTrustPortfolios };
