import "dotenv/config";
import Bcrypt from "bcrypt";

export class HashService{
    static async hashPassword(password){
        try {
            return await Bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
        } catch (error) {
            throw error;
        }
    }

    static async comparePassword(password, hash) {
        try {
            return await Bcrypt.compare(password, hash);
        } catch (error) {
            throw error;
        }
    }
}
