require ('dotenv/config');
const jwt = ("jsonwebtoken");

class JWTService {
    static issue(options) {
        const { payload, expiresIn } = options;
        return jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn
        });
    }
}

module.exports = JWTService;