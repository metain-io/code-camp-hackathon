import { PropsWithChildren } from 'react';
import { useLoginAuthentication } from './use-login-authentication';

type LoginAuthenticationProps = PropsWithChildren<{}>;

const LoginAuthentication = (props: LoginAuthenticationProps) => {
    const { children } = props;

    const { canShowChildren } = useLoginAuthentication();

    if (canShowChildren) {
        return <>{children}</>;
    }

    return null;
};

export { LoginAuthentication };
