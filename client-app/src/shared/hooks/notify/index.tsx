import React from 'react';
import Swal from 'sweetalert2';
import { toast, cssTransition } from 'react-toastify';

const useNotify = () => {
    /* Props **************************************************************************************************************************************************/

    /* Stores *************************************************************************************************************************************************/

    /* Hooks **************************************************************************************************************************************************/

    /* Variables **********************************************************************************************************************************************/
    const alertProps = {
        padding: '0 1rem 5rem 1rem',
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton: true,
    };

    const confirmProps = {
        allowEnterKey: false,
        allowOutsideClick: false,
        showCancelButton: true,
        showClass: {
            popup: 'animate__animated animate__zoomIn',
        },
        hideClass: {
            popup: 'animate__animated animate__zoomOut',
        },
    };

    const toastProps = {
        icon: false,
        position: toast.POSITION.BOTTOM_RIGHT,
        transition: cssTransition({
            enter: 'animate__animated animate__slideInRight',
            exit: 'animate__animated animate__zoomOut',
        }),
    };

    /* Life Circle ********************************************************************************************************************************************/

    /* Api ****************************************************************************************************************************************************/

    /* Functions **********************************************************************************************************************************************/
    function F_showPopup(props: Notify_Hook.Alert | any) {
        const { status = 'success', title = '', message = '', ...otherProps } = props;

        Swal.fire({
            imageUrl: status != 'none' ? `/image/zero/image-alert-${status}.png` : '',
            imageWidth: 200,
            imageHeight: 200,
            title: title,
            html: message,
            ...alertProps,
            ...otherProps,
        });
    }

    function F_showAlert(props: Notify_Hook.Confirm) {
        const { title = '', message = '', C_confirm = () => {}, C_cancel = () => {} } = props;

        const confirmation = Swal.fire({
            icon: 'question',
            title: title === '' ? 'Warning' : title,
            html: message === '' ? 'Confirm to perform action' : message,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            ...confirmProps,
        });

        confirmation.then((result) => {
            result.dismiss === Swal.DismissReason.cancel ? C_cancel() : C_confirm();
        });
    }

    function F_showToast(props: Notify_Hook.Toast) {
        const { status = 'success', title = '', message = '', duration = 5000 } = props;

        toast(
            <React.Fragment>
                <div className="title upper-case-text">{status}</div>
                <div className="message" dangerouslySetInnerHTML={{ __html: message }}></div>
            </React.Fragment>,
            {
                type: status,
                autoClose: duration,
                ...toastProps,
            },
        );
    }

    /* Events *************************************************************************************************************************************************/

    /* Components *********************************************************************************************************************************************/

    /* Return Value *******************************************************************************************************************************************/
    return {
        showPopup: F_showPopup,
        showAlert: F_showAlert,
        showToast: F_showToast,
    };
};

export default useNotify;
