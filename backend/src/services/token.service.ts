import jwt from "jsonwebtoken";

import { config } from "../configs/config.js";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum.js";
import { StatusCodesEnum } from "../enums/status-codes.enums.js";
import { TokenTypeEnum } from "../enums/token-type.enum.js";
import { ApiError } from "../errors/api.error.js";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface.js";
import { tokenRepository } from "../repositories/token.repository.js";

class TokenService {
    // generate jwt tokens
    public generateTokens(payload: ITokenPayload): ITokenPair {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
            expiresIn: config.JWT_ACCESS_LIFETIME,
        });
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_LIFETIME,
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    public verifyToken(
        //verify token, decode user data from it
        token: string,
        type: TokenTypeEnum | ActionTokenTypeEnum,
    ): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case TokenTypeEnum.ACCESS:
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case TokenTypeEnum.REFRESH:
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                case ActionTokenTypeEnum.ACTIVATE:
                    secret = config.JWT_ACTIVATE_SECRET;
                    break;
                case ActionTokenTypeEnum.RECOVERY:
                    secret = config.JWT_RECOVERY_SECRET;
                    break;
                default:
                    throw new ApiError(
                        "Invalid token type",
                        StatusCodesEnum.BED_REQUEST,
                    );
            }
            return jwt.verify(token, secret) as ITokenPayload;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            throw new ApiError("Invalid token", StatusCodesEnum.UNAUTHORIZED);
        }
    }

    public generateActionToken(
        payload: ITokenPayload,
        type: ActionTokenTypeEnum,
    ): string {
        let secret: string;
        let expiresIn: any;

        switch (type) {
            case ActionTokenTypeEnum.ACTIVATE:
                secret = config.JWT_ACTIVATE_SECRET;
                expiresIn = config.JWT_ACTIVATE_LIFETIME;
                break;
            case ActionTokenTypeEnum.RECOVERY:
                secret = config.JWT_RECOVERY_SECRET;
                expiresIn = config.JWT_RECOVERY_LIFETIME;
                break;
            default:
                throw new ApiError("Invalid action token type", 400);
        }
        return jwt.sign(payload, secret, { expiresIn });
    }

    // 1️⃣ Receive token string
    // 2️⃣ Decide which DB field to check (accessToken or refreshToken)
    // 3️⃣ Query DB
    // 4️⃣ Return true if found, false otherwise
    public async isTokenExists(
        token: string,
        type: TokenTypeEnum,
    ): Promise<boolean> {
        const ITokenPromise = await tokenRepository.findByParams({
            [type]: token,
        });
        return !!ITokenPromise;
    }
}
export const tokenService = new TokenService();
