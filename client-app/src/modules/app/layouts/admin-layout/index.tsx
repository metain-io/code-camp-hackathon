import React from 'react';
import Content from './content';
import FixedBar from './fixed-bar';
import Navigation from './navigation';
import styles from './style.module.scss';

const AdminLayout = (props: AdminLayout_View.Props) => {
    /* Props **************************************************************************************************************************************************/
    const {
        revertRightColumn = false,
        hasRightColumn = true,
        rightColumnComponent = 'vot-buy',
        breadcrumb = <div className={styles.empty_breadcum}></div>,
        rightColumnContent,
    } = props;

    const KYCButtonRef = React.useRef<any>();

    /* Stores *************************************************************************************************************************************************/

    /* Hooks **************************************************************************************************************************************************/

    /* Variables **********************************************************************************************************************************************/

    /* Life Circle ********************************************************************************************************************************************/

    /* Functions **********************************************************************************************************************************************/

    /* Events *************************************************************************************************************************************************/

    /* Components *********************************************************************************************************************************************/

    /* Render *************************************************************************************************************************************************/
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div id={styles.admin_controller} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <Navigation />
                        <FixedBar />
                        <Content
                            revertRightColumn={revertRightColumn}
                            hasRightColumn={hasRightColumn}
                            rightColumnComponent={rightColumnComponent}
                            breadcrumb={breadcrumb}
                            rightColumnContent={rightColumnContent}
                            children={props.children}
                        />
                    </div>
                </div>
                {/* <GlobalNotificationPopUp /> */}
            </div>
        </>
    );
};

export default AdminLayout;
