import React, { PropsWithChildren } from 'react';
import Content from './content';
import FixedBar from './fixed-bar';
import Navigation from './navigation';
import styles from './style.module.scss';

type AdminLayoutProps = PropsWithChildren<{}>;

const AdminLayout = (props: AdminLayoutProps) => {
    const { children } = props;

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div id={styles.admin_controller} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <Navigation />
                        <FixedBar />
                        <Content>{children}</Content>
                    </div>
                </div>
            </div>
        </>
    );
};

export { AdminLayout };
