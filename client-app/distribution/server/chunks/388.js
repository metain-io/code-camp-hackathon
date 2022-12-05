exports.id = 388;
exports.ids = [388];
exports.modules = {

/***/ 7083:
/***/ ((module) => {

// Exports
module.exports = {
	"component_back_drop_spinner": "styles_component_back_drop_spinner__SykUb",
	"active": "styles_active__3rlfu"
};


/***/ }),

/***/ 1977:
/***/ ((module) => {

// Exports
module.exports = {
	"button": "styles_button__dFNPK"
};


/***/ }),

/***/ 5688:
/***/ ((module) => {

// Exports
module.exports = {
	"button_logout": "styles_button_logout__jvwYA",
	"icon_3": "styles_icon_3__sQq6n"
};


/***/ }),

/***/ 8429:
/***/ ((module) => {

// Exports
module.exports = {
	"wallet_wrapper": "styles_wallet_wrapper__jzRIX",
	"span_1": "styles_span_1__vkVvh"
};


/***/ }),

/***/ 6638:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let ENABLED_LOG = "true" == "true";
let LOG_LEVELS = [
    "error",
    "info",
    "debug"
];
if (false) {}
function show(...args) {
    if (ENABLED_LOG) {
        console.log(...args);
    }
}
function error(...args) {
    if (LOG_LEVELS.includes("error")) {
        show("[ERROR]", ...args);
    }
}
function warning(...args) {
    if (LOG_LEVELS.includes("warning")) {
        show("[WARNING]", ...args);
    }
}
function debug(...args) {
    if (LOG_LEVELS.includes("debug")) {
        show("[DEBUG]", ...args);
    }
}
function info(...args) {
    if (LOG_LEVELS.includes("info")) {
        show("[INFO]", ...args);
    }
}
const logger = {
    error,
    warning,
    debug,
    info
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (logger);


/***/ }),

/***/ 8294:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ BackdropSpinner)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7083);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_2__);



const BackdropSpinner = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        id: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default().component_back_drop_spinner),
        className: [
            (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default().active),
            "mLoading"
        ].join(" ")
    });
};



/***/ }),

/***/ 4679:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "P": () => (/* binding */ ButtonConnectPhantomWallet)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./src/modules/auth/components/button-connect-phantom-wallet/styles.module.scss
var styles_module = __webpack_require__(1977);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);
// EXTERNAL MODULE: ./src/modules/auth/redux/login/slice.ts
var slice = __webpack_require__(2520);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
;// CONCATENATED MODULE: ./src/modules/auth/components/button-connect-phantom-wallet/use-button-connect-phantom-wallet.tsx


const useButtonConnectPhantomWallet = ()=>{
    const dispatch = (0,external_react_redux_.useDispatch)();
    const handleOnClicked = ()=>{
        dispatch(slice/* loginActions.loginWithPhantomWalletRequested */.BK.loginWithPhantomWalletRequested());
    };
    return {
        handleOnClicked
    };
};


;// CONCATENATED MODULE: ./src/modules/auth/components/button-connect-phantom-wallet/index.tsx



const ButtonConnectPhantomWallet = ()=>{
    const { handleOnClicked  } = useButtonConnectPhantomWallet();
    return /*#__PURE__*/ jsx_runtime_.jsx("button", {
        className: [
            (styles_module_default()).button,
            "mButton",
            "mButton-cp5-bn1"
        ].join(" "),
        onClick: handleOnClicked,
        children: "Connect Phantom Wallet"
    });
};



/***/ }),

/***/ 7552:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "b": () => (/* binding */ ButtonLogout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./src/modules/auth/components/button-logout/styles.module.scss
var styles_module = __webpack_require__(5688);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);
// EXTERNAL MODULE: ./src/modules/auth/redux/login/slice.ts
var slice = __webpack_require__(2520);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
;// CONCATENATED MODULE: ./src/modules/auth/components/button-logout/use-button-logout.tsx


const useButtonLogout = ()=>{
    const dispatch = (0,external_react_redux_.useDispatch)();
    const handleLogout = ()=>{
        dispatch(slice/* loginActions.logoutRequested */.BK.logoutRequested());
    };
    return {
        handleLogout
    };
};


;// CONCATENATED MODULE: ./src/modules/auth/components/button-logout/index.tsx



const ButtonLogout = ()=>{
    const { handleLogout  } = useButtonLogout();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
        className: (styles_module_default()).button_logout,
        onClick: handleLogout,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("i", {
                className: [
                    (styles_module_default()).icon_3,
                    "fml fm-arrow-square-right"
                ].join(" ")
            }),
            "Logout"
        ]
    });
};



/***/ }),

/***/ 5802:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bw": () => (/* reexport safe */ _backdrop_spinner__WEBPACK_IMPORTED_MODULE_5__.B),
/* harmony export */   "JE": () => (/* reexport safe */ _wallet_address__WEBPACK_IMPORTED_MODULE_3__.J),
/* harmony export */   "Pr": () => (/* reexport safe */ _button_connect_phantom_wallet__WEBPACK_IMPORTED_MODULE_1__.P),
/* harmony export */   "bk": () => (/* reexport safe */ _button_logout__WEBPACK_IMPORTED_MODULE_4__.b),
/* harmony export */   "yH": () => (/* reexport safe */ _login_authentication__WEBPACK_IMPORTED_MODULE_2__.y)
/* harmony export */ });
/* harmony import */ var _solana_wallet_context_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(572);
/* harmony import */ var _button_connect_phantom_wallet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4679);
/* harmony import */ var _login_authentication__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9280);
/* harmony import */ var _wallet_address__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9951);
/* harmony import */ var _button_logout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7552);
/* harmony import */ var _backdrop_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8294);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_solana_wallet_context_provider__WEBPACK_IMPORTED_MODULE_0__, _login_authentication__WEBPACK_IMPORTED_MODULE_2__]);
([_solana_wallet_context_provider__WEBPACK_IMPORTED_MODULE_0__, _login_authentication__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9280:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ LoginAuthentication)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5802);
/* harmony import */ var _use_login_authentication__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9608);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([___WEBPACK_IMPORTED_MODULE_1__]);
___WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const LoginAuthentication = (props)=>{
    const { children  } = props;
    const { visibleChildren  } = (0,_use_login_authentication__WEBPACK_IMPORTED_MODULE_2__/* .useLoginAuthentication */ .V)();
    return visibleChildren ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: children
    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(___WEBPACK_IMPORTED_MODULE_1__/* .BackdropSpinner */ .Bw, {});
};


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9608:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "V": () => (/* binding */ useLoginAuthentication)
/* harmony export */ });
/* harmony import */ var _auth_redux_login_slice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2520);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);




const PROTECTED_ROUTES = [
    "/",
    "/claim-dividends",
    "/dashboard",
    "/faucet-token",
    "/share-dividends",
    "/vot-1"
];
const AUTH_ROUTES = [
    "/login"
];
const useLoginAuthentication = ()=>{
    const loginStatus = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)(_auth_redux_login_slice__WEBPACK_IMPORTED_MODULE_0__/* .selectLoginStatus */ .OA);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    react__WEBPACK_IMPORTED_MODULE_2___default().useEffect(()=>{
        if ((loginStatus == _auth_redux_login_slice__WEBPACK_IMPORTED_MODULE_0__/* .LoginStatus.NotLogged */ .IC.NotLogged || loginStatus == _auth_redux_login_slice__WEBPACK_IMPORTED_MODULE_0__/* .LoginStatus.AuthenticateFailed */ .IC.AuthenticateFailed || loginStatus == _auth_redux_login_slice__WEBPACK_IMPORTED_MODULE_0__/* .LoginStatus.InitializeFailed */ .IC.InitializeFailed) && PROTECTED_ROUTES.includes(router.route)) {
            if (router.route != "/") {
                router.replace("/login?redirectUrl=" + window.location.href);
            } else {
                router.replace("/login");
            }
            return;
        }
        if (loginStatus == _auth_redux_login_slice__WEBPACK_IMPORTED_MODULE_0__/* .LoginStatus.LoggedIn */ .IC.LoggedIn && AUTH_ROUTES.includes(router.route)) {
            const { redirectUrl  } = router.query;
            if (redirectUrl) {
                router.replace(redirectUrl);
            } else {
                router.replace("/dashboard");
            }
            return;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        loginStatus
    ]);
    const visibleChildren = !PROTECTED_ROUTES.includes(router.route) || PROTECTED_ROUTES.includes(router.route) && loginStatus == _auth_redux_login_slice__WEBPACK_IMPORTED_MODULE_0__/* .LoginStatus.LoggedIn */ .IC.LoggedIn;
    return {
        visibleChildren
    };
};



/***/ }),

/***/ 572:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony export SolanaWalletContextProvider */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _solana_wallet_adapter_phantom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1985);
/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1247);
/* harmony import */ var _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8847);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7831);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_solana_web3_js__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_solana_wallet_adapter_phantom__WEBPACK_IMPORTED_MODULE_1__, _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_2__, _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_3__]);
([_solana_wallet_adapter_phantom__WEBPACK_IMPORTED_MODULE_1__, _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_2__, _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const endpoint = (0,_solana_web3_js__WEBPACK_IMPORTED_MODULE_4__.clusterApiUrl)("devnet");
const wallets = [
    new _solana_wallet_adapter_phantom__WEBPACK_IMPORTED_MODULE_1__.PhantomWalletAdapter()
];
const SolanaWalletContextProvider = (props)=>{
    const { children  } = props;
    return /*#__PURE__*/ _jsx(ConnectionProvider, {
        endpoint: endpoint,
        children: /*#__PURE__*/ _jsx(WalletProvider, {
            wallets: wallets,
            children: /*#__PURE__*/ _jsx(WalletModalProvider, {
                children: children
            })
        })
    });
};


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9951:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "J": () => (/* binding */ WalletAddress)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react-tooltip"
var external_react_tooltip_ = __webpack_require__(2076);
var external_react_tooltip_default = /*#__PURE__*/__webpack_require__.n(external_react_tooltip_);
// EXTERNAL MODULE: ./src/modules/auth/components/wallet-address/styles.module.scss
var styles_module = __webpack_require__(8429);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);
// EXTERNAL MODULE: ./src/modules/auth/redux/login/slice.ts
var slice = __webpack_require__(2520);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
;// CONCATENATED MODULE: ./src/modules/auth/components/wallet-address/use-wallet-address.tsx



const useWalletAddress = ()=>{
    const [copyState, setCopyState] = external_react_default().useState(null);
    const walletAddress = (0,external_react_redux_.useSelector)(slice/* selectLoginWalletAddress */.H5);
    const handleCopyToClipboard = ()=>{
        if (walletAddress) {
            navigator.clipboard.writeText(walletAddress).then(()=>{
                setCopyState(()=>{
                    setTimeout(()=>{
                        setCopyState(null);
                    }, 1000);
                    return "Copied";
                });
            });
        }
    };
    return {
        walletAddress,
        copyState,
        handleCopyToClipboard
    };
};


;// CONCATENATED MODULE: ./src/modules/auth/components/wallet-address/index.tsx




const WalletAddress = ()=>{
    const { walletAddress , copyState , handleCopyToClipboard  } = useWalletAddress();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        id: (styles_module_default()).wallet_wrapper,
        "data-tip": true,
        "data-for": "tooltip-username",
        onClick: handleCopyToClipboard,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                className: (styles_module_default()).image_1,
                src: "/svg/icon-token-sol.svg",
                alt: ""
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                className: (styles_module_default()).span_1,
                children: walletAddress
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((external_react_tooltip_default()), {
                id: "tooltip-username",
                uuid: "tooltip-username",
                type: "info",
                effect: "solid",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: (styles_module_default()).commission_tooltip_area,
                    children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        children: copyState ? copyState : "Copy"
                    })
                })
            })
        ]
    });
};



/***/ }),

/***/ 2520:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BK": () => (/* binding */ loginActions),
/* harmony export */   "H5": () => (/* binding */ selectLoginWalletAddress),
/* harmony export */   "IC": () => (/* binding */ LoginStatus),
/* harmony export */   "OA": () => (/* binding */ selectLoginStatus),
/* harmony export */   "fv": () => (/* binding */ loginReducers),
/* harmony export */   "wi": () => (/* binding */ selectLoginError)
/* harmony export */ });
/* unused harmony exports loginSlice, selectLoginUsername */
/* harmony import */ var _libs_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6638);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__);


var LoginStatus;
(function(LoginStatus) {
    LoginStatus[LoginStatus["Undefined"] = 0] = "Undefined";
    LoginStatus[LoginStatus["Initializing"] = 1] = "Initializing";
    LoginStatus[LoginStatus["InitializeFailed"] = 2] = "InitializeFailed";
    LoginStatus[LoginStatus["Authenticating"] = 3] = "Authenticating";
    LoginStatus[LoginStatus["AuthenticateFailed"] = 4] = "AuthenticateFailed";
    LoginStatus[LoginStatus["NotLogged"] = 5] = "NotLogged";
    LoginStatus[LoginStatus["LoggedIn"] = 6] = "LoggedIn";
})(LoginStatus || (LoginStatus = {}));
const initialState = {
    status: LoginStatus.Undefined,
    error: null,
    username: null,
    walletAddress: null
};
const loginSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({
    name: "auth/login",
    initialState: initialState,
    reducers: {
        initRequested: (state)=>{
            _libs_logger__WEBPACK_IMPORTED_MODULE_0__/* ["default"].info */ .Z.info("auth/login/init-requested");
            state.status = LoginStatus.Initializing;
        },
        initFinished: (state, action)=>{
            const { status , username , walletAddress  } = action.payload;
            _libs_logger__WEBPACK_IMPORTED_MODULE_0__/* ["default"].info */ .Z.info("auth/login/init-finished");
            state.status = status;
            state.username = username;
            state.walletAddress = walletAddress;
        },
        initFailed: (state, action)=>{
            const { error  } = action.payload;
            _libs_logger__WEBPACK_IMPORTED_MODULE_0__/* ["default"].error */ .Z.error("auth/login/init-failed", {
                error
            });
            state.status = LoginStatus.InitializeFailed;
            state.error = error;
        },
        logoutRequested: (state)=>{
            _libs_logger__WEBPACK_IMPORTED_MODULE_0__/* ["default"].info */ .Z.info("auth/login/logout-requested");
            state.status = LoginStatus.NotLogged;
            state.error = null;
            state.username = null;
            state.walletAddress = null;
        },
        loginWithPhantomWalletRequested: (state)=>{
            _libs_logger__WEBPACK_IMPORTED_MODULE_0__/* ["default"].info */ .Z.info("auth/login/login-with-phantom-wallet-requested");
            state.status = LoginStatus.Authenticating;
            state.error = null;
            state.username = null;
            state.walletAddress = null;
        },
        loginSucceeded: (state, action)=>{
            const { username , walletAddress  } = action.payload;
            _libs_logger__WEBPACK_IMPORTED_MODULE_0__/* ["default"].info */ .Z.info("auth/login/login-succeeded", {
                username
            });
            state.status = LoginStatus.LoggedIn;
            state.username = username;
            state.walletAddress = walletAddress;
        },
        loginFailed: (state, action)=>{
            const { error  } = action.payload;
            _libs_logger__WEBPACK_IMPORTED_MODULE_0__/* ["default"].error */ .Z.error("auth/login/login-failed", {
                error
            });
            state.status = LoginStatus.AuthenticateFailed;
            state.error = error;
        }
    },
    extraReducers: (builder)=>{}
});
const loginActions = loginSlice.actions;
const loginReducers = loginSlice.reducer;
const selectLoginStatus = (state)=>state.login.status;
const selectLoginError = (state)=>state.login.error;
const selectLoginUsername = (state)=>state.login.username;
const selectLoginWalletAddress = (state)=>state.login.walletAddress;


/***/ })

};
;