import { PropsWithChildren } from 'react';
import { BackdropSpinner } from '..';
import { useLoginAuthentication } from './use-login-authentication';

type LoginAuthenticationProps = PropsWithChildren<{}>;

const LoginAuthentication = (props: LoginAuthenticationProps) => {
    const { children } = props;

    const { visibleChildren } = useLoginAuthentication();

    return visibleChildren ? <>{children}</> : <BackdropSpinner />;
};

export { LoginAuthentication };
