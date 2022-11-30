import React, { PropsWithChildren } from 'react';
import styles from './style.module.scss';

type ContentProps = PropsWithChildren<{}>;

const Content = (props: ContentProps) => {
    const { children } = props;

    return (
        <div id={styles.content_wrapper} className="container-fluid">
            <div id={styles.row_1} className="row">
                <div id={styles.column_4} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Content;
