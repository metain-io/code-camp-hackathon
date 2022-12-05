"use strict";
exports.id = 924;
exports.ids = [924];
exports.modules = {

/***/ 8924:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "d$": () => (/* reexport */ notify),
  "Fs": () => (/* reexport */ responsive)
});

// UNUSED EXPORTS: useHelper, useInterval, useReducer

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "sweetalert2"
var external_sweetalert2_ = __webpack_require__(271);
var external_sweetalert2_default = /*#__PURE__*/__webpack_require__.n(external_sweetalert2_);
// EXTERNAL MODULE: external "react-toastify"
var external_react_toastify_ = __webpack_require__(1187);
;// CONCATENATED MODULE: ./src/shared/hooks/notify/index.tsx




const notify_useNotify = ()=>{
    /* Props **************************************************************************************************************************************************/ /* Stores *************************************************************************************************************************************************/ /* Hooks **************************************************************************************************************************************************/ /* Variables **********************************************************************************************************************************************/ const alertProps = {
        padding: "0 1rem 5rem 1rem",
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton: true
    };
    const confirmProps = {
        allowEnterKey: false,
        allowOutsideClick: false,
        showCancelButton: true,
        showClass: {
            popup: "animate__animated animate__zoomIn"
        },
        hideClass: {
            popup: "animate__animated animate__zoomOut"
        }
    };
    const toastProps = {
        icon: false,
        position: external_react_toastify_.toast.POSITION.BOTTOM_RIGHT,
        transition: (0,external_react_toastify_.cssTransition)({
            enter: "animate__animated animate__slideInRight",
            exit: "animate__animated animate__zoomOut"
        })
    };
    /* Life Circle ********************************************************************************************************************************************/ /* Api ****************************************************************************************************************************************************/ /* Functions **********************************************************************************************************************************************/ function F_showPopup(props) {
        const { status ="success" , title ="" , message ="" , ...otherProps } = props;
        external_sweetalert2_default().fire({
            imageUrl: status != "none" ? `/image/zero/image-alert-${status}.png` : "",
            imageWidth: 200,
            imageHeight: 200,
            title: title,
            html: message,
            ...alertProps,
            ...otherProps
        });
    }
    function F_showAlert(props) {
        const { title ="" , message ="" , C_confirm =()=>{} , C_cancel =()=>{}  } = props;
        const confirmation = external_sweetalert2_default().fire({
            icon: "question",
            title: title === "" ? "Warning" : title,
            html: message === "" ? "Confirm to perform action" : message,
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
            ...confirmProps
        });
        confirmation.then((result)=>{
            result.dismiss === (external_sweetalert2_default()).DismissReason.cancel ? C_cancel() : C_confirm();
        });
    }
    function F_showToast(props) {
        const { status ="success" , title ="" , message ="" , duration =5000  } = props;
        (0,external_react_toastify_.toast)(/*#__PURE__*/ (0,jsx_runtime_.jsxs)((external_react_default()).Fragment, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "title upper-case-text",
                    children: status
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "message",
                    dangerouslySetInnerHTML: {
                        __html: message
                    }
                })
            ]
        }), {
            type: status,
            autoClose: duration,
            ...toastProps
        });
    }
    /* Events *************************************************************************************************************************************************/ /* Components *********************************************************************************************************************************************/ /* Return Value *******************************************************************************************************************************************/ return {
        showPopup: F_showPopup,
        showAlert: F_showAlert,
        showToast: F_showToast
    };
};
/* harmony default export */ const notify = (notify_useNotify);

;// CONCATENATED MODULE: ./src/shared/hooks/helper/index.ts


const useHelper = ()=>{
    /* Props **************************************************************************************************************************************************/ /* Stores *************************************************************************************************************************************************/ /* Hooks **************************************************************************************************************************************************/ const { showToast  } = useNotify();
    /* Variables **********************************************************************************************************************************************/ /* Functions **********************************************************************************************************************************************/ function F_copyToClipboard(content, willShowToast) {
        navigator.clipboard.writeText(content);
        if (willShowToast) {
            showToast({
                status: "success",
                message: "Copied"
            });
        }
    }
    function F_loadingScreen(active) {
        if (active) {
            document.getElementById("loading_backdrop").classList.add("active");
            document.getElementById("loading_backdrop").classList.add("mLoading");
            document.addEventListener("click", E_removeAllEvents, true);
        } else {
            document.getElementById("loading_backdrop").classList.remove("active");
            document.getElementById("loading_backdrop").classList.remove("mLoading");
            document.removeEventListener("click", E_removeAllEvents, true);
        }
    }
    /* Events *************************************************************************************************************************************************/ const E_removeAllEvents = React.useCallback((event)=>{
        event.stopPropagation();
        event.preventDefault();
    }, []);
    /* Return Value *******************************************************************************************************************************************/ return {
        copyToClipboard: F_copyToClipboard,
        loadingScreen: F_loadingScreen
    };
};
/* harmony default export */ const helper = ((/* unused pure expression or super */ null && (useHelper)));

;// CONCATENATED MODULE: ./src/shared/hooks/interval/index.ts

const useInterval = (callback, timer)=>{
    /* Props **************************************************************************************************************************************************/ /* Stores *************************************************************************************************************************************************/ /* Hooks **************************************************************************************************************************************************/ const savedCallback = React.useRef(null);
    React.useEffect(()=>{
        savedCallback.current = callback;
    }, [
        callback
    ]);
    React.useEffect(()=>{
        let interval = setInterval(()=>{
            if (savedCallback.current) {
                savedCallback.current();
            }
        }, timer);
        return ()=>{
            clearInterval(interval);
        };
    }, [
        timer
    ]);
/* Variables **********************************************************************************************************************************************/ /* Life Circle ********************************************************************************************************************************************/ /* Api ****************************************************************************************************************************************************/ /* Functions **********************************************************************************************************************************************/ /* Events *************************************************************************************************************************************************/ /* Components *********************************************************************************************************************************************/ /* Return Value *******************************************************************************************************************************************/ };
/* harmony default export */ const interval = ((/* unused pure expression or super */ null && (useInterval)));

;// CONCATENATED MODULE: ./src/shared/hooks/reducer/index.ts

const useReducer = (initInstance)=>{
    /* Props **************************************************************************************************************************************************/ /* Stores *************************************************************************************************************************************************/ /* Hooks **************************************************************************************************************************************************/ const [instance, dispatchInstance] = React.useReducer(F_reducerInstance, initInstance);
    /* Variables **********************************************************************************************************************************************/ /* Life Circle ********************************************************************************************************************************************/ /* Api ****************************************************************************************************************************************************/ /* Functions **********************************************************************************************************************************************/ function F_reducerInstance(instance, action) {
        const { value =null , column =null , field =null , key =null  } = action;
        if (value !== null && column !== null && field !== null && key !== null) {
            return {
                ...instance,
                [column]: {
                    ...instance[column],
                    [field]: {
                        ...instance[field],
                        [key]: value
                    }
                }
            };
        }
        if (value !== null && column !== null && field !== null) {
            return {
                ...instance,
                [column]: {
                    ...instance[column],
                    [field]: value
                }
            };
        }
        if (value !== null && column !== null) {
            return {
                ...instance,
                [column]: value
            };
        }
        return {
            ...instance,
            ...value
        };
    }
    function F_changeInstance(value, column, field, key) {
        dispatchInstance({
            value: value,
            column: column,
            field: field,
            key: key
        });
    }
    function F_resetInstance() {
        F_changeInstance(initInstance);
    }
    /* Events *************************************************************************************************************************************************/ /* Components *********************************************************************************************************************************************/ /* Return Value *******************************************************************************************************************************************/ return [
        instance,
        F_changeInstance,
        F_resetInstance
    ];
};
/* harmony default export */ const reducer = ((/* unused pure expression or super */ null && (useReducer)));

;// CONCATENATED MODULE: ./src/shared/hooks/responsive/index.ts

const useResponsive = ()=>{
    /* Variables **************************************************************************************************************************/ /* Hooks ******************************************************************************************************************************/ const [deviceType, setDeviceType] = external_react_default().useState(getDeviceType());
    external_react_default().useEffect(()=>{
        resizeFunction();
        window.addEventListener("resize", resizeFunction);
        return ()=>{
            window.removeEventListener("resize", resizeFunction);
        };
    }, []);
    /* Functions **************************************************************************************************************************/ function resizeFunction() {
        setDeviceType(getDeviceType());
    }
    function getDeviceType() {
        if (window.innerWidth > 1007) {
            return "browser";
        } else if (window.innerWidth > 700) {
            return "tablet-large";
        } else if (window.innerWidth > 480) {
            return "tablet";
        } else {
            return "mobile";
        }
    }
    /* Split Component ********************************************************************************************************************/ /* Render *****************************************************************************************************************************/ return deviceType;
};
/* harmony default export */ const responsive = (useResponsive);

;// CONCATENATED MODULE: ./src/shared/hooks/index.ts








/***/ })

};
;