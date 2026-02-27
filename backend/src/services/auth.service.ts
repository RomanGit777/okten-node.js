import { config } from "../configs/config.js";
import { emailConstants } from "../constants/templates.constants.js";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum.js";
import { EmailEnum } from "../enums/email.enum.js";
import { StatusCodesEnum } from "../enums/status-codes.enums.js";
import { ApiError } from "../errors/api.error.js";
import { IAuth } from "../interfaces/auth.interface.js";
import { ITokenPair } from "../interfaces/token.interface.js";
import { IUser, IUserCreateDTO } from "../interfaces/user.interface.js";
import { tokenRepository } from "../repositories/token.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import { emailService } from "./email.service.js";
import { passwordService } from "./password.service.js";
import { tokenService } from "./token.service.js";
import { userService } from "./user.service.js";

class AuthService {
    public async signUp(
        user: IUserCreateDTO,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        await userService.isEmailUnique(user.email);
        const password = await passwordService.hashedPassword(user.password);
        const newUser = await userService.create({ ...user, password });
        const tokens = tokenService.generateTokens({
            userId: newUser._id,
            role: newUser.role,
        });
        await tokenRepository.create({ ...tokens, _userId: newUser._id });
        const token = tokenService.generateActionToken(
            { userId: newUser._id, role: newUser.role },
            ActionTokenTypeEnum.ACTIVATE,
        );
        await emailService.sendEmail(
            newUser.email,
            emailConstants[EmailEnum.ACTIVATE],
            {
                name: newUser.name,
                url: `${config.FRONTEND_URL}/activate/${token}`,
            },
        );
        return { user: newUser, tokens };
    }
    public async signIn(
        dto: IAuth,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email);

        if (!user) {
            throw new ApiError(
                "Invalid email or password",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }

        const isValidPassword = await passwordService.comparePassword(
            dto.password,
            user.password,
        );

        if (!user.isActive) {
            throw new ApiError(
                "Account is not active",
                StatusCodesEnum.FORBIDDEN,
            );
        }
        if (!isValidPassword) {
            throw new ApiError(
                "Invalid email or password",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }

        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({ ...tokens, _userId: user._id });
        return {
            user,
            tokens,
        };
    }

    public async activate(token: string): Promise<IUser> {
        const { userId } = tokenService.verifyToken(
            token,
            ActionTokenTypeEnum.ACTIVATE,
        );
        return await userService.updateById(userId, { isActive: true });
    }

    public async recoveryPasswordRequest(user: IUser): Promise<void> {
        const token = tokenService.generateActionToken(
            { userId: user._id, role: user.role },
            ActionTokenTypeEnum.RECOVERY,
        );

        const url = `${config.FRONTEND_URL}/recovery/${token}`;

        await emailService.sendEmail(
            user.email,
            emailConstants[EmailEnum.RECOVERY],
            {
                url,
            },
        );
    }
    public async recoveryPassword(
        token: string,
        password: string,
    ): Promise<IUser> {
        const { userId } = tokenService.verifyToken(
            token,
            ActionTokenTypeEnum.RECOVERY,
        );
        const hashedPassword = await passwordService.hashedPassword(password);
        return await userService.updateById(userId, {
            password: hashedPassword,
        });
    }
}
export const authService = new AuthService();
