import {
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    CognitoUserSession,
    ICognitoUserPoolData,
    ISignUpResult,
} from 'amazon-cognito-identity-js';

export enum PoolTypeEnum {
    CUSTODIAL = 'custodial',
    CONFIDENT = 'confident',
}

class UserPoolService {
    private _userPool: CognitoUserPool;
    private _confidentUserPool: CognitoUserPool;

    private CONFIDENT_POOL_DATA: ICognitoUserPoolData = {
        UserPoolId: process.env.NEXT_PUBLIC_CONFIDENT_IDENTITY_POOL_ID || '',
        ClientId: process.env.NEXT_PUBLIC_CONFIDENT_CLIENT_ID || '',
    };

    private CUSTODIAL_POOL_DATA: ICognitoUserPoolData = {
        UserPoolId: process.env.NEXT_PUBLIC_CUSTODIAL_IDENTITY_POOL_ID || '',
        ClientId: process.env.NEXT_PUBLIC_CUSTODIAL_CLIENT_ID || '',
    };

    constructor() {
        this._userPool = new CognitoUserPool(this.CUSTODIAL_POOL_DATA);
        this._confidentUserPool = new CognitoUserPool(this.CONFIDENT_POOL_DATA);
    }

    get userPool() {
        return this._userPool;
    }

    get confidentUserPool() {
        return this._confidentUserPool;
    }

    createUser(username: string, poolType: PoolTypeEnum = PoolTypeEnum.CUSTODIAL): CognitoUser {
        let user = new CognitoUser({
            Username: username,
            Pool: poolType == PoolTypeEnum.CUSTODIAL ? this._userPool : this._confidentUserPool,
        });

        return user;
    }

    registerUser(
        username: string,
        password: string,
        attributes: Array<{ name: string; value: string }> = [],
        poolType: PoolTypeEnum = PoolTypeEnum.CUSTODIAL,
    ): Promise<ISignUpResult | undefined> {
        return new Promise((resolve, reject) => {
            const userAttributes: Array<CognitoUserAttribute> = [];

            for (let attribute of attributes) {
                userAttributes.push(
                    new CognitoUserAttribute({
                        Name: attribute.name,
                        Value: attribute.value,
                    }),
                );
            }

            const userPool = poolType == PoolTypeEnum.CUSTODIAL ? this._userPool : this._confidentUserPool;
            userPool.signUp(username, password, userAttributes, [], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }

    syncUserPoolStorage(poolType: PoolTypeEnum = PoolTypeEnum.CUSTODIAL) {
        return new Promise((resolve, reject) => {
            const userPool = poolType == PoolTypeEnum.CUSTODIAL ? this._userPool : this._confidentUserPool;
            // @ts-ignore
            userPool.storage.sync((error: Error | undefined, result: any) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }

    loadUserFromStorage(poolType: PoolTypeEnum = PoolTypeEnum.CUSTODIAL): Promise<CognitoUser | null> {
        return new Promise((resolve, reject) => {
            const userPool = poolType == PoolTypeEnum.CUSTODIAL ? this._userPool : this._confidentUserPool;
            let user = userPool.getCurrentUser();

            if (!user) {
                resolve(null);
                return;
            }

            user.getSession((error: Error | null, session: CognitoUserSession | null) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(user);
            });
        });
    }

    deleteUser(user: CognitoUser) {
        return new Promise((resolve, reject) => {
            user.deleteUser((error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }
}

export default new UserPoolService();
export { UserPoolService as UserPoolServiceClass };
