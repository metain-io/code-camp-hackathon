import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserSession,
    IAuthenticationCallback,
} from 'amazon-cognito-identity-js';

export type AuthenticateUserResult = {
    user: CognitoUser;
    session?: CognitoUserSession;
    userConfirmationNecessary?: boolean;
    customChallange?: {
        challengeParameters: any;
    };
    mfaRequired?: {
        challengeName: any;
        challengeParameters: any;
    };
    totpRequired?: {
        challengeName: any;
        challengeParameters: any;
    };
    mfaSetup?: {
        challengeName: any;
        challengeParameters: any;
    };
    newPasswordRequired?: {
        userAttributes: any;
        requiredAttributes: any;
    };
    selectMfaType?: {
        challengeName: any;
        challengeParameters: any;
    };
    associateSecretCode?: {
        secretCode: string;
    };
};

interface IAuthService {
    currentUser?: CognitoUser;

    currentUserSessionValid(): boolean;

    confirmUserRegistration(code: string): Promise<any>;

    resendUserConfirmationCode(): Promise<any>;

    authenticateUser(username: string, password: string, useCustomFlow: boolean): Promise<any>;

    isSignUp(username: string): Promise<boolean>;

    completeNewPasswordChallenge(newPassword: string, requiredAttributes: any): Promise<any>;

    associateSoftwareToken(): Promise<any>;

    verifySoftwareToken(challengeAnswer: string, friendlyDeviceName: string): Promise<any>;

    sendMfaSelectionAnswer(mfaType: 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA'): Promise<any>;

    sendMfaCode(code: string): Promise<any>;

    sendUserForgotPasswordRequest(): Promise<any>;

    sendCustomChallengeAnswer(signature: string): Promise<any>;

    confirmUserForgotPasswordRequestWithNewPassword(code: string, newPassword: string): Promise<string>;

    signOutUser(): Promise<any>;

    globalSignOutUser(): Promise<string>;

    refreshUserSession(): Promise<any>;
}

class AuthService implements IAuthService {
    private _currentUser?: CognitoUser;

    get currentUser() {
        return this._currentUser;
    }

    set currentUser(user: CognitoUser | undefined) {
        this._currentUser = user;
    }

    currentUserSessionValid() {
        return !!this._currentUser?.getSignInUserSession()?.isValid();
    }

    /**
     * confirmUserRegistration
     * @param code
     * @returns
     */
    confirmUserRegistration(code: string) {
        return new Promise((resolve, reject) => {
            if (!this._currentUser) {
                reject('_currentUser is undefined');
                return;
            }

            this._currentUser.confirmRegistration(code, true, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }

    /**
     * resendUserConfirmationCode
     * @returns
     */
    resendUserConfirmationCode() {
        return new Promise((resolve, reject) => {
            if (!this._currentUser) {
                reject('_currentUser is undefined');
                return;
            }

            this._currentUser.resendConfirmationCode((error, result) => {
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
     */
    authenticateUser(
        username: string,
        password: string | undefined,
        useCustomFlow: boolean = false,
    ): Promise<AuthenticateUserResult> {
        return new Promise((resolve, reject) => {
            if (!this._currentUser) {
                reject('_currentUser is undefined');
                return;
            }

            const authenticationDetail = new AuthenticationDetails({
                Username: username,
                Password: password,
            });

            useCustomFlow && this._currentUser.setAuthenticationFlowType('CUSTOM_AUTH');

            const authenticate = useCustomFlow ? this._currentUser.initiateAuth : this._currentUser.authenticateUser;

            authenticate.apply(this._currentUser, [
                authenticationDetail,
                new AuthenticationCallback(this._currentUser, resolve, reject),
            ]);
        });
    }

    /**
     * isSignUp
     * @param username
     * @returns
     */
    isSignUp(username: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!this._currentUser) {
                reject('_currentUser is undefined');
            }

            this.authenticateUser(username, undefined, true)
                .then((result) => {
                    resolve(true);
                })
                .catch((error) => {
                    if (error?.code === 'UserNotFoundException') {
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
     */
    completeNewPasswordChallenge(newPassword: string, requiredAttributes: any) {
        return new Promise((resolve, reject) => {
            if (!this._currentUser) {
                reject('_currentUser is undefined');
                return;
            }

            this._currentUser.completeNewPasswordChallenge(
                newPassword,
                requiredAttributes,
                new AuthenticationCallback(this._currentUser, resolve, reject),
            );
        });
    }

    /**
     * associateSoftwareToken
     * @returns
     */
    associateSoftwareToken() {
        return new Promise((resolve, reject) => {
            if (!this._currentUser) {
                reject('_currentUser is undefined');
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
     */
    verifySoftwareToken(challengeAnswer: string, friendlyDeviceName: string = '') {
        return new Promise((resolve, reject) => {
            if (!this._currentUser) {
                reject('_currentUser is undefined');
                return;
            }

            this._currentUser.verifySoftwareToken(
                challengeAnswer,
                friendlyDeviceName,
                new AuthenticationCallback(this._currentUser, resolve, reject),
            );
        });
    }

    /**
     * sendMfaSelectionAnswer
     * @param mfaType
     * @returns
     */
    sendMfaSelectionAnswer(mfaType: 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA') {
        return new Promise((resolve, reject) => {
            if (!this._currentUser) {
                reject('_currentUser is undefined');
                return;
            }

            this._currentUser.sendMFASelectionAnswer(
                mfaType,
                new AuthenticationCallback(this._currentUser, resolve, reject),
            );
        });
    }

    /**
     * sendMfaCode
     * @param code
     * @returns
     */
    sendMfaCode(code: string) {
        return new Promise((resolve, reject) => {
            if (!this._currentUser) {
                reject('_currentUser is undefined');
                return;
            }

            this._currentUser.sendMFACode(code, new AuthenticationCallback(this._currentUser, resolve, reject));
        });
    }

    /**
     * sendUserForgotPasswordRequest
     * @param username
     * @returns
     */
    sendUserForgotPasswordRequest() {
        return new Promise((resolve, reject) => {
            if (!this._currentUser) {
                reject('_currentUser is undefined');
                return;
            }

            this._currentUser.forgotPassword({
                onSuccess: (result) => {
                    resolve(result);
                },
                onFailure: (error) => {
                    reject(error);
                },
                inputVerificationCode: (result) => {
                    resolve(result);
                },
            });
        });
    }

    /**
     * sendCustomChallengeAnswer
     * @param username
     * @returns
     */
    sendCustomChallengeAnswer(signature: string) {
        return new Promise((resolve, reject) => {
            if (!this._currentUser) {
                reject('_currentUser is undefined');
                return;
            }

            this._currentUser.sendCustomChallengeAnswer(
                signature,
                new AuthenticationCallback(this._currentUser, resolve, reject),
            );
        });
    }

    /**
     * confirmUserForgotPasswordRequestWithNewPassword
     * @param username
     * @param code
     * @param newPassword
     * @returns
     */
    confirmUserForgotPasswordRequestWithNewPassword(code: string, newPassword: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this._currentUser) {
                reject('_currentUser is undefined');
                return;
            }

            this._currentUser.confirmPassword(code, newPassword, {
                onSuccess: (result) => {
                    resolve(result);
                },
                onFailure: (error) => {
                    reject(error);
                },
            });
        });
    }

    /**
     * signOutUser
     * @returns
     */
    signOutUser() {
        return new Promise((resolve, reject) => {
            if (!this._currentUser) {
                reject('_currentUser is undefined');
                return;
            }

            try {
                this._currentUser.signOut(() => {
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
     */
    globalSignOutUser(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this._currentUser) {
                reject('_currentUser is undefined');
                return;
            }

            this._currentUser.globalSignOut({
                onSuccess: (result) => {
                    resolve(result);
                },
                onFailure: (error) => {
                    reject(error);
                },
            });
        });
    }

    /**
     * refreshUserSession
     * @returns
     */
    refreshUserSession() {
        return new Promise((resolve, reject) => {
            if (!this._currentUser) {
                reject('_currentUser is undefined');
                return;
            }

            const user = this._currentUser;

            user.getSession((error: Error | null, result: CognitoUserSession | null) => {
                if (error || !result?.getRefreshToken()) {
                    reject(error);
                    return;
                }

                const refreshToken = result.getRefreshToken();

                user.refreshSession(refreshToken, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
            });
        });
    }
}

class AuthenticationCallback implements IAuthenticationCallback {
    private _user: CognitoUser;
    private _resolve: Function;
    private _reject: Function;

    constructor(user: CognitoUser, resolve: Function, reject: Function) {
        this._user = user;
        this._resolve = resolve;
        this._reject = reject;
    }

    onSuccess(session: CognitoUserSession, userConfirmationNecessary?: boolean) {
        this._resolve({
            user: this._user,
            session,
            userConfirmationNecessary,
        });
    }

    onFailure(error: any) {
        this._reject(error);
    }

    customChallenge(challengeParameters: any) {
        this._resolve({
            user: this._user,
            customChallange: {
                challengeParameters,
            },
        });
    }

    mfaRequired(challengeName: any, challengeParameters: any) {
        this._resolve({
            user: this._user,
            mfaRequired: {
                challengeName,
                challengeParameters,
            },
        });
    }

    totpRequired(challengeName: any, challengeParameters: any) {
        this._resolve({
            user: this._user,
            totpRequired: {
                challengeName,
                challengeParameters,
            },
        });
    }

    mfaSetup(challengeName: any, challengeParameters: any) {
        this._resolve({
            user: this._user,
            mfaSetup: {
                challengeName,
                challengeParameters,
            },
        });
    }

    newPasswordRequired(userAttributes: any, requiredAttributes: any) {
        this._resolve({
            user: this._user,
            newPasswordRequired: {
                userAttributes,
                requiredAttributes,
            },
        });
    }

    selectMFAType(challengeName: any, challengeParameters: any) {
        this._resolve({
            user: this._user,
            selectMfaType: {
                challengeName,
                challengeParameters,
            },
        });
    }

    associateSecretCode(secretCode: string) {
        this._resolve({
            user: this._user,
            associateSecretCode: {
                secretCode,
            },
        });
    }
}

export default new AuthService();
export { AuthService as AuthServiceClass };
export type { IAuthService };
