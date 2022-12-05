(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 6919:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ resolveGenerator)
/* harmony export */ });
function* resolveGenerator(generator) {
    try {
        const result = yield generator;
        return [
            result,
            null
        ];
    } catch (resolveGeneratorError) {
        return [
            null,
            resolveGeneratorError
        ];
    }
}


/***/ }),

/***/ 7575:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ appSaga)
/* harmony export */ });
/* harmony import */ var _auth_redux_login_saga__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4818);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6477);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_auth_redux_login_saga__WEBPACK_IMPORTED_MODULE_0__]);
_auth_redux_login_saga__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function* appSaga() {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.all)([
        (0,_auth_redux_login_saga__WEBPACK_IMPORTED_MODULE_0__/* .loginSaga */ .r)()
    ]);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8649:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5998);
/* harmony import */ var _saga__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7575);
/* harmony import */ var _auth_redux_login_slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2520);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([redux_saga__WEBPACK_IMPORTED_MODULE_1__, _saga__WEBPACK_IMPORTED_MODULE_2__]);
([redux_saga__WEBPACK_IMPORTED_MODULE_1__, _saga__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const sagaMiddleware = (0,redux_saga__WEBPACK_IMPORTED_MODULE_1__["default"])();
const store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.configureStore)({
    reducer: {
        login: _auth_redux_login_slice__WEBPACK_IMPORTED_MODULE_3__/* .loginReducers */ .fv
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: false
        }).concat(sagaMiddleware)
});
sagaMiddleware.run(_saga__WEBPACK_IMPORTED_MODULE_2__/* .appSaga */ .Y);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4818:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ loginSaga)
/* harmony export */ });
/* harmony import */ var _libs_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6919);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6477);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2520);
/* harmony import */ var _auth_services_user_pool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1282);
/* harmony import */ var _auth_services_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7718);
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5998);
/* harmony import */ var _libs_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6638);
/* harmony import */ var _crypto_wallet_crypto_wallet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9725);
/* harmony import */ var _crypto_wallet_wallet_adapters_phantom_wallet_adapter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3187);
/* harmony import */ var _crypto_wallet_services_crypto_wallet_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7474);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([redux_saga__WEBPACK_IMPORTED_MODULE_4__, _crypto_wallet_wallet_adapters_phantom_wallet_adapter__WEBPACK_IMPORTED_MODULE_7__]);
([redux_saga__WEBPACK_IMPORTED_MODULE_4__, _crypto_wallet_wallet_adapters_phantom_wallet_adapter__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










function createCryptoWalletEventChannel(cryptoWallet) {
    return (0,redux_saga__WEBPACK_IMPORTED_MODULE_4__.eventChannel)(cryptoWallet.eventChannelEmitter);
}
function* watchCryptoWalletEventChannel(walletProvider) {
    const walletEventChannel = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.call)(createCryptoWalletEventChannel, walletProvider);
    while(true){
        try {
            const { type , payload  } = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.take)(walletEventChannel);
            switch(type){
                case _crypto_wallet_crypto_wallet__WEBPACK_IMPORTED_MODULE_6__/* .CryptoWalletEvent.WalletConnect */ ._.WalletConnect:
                    console.log("wallet-connected");
                    break;
                case _crypto_wallet_crypto_wallet__WEBPACK_IMPORTED_MODULE_6__/* .CryptoWalletEvent.WalletDisconnect */ ._.WalletDisconnect:
                    console.log("wallet-disconnect");
                    walletEventChannel.close();
                    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.logoutRequested */ .BK.logoutRequested());
                    break;
                case _crypto_wallet_crypto_wallet__WEBPACK_IMPORTED_MODULE_6__/* .CryptoWalletEvent.WalletAccountChanged */ ._.WalletAccountChanged:
                    const { walletAccount  } = payload;
                    console.log("wallet-account-changed", walletAccount);
                    // yield put(loginActions.logoutRequested());
                    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.loginWithPhantomWalletRequested */ .BK.loginWithPhantomWalletRequested());
                    break;
            }
        } catch (error) {
            _libs_logger__WEBPACK_IMPORTED_MODULE_5__/* ["default"].error */ .Z.error("watchCryptoWalletEventChannelError", error);
        }
    }
}
function* init() {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.initRequested */ .BK.initRequested());
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.call)(_libs_utils__WEBPACK_IMPORTED_MODULE_9__/* .resolveGenerator */ .R, _auth_services_user_pool__WEBPACK_IMPORTED_MODULE_2__/* ["default"].syncUserPoolStorage */ .ZP.syncUserPoolStorage(_auth_services_user_pool__WEBPACK_IMPORTED_MODULE_2__/* .PoolTypeEnum.CONFIDENT */ .oI.CONFIDENT));
    const [loadedUser, loadUserFromStorageError] = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.call)(_libs_utils__WEBPACK_IMPORTED_MODULE_9__/* .resolveGenerator */ .R, _auth_services_user_pool__WEBPACK_IMPORTED_MODULE_2__/* ["default"].loadUserFromStorage */ .ZP.loadUserFromStorage(_auth_services_user_pool__WEBPACK_IMPORTED_MODULE_2__/* .PoolTypeEnum.CONFIDENT */ .oI.CONFIDENT));
    if (!loadedUser || loadUserFromStorageError) {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.initFinished */ .BK.initFinished({
            status: _slice__WEBPACK_IMPORTED_MODULE_1__/* .LoginStatus.NotLogged */ .IC.NotLogged,
            username: null
        }));
        return;
    }
    _auth_services_auth__WEBPACK_IMPORTED_MODULE_3__/* ["default"].currentUser */ .Z.currentUser = loadedUser;
    if (!_auth_services_auth__WEBPACK_IMPORTED_MODULE_3__/* ["default"].currentUserSessionValid */ .Z.currentUserSessionValid()) {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.initFinished */ .BK.initFinished({
            status: _slice__WEBPACK_IMPORTED_MODULE_1__/* .LoginStatus.NotLogged */ .IC.NotLogged,
            username: null
        }));
        return;
    }
    const username = loadedUser.getUsername();
    _crypto_wallet_services_crypto_wallet_service__WEBPACK_IMPORTED_MODULE_8__/* ["default"].currentWallet */ .Z.currentWallet = new _crypto_wallet_wallet_adapters_phantom_wallet_adapter__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z();
    if (!_crypto_wallet_services_crypto_wallet_service__WEBPACK_IMPORTED_MODULE_8__/* ["default"].currentWallet.available */ .Z.currentWallet.available) {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.initFinished */ .BK.initFinished({
            status: _slice__WEBPACK_IMPORTED_MODULE_1__/* .LoginStatus.NotLogged */ .IC.NotLogged,
            username: null
        }));
        return;
    }
    const [walletAccount, connectError] = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.call)(_libs_utils__WEBPACK_IMPORTED_MODULE_9__/* .resolveGenerator */ .R, _crypto_wallet_services_crypto_wallet_service__WEBPACK_IMPORTED_MODULE_8__/* ["default"].connect */ .Z.connect(null));
    if (connectError) {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.initFinished */ .BK.initFinished({
            status: _slice__WEBPACK_IMPORTED_MODULE_1__/* .LoginStatus.NotLogged */ .IC.NotLogged,
            username: null
        }));
        return;
    }
    if (!walletAccount) {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.initFinished */ .BK.initFinished({
            status: _slice__WEBPACK_IMPORTED_MODULE_1__/* .LoginStatus.NotLogged */ .IC.NotLogged,
            username: null
        }));
        return;
    }
    if (walletAccount.toLowerCase() != username.split("-")[3].toLowerCase()) {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.initFinished */ .BK.initFinished({
            status: _slice__WEBPACK_IMPORTED_MODULE_1__/* .LoginStatus.NotLogged */ .IC.NotLogged,
            username: null
        }));
        return;
    }
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.initFinished */ .BK.initFinished({
        status: _slice__WEBPACK_IMPORTED_MODULE_1__/* .LoginStatus.LoggedIn */ .IC.LoggedIn,
        username: username,
        walletAddress: walletAccount
    }));
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.fork)(watchCryptoWalletEventChannel, _crypto_wallet_services_crypto_wallet_service__WEBPACK_IMPORTED_MODULE_8__/* ["default"].currentWallet */ .Z.currentWallet);
}
function* handleLoginWithPhantomWallet() {
    _crypto_wallet_services_crypto_wallet_service__WEBPACK_IMPORTED_MODULE_8__/* ["default"].currentWallet */ .Z.currentWallet = new _crypto_wallet_wallet_adapters_phantom_wallet_adapter__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z();
    if (!_crypto_wallet_services_crypto_wallet_service__WEBPACK_IMPORTED_MODULE_8__/* ["default"].currentWallet.available */ .Z.currentWallet.available) {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.loginFailed */ .BK.loginFailed({
            error: new Error(`Wallet is not available. Please go to <a>${_crypto_wallet_services_crypto_wallet_service__WEBPACK_IMPORTED_MODULE_8__/* ["default"].currentWallet.downloadUrl */ .Z.currentWallet.downloadUrl}</a> to install wallet`)
        }));
        return;
    }
    const [walletAccount, connectError] = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.call)(_libs_utils__WEBPACK_IMPORTED_MODULE_9__/* .resolveGenerator */ .R, _crypto_wallet_services_crypto_wallet_service__WEBPACK_IMPORTED_MODULE_8__/* ["default"].connect */ .Z.connect(null));
    if (connectError) {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.loginFailed */ .BK.loginFailed({
            error: new Error("Connect failed")
        }));
        return;
    }
    const username = `w-sol-t-${walletAccount}`;
    const password = "MetainDummyPassword" + Date.now().toString();
    const [registerUserResult, registerUserError] = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.call)(_libs_utils__WEBPACK_IMPORTED_MODULE_9__/* .resolveGenerator */ .R, _auth_services_user_pool__WEBPACK_IMPORTED_MODULE_2__/* ["default"].registerUser */ .ZP.registerUser(username, password, [], _auth_services_user_pool__WEBPACK_IMPORTED_MODULE_2__/* .PoolTypeEnum.CONFIDENT */ .oI.CONFIDENT));
    if (registerUserError && registerUserError?.name != "UsernameExistsException") {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.loginFailed */ .BK.loginFailed({
            error: new Error("Connect get wallet account")
        }));
        return;
    }
    let cognitoUser = registerUserResult?.user || _auth_services_user_pool__WEBPACK_IMPORTED_MODULE_2__/* ["default"].createUser */ .ZP.createUser(username, _auth_services_user_pool__WEBPACK_IMPORTED_MODULE_2__/* .PoolTypeEnum.CONFIDENT */ .oI.CONFIDENT);
    _auth_services_auth__WEBPACK_IMPORTED_MODULE_3__/* ["default"].currentUser */ .Z.currentUser = cognitoUser;
    const [authenticateUserResult, authenticateUserError] = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.call)(_libs_utils__WEBPACK_IMPORTED_MODULE_9__/* .resolveGenerator */ .R, _auth_services_auth__WEBPACK_IMPORTED_MODULE_3__/* ["default"].authenticateUser */ .Z.authenticateUser(username, password, true));
    if (authenticateUserError) {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.loginFailed */ .BK.loginFailed({
            error: new Error("Authenticate failed")
        }));
        return;
    }
    if (!authenticateUserResult?.customChallange?.challengeParameters?.message) {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.loginFailed */ .BK.loginFailed({
            error: new Error("No challenge found")
        }));
        return;
    }
    const message = authenticateUserResult.customChallange.challengeParameters.message;
    const [challengeAnswer, signMessageError] = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.call)(_libs_utils__WEBPACK_IMPORTED_MODULE_9__/* .resolveGenerator */ .R, _crypto_wallet_services_crypto_wallet_service__WEBPACK_IMPORTED_MODULE_8__/* ["default"].signMessage */ .Z.signMessage(message));
    if (signMessageError) {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.loginFailed */ .BK.loginFailed({
            error: new Error("Sign message failed")
        }));
        return;
    }
    const [sendChallengeAnswerResult, sendChallengeAnswerError] = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.call)(_libs_utils__WEBPACK_IMPORTED_MODULE_9__/* .resolveGenerator */ .R, _auth_services_auth__WEBPACK_IMPORTED_MODULE_3__/* ["default"].sendCustomChallengeAnswer */ .Z.sendCustomChallengeAnswer(challengeAnswer));
    if (sendChallengeAnswerError) {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.loginFailed */ .BK.loginFailed({
            error: new Error("Send challenge answer error")
        }));
        return;
    }
    if (!sendChallengeAnswerResult?.session) {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.loginFailed */ .BK.loginFailed({
            error: new Error("Send challenge answer failed")
        }));
        return;
    }
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.put)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.loginSucceeded */ .BK.loginSucceeded({
        username: username,
        walletAddress: walletAccount
    }));
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.fork)(watchCryptoWalletEventChannel, _crypto_wallet_services_crypto_wallet_service__WEBPACK_IMPORTED_MODULE_8__/* ["default"].currentWallet */ .Z.currentWallet);
}
function* handleLogout() {
    if (_auth_services_auth__WEBPACK_IMPORTED_MODULE_3__/* ["default"].currentUser */ .Z.currentUser) {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.call)([
            _auth_services_auth__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,
            _auth_services_auth__WEBPACK_IMPORTED_MODULE_3__/* ["default"].globalSignOutUser */ .Z.globalSignOutUser
        ]);
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.call)([
            _auth_services_auth__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,
            _auth_services_auth__WEBPACK_IMPORTED_MODULE_3__/* ["default"].signOutUser */ .Z.signOutUser
        ]);
    }
    if (_crypto_wallet_services_crypto_wallet_service__WEBPACK_IMPORTED_MODULE_8__/* ["default"].currentWallet */ .Z.currentWallet) {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.call)([
            _crypto_wallet_services_crypto_wallet_service__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z,
            _crypto_wallet_services_crypto_wallet_service__WEBPACK_IMPORTED_MODULE_8__/* ["default"].disconnect */ .Z.disconnect
        ]);
    }
}
function* loginSaga() {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.fork)(init);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.takeLatest)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.loginWithPhantomWalletRequested.type */ .BK.loginWithPhantomWalletRequested.type, handleLoginWithPhantomWallet);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__.takeLatest)(_slice__WEBPACK_IMPORTED_MODULE_1__/* .loginActions.logoutRequested.type */ .BK.logoutRequested.type, handleLogout);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7718:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export AuthServiceClass */
/* harmony import */ var amazon_cognito_identity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8212);
/* harmony import */ var amazon_cognito_identity_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(amazon_cognito_identity_js__WEBPACK_IMPORTED_MODULE_0__);

class AuthService {
    get currentUser() {
        return this._currentUser;
    }
    set currentUser(user) {
        this._currentUser = user;
    }
    currentUserSessionValid() {
        return !!this._currentUser?.getSignInUserSession()?.isValid();
    }
    /**
     * confirmUserRegistration
     * @param code
     * @returns
     */ confirmUserRegistration(code) {
        return new Promise((resolve, reject)=>{
            if (!this._currentUser) {
                reject("_currentUser is undefined");
                return;
            }
            this._currentUser.confirmRegistration(code, true, (error, result)=>{
                if (error) reject(error);
                else resolve(result);
            });
        });
    }
    /**
     * resendUserConfirmationCode
     * @returns
     */ resendUserConfirmationCode() {
        return new Promise((resolve, reject)=>{
            if (!this._currentUser) {
                reject("_currentUser is undefined");
                return;
            }
            this._currentUser.resendConfirmationCode((error, result)=>{
                if (error) reject(error);
                else resolve(result);
            });
        });
    }
    /**
     * authenticateUser
     * @param username
     * @param password
     * @param useCustomFlow
     * @param customAuthenticationCb
     * @returns
     */ authenticateUser(username, password, useCustomFlow = false) {
        return new Promise((resolve, reject)=>{
            if (!this._currentUser) {
                reject("_currentUser is undefined");
                return;
            }
            const authenticationDetail = new amazon_cognito_identity_js__WEBPACK_IMPORTED_MODULE_0__.AuthenticationDetails({
                Username: username,
                Password: password
            });
            useCustomFlow && this._currentUser.setAuthenticationFlowType("CUSTOM_AUTH");
            const authenticate = useCustomFlow ? this._currentUser.initiateAuth : this._currentUser.authenticateUser;
            authenticate.apply(this._currentUser, [
                authenticationDetail,
                new AuthenticationCallback(this._currentUser, resolve, reject)
            ]);
        });
    }
    /**
     * isSignUp
     * @param username
     * @returns
     */ isSignUp(username) {
        return new Promise((resolve, reject)=>{
            if (!this._currentUser) {
                reject("_currentUser is undefined");
            }
            this.authenticateUser(username, undefined, true).then((result)=>{
                resolve(true);
            }).catch((error)=>{
                if (error?.code === "UserNotFoundException") {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        });
    }
    /**
     * completeNewPasswordChallenge
     * @param newPassword
     * @param requiredAttributes
     * @returns
     */ completeNewPasswordChallenge(newPassword, requiredAttributes) {
        return new Promise((resolve, reject)=>{
            if (!this._currentUser) {
                reject("_currentUser is undefined");
                return;
            }
            this._currentUser.completeNewPasswordChallenge(newPassword, requiredAttributes, new AuthenticationCallback(this._currentUser, resolve, reject));
        });
    }
    /**
     * associateSoftwareToken
     * @returns
     */ associateSoftwareToken() {
        return new Promise((resolve, reject)=>{
            if (!this._currentUser) {
                reject("_currentUser is undefined");
                return;
            }
            this._currentUser.associateSoftwareToken(new AuthenticationCallback(this._currentUser, resolve, reject));
        });
    }
    /**
     * verifySoftwareToken
     * @param challengeAnswer
     * @param friendlyDeviceName
     * @returns
     */ verifySoftwareToken(challengeAnswer, friendlyDeviceName = "") {
        return new Promise((resolve, reject)=>{
            if (!this._currentUser) {
                reject("_currentUser is undefined");
                return;
            }
            this._currentUser.verifySoftwareToken(challengeAnswer, friendlyDeviceName, new AuthenticationCallback(this._currentUser, resolve, reject));
        });
    }
    /**
     * sendMfaSelectionAnswer
     * @param mfaType
     * @returns
     */ sendMfaSelectionAnswer(mfaType) {
        return new Promise((resolve, reject)=>{
            if (!this._currentUser) {
                reject("_currentUser is undefined");
                return;
            }
            this._currentUser.sendMFASelectionAnswer(mfaType, new AuthenticationCallback(this._currentUser, resolve, reject));
        });
    }
    /**
     * sendMfaCode
     * @param code
     * @returns
     */ sendMfaCode(code) {
        return new Promise((resolve, reject)=>{
            if (!this._currentUser) {
                reject("_currentUser is undefined");
                return;
            }
            this._currentUser.sendMFACode(code, new AuthenticationCallback(this._currentUser, resolve, reject));
        });
    }
    /**
     * sendUserForgotPasswordRequest
     * @param username
     * @returns
     */ sendUserForgotPasswordRequest() {
        return new Promise((resolve, reject)=>{
            if (!this._currentUser) {
                reject("_currentUser is undefined");
                return;
            }
            this._currentUser.forgotPassword({
                onSuccess: (result)=>{
                    resolve(result);
                },
                onFailure: (error)=>{
                    reject(error);
                },
                inputVerificationCode: (result)=>{
                    resolve(result);
                }
            });
        });
    }
    /**
     * sendCustomChallengeAnswer
     * @param username
     * @returns
     */ sendCustomChallengeAnswer(signature) {
        return new Promise((resolve, reject)=>{
            if (!this._currentUser) {
                reject("_currentUser is undefined");
                return;
            }
            this._currentUser.sendCustomChallengeAnswer(signature, new AuthenticationCallback(this._currentUser, resolve, reject));
        });
    }
    /**
     * confirmUserForgotPasswordRequestWithNewPassword
     * @param username
     * @param code
     * @param newPassword
     * @returns
     */ confirmUserForgotPasswordRequestWithNewPassword(code, newPassword) {
        return new Promise((resolve, reject)=>{
            if (!this._currentUser) {
                reject("_currentUser is undefined");
                return;
            }
            this._currentUser.confirmPassword(code, newPassword, {
                onSuccess: (result)=>{
                    resolve(result);
                },
                onFailure: (error)=>{
                    reject(error);
                }
            });
        });
    }
    /**
     * signOutUser
     * @returns
     */ signOutUser() {
        return new Promise((resolve, reject)=>{
            if (!this._currentUser) {
                reject("_currentUser is undefined");
                return;
            }
            try {
                this._currentUser.signOut(()=>{
                    this._currentUser = undefined;
                    resolve(null);
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    /**
     * globalSignOutUser
     * @returns
     */ globalSignOutUser() {
        return new Promise((resolve, reject)=>{
            if (!this._currentUser) {
                reject("_currentUser is undefined");
                return;
            }
            this._currentUser.globalSignOut({
                onSuccess: (result)=>{
                    resolve(result);
                },
                onFailure: (error)=>{
                    reject(error);
                }
            });
        });
    }
    /**
     * refreshUserSession
     * @returns
     */ refreshUserSession() {
        return new Promise((resolve, reject)=>{
            if (!this._currentUser) {
                reject("_currentUser is undefined");
                return;
            }
            const user = this._currentUser;
            user.getSession((error, result)=>{
                if (error || !result?.getRefreshToken()) {
                    reject(error);
                    return;
                }
                const refreshToken = result.getRefreshToken();
                user.refreshSession(refreshToken, (error, result)=>{
                    if (error) reject(error);
                    else resolve(result);
                });
            });
        });
    }
}
class AuthenticationCallback {
    constructor(user, resolve, reject){
        this._user = user;
        this._resolve = resolve;
        this._reject = reject;
    }
    onSuccess(session, userConfirmationNecessary) {
        this._resolve({
            user: this._user,
            session,
            userConfirmationNecessary
        });
    }
    onFailure(error) {
        this._reject(error);
    }
    customChallenge(challengeParameters) {
        this._resolve({
            user: this._user,
            customChallange: {
                challengeParameters
            }
        });
    }
    mfaRequired(challengeName, challengeParameters) {
        this._resolve({
            user: this._user,
            mfaRequired: {
                challengeName,
                challengeParameters
            }
        });
    }
    totpRequired(challengeName, challengeParameters) {
        this._resolve({
            user: this._user,
            totpRequired: {
                challengeName,
                challengeParameters
            }
        });
    }
    mfaSetup(challengeName, challengeParameters) {
        this._resolve({
            user: this._user,
            mfaSetup: {
                challengeName,
                challengeParameters
            }
        });
    }
    newPasswordRequired(userAttributes, requiredAttributes) {
        this._resolve({
            user: this._user,
            newPasswordRequired: {
                userAttributes,
                requiredAttributes
            }
        });
    }
    selectMFAType(challengeName, challengeParameters) {
        this._resolve({
            user: this._user,
            selectMfaType: {
                challengeName,
                challengeParameters
            }
        });
    }
    associateSecretCode(secretCode) {
        this._resolve({
            user: this._user,
            associateSecretCode: {
                secretCode
            }
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new AuthService());



/***/ }),

/***/ 1282:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "oI": () => (/* binding */ PoolTypeEnum)
/* harmony export */ });
/* unused harmony export UserPoolServiceClass */
/* harmony import */ var amazon_cognito_identity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8212);
/* harmony import */ var amazon_cognito_identity_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(amazon_cognito_identity_js__WEBPACK_IMPORTED_MODULE_0__);

var PoolTypeEnum;
(function(PoolTypeEnum) {
    PoolTypeEnum["CUSTODIAL"] = "custodial";
    PoolTypeEnum["CONFIDENT"] = "confident";
})(PoolTypeEnum || (PoolTypeEnum = {}));
class UserPoolService {
    CONFIDENT_POOL_DATA = {
        UserPoolId: "ap-southeast-1_TKrfExq6W" || 0,
        ClientId: "7i34cferm8miq4oohau34cfu2b" || 0
    };
    CUSTODIAL_POOL_DATA = {
        UserPoolId: "ap-southeast-1_T8sBv47ib" || 0,
        ClientId: "4u5f0dus86b208prcmfojku4qa" || 0
    };
    constructor(){
        this._userPool = new amazon_cognito_identity_js__WEBPACK_IMPORTED_MODULE_0__.CognitoUserPool(this.CUSTODIAL_POOL_DATA);
        this._confidentUserPool = new amazon_cognito_identity_js__WEBPACK_IMPORTED_MODULE_0__.CognitoUserPool(this.CONFIDENT_POOL_DATA);
    }
    get userPool() {
        return this._userPool;
    }
    get confidentUserPool() {
        return this._confidentUserPool;
    }
    createUser(username, poolType = PoolTypeEnum.CUSTODIAL) {
        let user = new amazon_cognito_identity_js__WEBPACK_IMPORTED_MODULE_0__.CognitoUser({
            Username: username,
            Pool: poolType == PoolTypeEnum.CUSTODIAL ? this._userPool : this._confidentUserPool
        });
        return user;
    }
    registerUser(username, password, attributes = [], poolType = PoolTypeEnum.CUSTODIAL) {
        return new Promise((resolve, reject)=>{
            const userAttributes = [];
            for (let attribute of attributes){
                userAttributes.push(new amazon_cognito_identity_js__WEBPACK_IMPORTED_MODULE_0__.CognitoUserAttribute({
                    Name: attribute.name,
                    Value: attribute.value
                }));
            }
            const userPool = poolType == PoolTypeEnum.CUSTODIAL ? this._userPool : this._confidentUserPool;
            userPool.signUp(username, password, userAttributes, [], (error, result)=>{
                if (error) reject(error);
                else resolve(result);
            });
        });
    }
    syncUserPoolStorage(poolType = PoolTypeEnum.CUSTODIAL) {
        return new Promise((resolve, reject)=>{
            const userPool = poolType == PoolTypeEnum.CUSTODIAL ? this._userPool : this._confidentUserPool;
            // @ts-ignore
            userPool.storage.sync((error, result)=>{
                if (error) reject(error);
                else resolve(result);
            });
        });
    }
    loadUserFromStorage(poolType = PoolTypeEnum.CUSTODIAL) {
        return new Promise((resolve, reject)=>{
            const userPool = poolType == PoolTypeEnum.CUSTODIAL ? this._userPool : this._confidentUserPool;
            let user = userPool.getCurrentUser();
            if (!user) {
                resolve(null);
                return;
            }
            user.getSession((error, session)=>{
                if (error) {
                    reject(error);
                    return;
                }
                resolve(user);
            });
        });
    }
    deleteUser(user) {
        return new Promise((resolve, reject)=>{
            user.deleteUser((error, result)=>{
                if (error) reject(error);
                else resolve(result);
            });
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new UserPoolService());



/***/ }),

/***/ 9725:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ CryptoWallet),
/* harmony export */   "_": () => (/* binding */ CryptoWalletEvent)
/* harmony export */ });
var CryptoWalletEvent;
(function(CryptoWalletEvent) {
    CryptoWalletEvent["WalletConnect"] = "WALLET_CONNECT";
    CryptoWalletEvent["WalletDisconnect"] = "WALLET_DISCONNECT";
    CryptoWalletEvent["WalletAccountChanged"] = "WALLET_ACCOUNT_CHANGED";
    CryptoWalletEvent["WalletNetworkChanged"] = "WALLET_NETWORK_CHANGED";
})(CryptoWalletEvent || (CryptoWalletEvent = {}));
class CryptoWallet {
}


/***/ }),

/***/ 7474:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class CryptoWalletService {
    set currentWallet(wallet) {
        this._currentWallet = wallet;
    }
    get currentWallet() {
        return this._currentWallet;
    }
    async connect(network) {
        if (!this._currentWallet) {
            throw new Error("_currentWallet is undefined");
        }
        return await this._currentWallet.connect(network);
    }
    async disconnect() {
        if (!this._currentWallet) {
            throw new Error("_currentWallet is undefined");
        }
        return await this._currentWallet.disconnect();
    }
    async signMessage(message) {
        if (!this._currentWallet) {
            throw new Error("_currentWallet is undefined");
        }
        return await this._currentWallet.signMessage(message);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new CryptoWalletService());


/***/ }),

/***/ 3187:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ PhantomWallet)
/* harmony export */ });
/* harmony import */ var bs58__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(390);
/* harmony import */ var bs58__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bs58__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tweetnacl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1707);
/* harmony import */ var tweetnacl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tweetnacl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7831);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_solana_web3_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _solana_spl_token__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1057);
/* harmony import */ var _crypto_wallet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9725);
/* harmony import */ var _libs_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6638);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_solana_spl_token__WEBPACK_IMPORTED_MODULE_3__]);
_solana_spl_token__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






class PhantomWallet extends _crypto_wallet__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z {
    constructor(){
        super();
        const provider = window?.phantom?.solana;
        this._provider = provider;
        this._tokenConfig = [
            {
                label: "USDT",
                value: "A7yGbWrtgTjXVdxky86CSEyfH6Jy388RYFWfZsH2D8hr",
                icon: "/svg/icon-token-usdt.svg",
                decimalNo: BigInt(Math.pow(10, 6))
            },
            {
                label: "USDC",
                value: "3GUqiPovczNg1KoZg5FovwRZ4KPFb95UGZCCTPFb9snc",
                icon: "/svg/icon-token-usdc.svg",
                decimalNo: BigInt(Math.pow(10, 6))
            }
        ];
    }
    get walletAccount() {
        return this._walletAccount;
    }
    get available() {
        return this._provider?.isPhantom;
    }
    get supportUrl() {
        return undefined;
    }
    get downloadUrl() {
        return "https://phantom.app/download";
    }
    get tokenForSelect() {
        return this._tokenConfig?.map((item, idx)=>{
            return {
                label: item.label,
                value: item.value,
                icon: item.icon
            };
        }) || [];
    }
    async connect(network) {
        const connectResult = await this._provider.connect();
        const walletAddress = connectResult?.publicKey?.toString();
        this._walletAccount = walletAddress;
        return walletAddress;
    }
    async disconnect() {
        this._provider.emit("disconnect");
    }
    async signMessage(message) {
        const encodedMessage = new TextEncoder().encode(message);
        const signMessageResult = await this._provider.signMessage(encodedMessage, "utf8");
        const { signature , publicKey  } = signMessageResult;
        const signatureVerified = await new Promise((resolve, reject)=>{
            try {
                resolve(tweetnacl__WEBPACK_IMPORTED_MODULE_1___default().sign.detached.verify(Uint8Array.from(Buffer.from(message)), signature, publicKey.toBuffer()));
            } catch (error) {
                reject(error);
            }
        });
        if (!signatureVerified) {
            throw new Error("Verify signature failed");
        }
        return `${this._walletAccount}|${bs58__WEBPACK_IMPORTED_MODULE_0___default().encode(signature)}`;
    }
    async getBalances(userWalletAddress) {
        const tmpBalances = {};
        try {
            const connection = new _solana_web3_js__WEBPACK_IMPORTED_MODULE_2__.Connection(_solana_web3_js__WEBPACK_IMPORTED_MODULE_2__.clusterApiUrl("devnet"), "confirmed");
            const tokenAccounts = await connection.getTokenAccountsByOwner(new _solana_web3_js__WEBPACK_IMPORTED_MODULE_2__.PublicKey(userWalletAddress), {
                programId: _solana_spl_token__WEBPACK_IMPORTED_MODULE_3__.TOKEN_PROGRAM_ID
            });
            const solAmount = await connection.getBalance(new _solana_web3_js__WEBPACK_IMPORTED_MODULE_2__.PublicKey(userWalletAddress));
            tmpBalances["SOL"] = BigInt(solAmount) / BigInt(_solana_web3_js__WEBPACK_IMPORTED_MODULE_2__.LAMPORTS_PER_SOL);
            tokenAccounts?.value?.forEach((tokenAccount)=>{
                const accountData = _solana_spl_token__WEBPACK_IMPORTED_MODULE_3__.AccountLayout.decode(tokenAccount.account.data);
                const relatedToken = this._tokenConfig?.find((item, index)=>{
                    return item.value == accountData.mint.toBase58();
                });
                if (relatedToken) {
                    tmpBalances[relatedToken.label] = accountData.amount / relatedToken.decimalNo;
                }
            });
            _libs_logger__WEBPACK_IMPORTED_MODULE_5__/* ["default"].debug */ .Z.debug("=== PhantomWallet - getBalances - BALANCE: ", tmpBalances);
        } catch (error) {
            _libs_logger__WEBPACK_IMPORTED_MODULE_5__/* ["default"].debug */ .Z.debug("=== PhantomWallet - getBalances - ERROR: ", error);
            return {};
        }
        return tmpBalances;
    }
    eventChannelEmitter = (emit)=>{
        const handleConnect = ()=>{
            emit({
                type: _crypto_wallet__WEBPACK_IMPORTED_MODULE_4__/* .CryptoWalletEvent.WalletConnect */ ._.WalletConnect
            });
        };
        const handleDisconnect = ()=>{
            emit({
                type: _crypto_wallet__WEBPACK_IMPORTED_MODULE_4__/* .CryptoWalletEvent.WalletDisconnect */ ._.WalletDisconnect
            });
        };
        const handleAccountChanged = (publicKey)=>{
            emit({
                type: _crypto_wallet__WEBPACK_IMPORTED_MODULE_4__/* .CryptoWalletEvent.WalletAccountChanged */ ._.WalletAccountChanged,
                payload: {
                    walletAccount: publicKey.toString()
                }
            });
        };
        this._provider.on("connect", handleConnect);
        this._provider.on("accountChanged", handleAccountChanged);
        this._provider.on("disconnect", handleDisconnect);
        return ()=>{
            this._provider.off("connect", handleConnect);
            this._provider.off("accountChanged", handleAccountChanged);
            this._provider.off("disconnect", handleDisconnect);
        };
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6505:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_redux_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8649);
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9090);
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_toastify_scss_main_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7902);
/* harmony import */ var react_toastify_scss_main_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify_scss_main_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _app_styles_animation_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3249);
/* harmony import */ var _app_styles_animation_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_app_styles_animation_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _app_styles_font_metain_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5606);
/* harmony import */ var _app_styles_font_metain_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_app_styles_font_metain_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _app_styles_rule_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2318);
/* harmony import */ var _app_styles_rule_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_app_styles_rule_scss__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _app_styles_global_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1745);
/* harmony import */ var _app_styles_global_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_app_styles_global_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _auth_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5802);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_app_redux_store__WEBPACK_IMPORTED_MODULE_2__, _auth_components__WEBPACK_IMPORTED_MODULE_9__]);
([_app_redux_store__WEBPACK_IMPORTED_MODULE_2__, _auth_components__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












function App({ Component , pageProps  }) {
    const getLayout = Component.getLayout ?? ((page)=>page);
    react__WEBPACK_IMPORTED_MODULE_11___default().useEffect(()=>{
        window.bootstrap = __webpack_require__(2929);
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_redux__WEBPACK_IMPORTED_MODULE_1__.Provider, {
        store: _app_redux_store__WEBPACK_IMPORTED_MODULE_2__/* .store */ .h,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_auth_components__WEBPACK_IMPORTED_MODULE_9__/* .LoginAuthentication */ .yH, {
                children: getLayout(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                    ...pageProps
                }))
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_toastify__WEBPACK_IMPORTED_MODULE_10__.ToastContainer, {})
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9090:
/***/ (() => {



/***/ }),

/***/ 7902:
/***/ (() => {



/***/ }),

/***/ 3249:
/***/ (() => {



/***/ }),

/***/ 5606:
/***/ (() => {



/***/ }),

/***/ 1745:
/***/ (() => {



/***/ }),

/***/ 2318:
/***/ (() => {



/***/ }),

/***/ 5184:
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 7831:
/***/ ((module) => {

"use strict";
module.exports = require("@solana/web3.js");

/***/ }),

/***/ 8212:
/***/ ((module) => {

"use strict";
module.exports = require("amazon-cognito-identity-js");

/***/ }),

/***/ 2929:
/***/ ((module) => {

"use strict";
module.exports = require("bootstrap");

/***/ }),

/***/ 390:
/***/ ((module) => {

"use strict";
module.exports = require("bs58");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 1187:
/***/ ((module) => {

"use strict";
module.exports = require("react-toastify");

/***/ }),

/***/ 2076:
/***/ ((module) => {

"use strict";
module.exports = require("react-tooltip");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 6477:
/***/ ((module) => {

"use strict";
module.exports = require("redux-saga/effects");

/***/ }),

/***/ 1707:
/***/ ((module) => {

"use strict";
module.exports = require("tweetnacl");

/***/ }),

/***/ 1057:
/***/ ((module) => {

"use strict";
module.exports = import("@solana/spl-token");;

/***/ }),

/***/ 1985:
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-phantom");;

/***/ }),

/***/ 1247:
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-react");;

/***/ }),

/***/ 8847:
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-react-ui");;

/***/ }),

/***/ 5998:
/***/ ((module) => {

"use strict";
module.exports = import("redux-saga");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [388], () => (__webpack_exec__(6505)));
module.exports = __webpack_exports__;

})();