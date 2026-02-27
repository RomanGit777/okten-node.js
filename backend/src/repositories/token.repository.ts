import { IToken, ITokenModel } from "../interfaces/token.interface.js";
import { Token } from "../models/token.model.js";

class TokenRepository {
    public create(dto: ITokenModel): Promise<IToken> {
        return Token.create(dto);
    }

    public findByParams(params: Partial<IToken>): Promise<IToken> {
        return Token.findOne(params);
    }
}
export const tokenRepository = new TokenRepository();
