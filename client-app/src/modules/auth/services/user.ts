import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';

enum UserAttributeName {
    FIREBASE_TOKEN = 'custom:firebase_token',
    AFFILIATION_ID = 'custom:affiliation_id',
    AFFILIATION_PROGRRAM = 'custom:affiliation_program',
    EMAIL = 'email',
    SUB = 'sub',
    PHONE = 'custom:mobile_phone',
    PIN_CODE = 'custom:pin_code',
    PREPAID_PERCENT = 'custom:prepaid_percent',
}

type UserAttribute = {
    name: string;
    value: string;
};

interface IUserService {
    user?: CognitoUser;
    getUserAttributes(): Promise<any>;
    getUserAttributeVerificationCode(attributeName: string): Promise<any>;
    verifyUserAttribute(attributeName: string, code: string): Promise<any>;
    deleteUserAttributes(attributeNames: Array<string>): Promise<any>;
    updateUserAttributes(attributes: Array<UserAttribute>): Promise<any>;
    enableUserMFA(): Promise<any>;
    disableUserMFA(): Promise<any>;
    changeUserPassword(oldPassword: string, newPassword: string): Promise<any>;
    getUserData(): Promise<any>;
}

class UserService implements IUserService {
    _user?: CognitoUser;

    get user() {
        return this._user;
    }

    set user(user: CognitoUser | undefined) {
        this._user = user;
    }

    /**
     * getUserAttributes
     * @returns
     */
    getUserAttributes() {
        return new Promise((resolve, reject) => {
            if (!this._user) {
                reject('_user is undefined');
                return;
            }

            this._user.getUserAttributes((error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                const userAttributes = result?.map((attribute) => {
                    const { Name, Value } = attribute;
                    return {
                        name: Name,
                        value: Value,
                    };
                });

                resolve(userAttributes);
            });
        });
    }

    /**
     * getUserAttributeVerificationCode
     * @param attributeName
     * @returns
     */
    getUserAttributeVerificationCode(attributeName: string) {
        return new Promise((resolve, reject) => {
            if (!this._user) {
                reject('_user is undefined');
                return;
            }

            this._user.getAttributeVerificationCode(attributeName, {
                onSuccess: (result) => {
                    resolve(result);
                },
                onFailure: (error) => {
                    reject(error);
                },
                inputVerificationCode: () => {
                    resolve(null);
                },
            });
        });
    }

    /**
     * verifyUserAttribute
     * @param attributeName
     * @param code
     * @returns
     */
    verifyUserAttribute(attributeName: string, code: string) {
        return new Promise((resolve, reject) => {
            if (!this._user) {
                reject('_user is undefined');
                return;
            }

            this._user.verifyAttribute(attributeName, code, {
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
     * deleteUserAttributes
     * @param attributeNames
     * @returns
     */
    deleteUserAttributes(attributeNames: Array<string>) {
        return new Promise((resolve, reject) => {
            if (!this._user) {
                reject('_user is undefined');
                return;
            }

            this._user.deleteAttributes(attributeNames, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }

    /**
     * updateUserAttributes
     * @param attributes
     * @returns
     */
    updateUserAttributes(attributes: Array<{ name: string; value: string }>) {
        return new Promise((resolve, reject) => {
            if (!this._user) {
                reject('_user is undefined');
                return;
            }

            const userAttributes: Array<CognitoUserAttribute> = [];

            for (let attribute of attributes) {
                userAttributes.push(
                    new CognitoUserAttribute({
                        Name: attribute.name,
                        Value: attribute.value,
                    }),
                );
            }

            this._user.updateAttributes(userAttributes, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }

    /**
     * enableUserMFA
     * @returns
     */
    enableUserMFA() {
        return new Promise((resolve, reject) => {
            if (!this._user) {
                reject('_user is undefined');
                return;
            }

            this._user.enableMFA((error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }

    /**
     * disableUserMFA
     * @returns
     */
    disableUserMFA() {
        return new Promise((resolve, reject) => {
            if (!this._user) {
                reject('_user is undefined');
                return;
            }

            this._user.disableMFA((error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }

    /**
     * changeUserPassword
     * @param oldPassword
     * @param newPassword
     * @returns
     */
    changeUserPassword(oldPassword: string, newPassword: string) {
        return new Promise((resolve, reject) => {
            if (!this._user) {
                reject('_user is undefined');
                return;
            }

            this._user.changePassword(oldPassword, newPassword, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }

    /**
     * getUserData
     * @returns
     */
    getUserData() {
        return new Promise((resolve, reject) => {
            if (!this._user) {
                reject('_user is undefined');
                return;
            }

            this._user.getUserData((error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }

    /**
     * _transformUserAttributeToCognitoUserAttribute
     * @param userAttribute
     * @returns
     */
    _transformUserAttributeToCognitoUserAttribute(userAttribute: UserAttribute) {
        return new CognitoUserAttribute({
            Name: userAttribute.name,
            Value: userAttribute.value,
        });
    }
}

export default new UserService();
export type { IUserService };
export { UserAttributeName };
