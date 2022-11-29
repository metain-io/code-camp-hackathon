import { PropsWithChildren } from 'react';
import { Slider } from './slider';
import styles from './styles.module.scss';

type AuthLayoutProps = PropsWithChildren<{}>;

const AuthLayout = (props: AuthLayoutProps) => {
    const { children } = props;

    return (
        <div id={styles.authorize_controller}>
            <div className="container">
                <div className="row">
                    <div id={styles.left_wrapper} className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="row">
                            <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12">{children}</div>
                        </div>
                    </div>
                    <div id={styles.right_wrapper} className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="row">
                            <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12 offset-lg-2">
                                <Slider />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { AuthLayout };
