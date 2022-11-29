import { PropsWithChildren } from 'react';
import { useLoginAuthentication } from './use-login-authentication';

type LoginAuthenticationProps = PropsWithChildren<{}>;

const LoginAuthentication = (props: LoginAuthenticationProps) => {
    const { children } = props;

    const { visibleChildren } = useLoginAuthentication();

    return visibleChildren ? <>{children}</> : null;
};

export { LoginAuthentication };
