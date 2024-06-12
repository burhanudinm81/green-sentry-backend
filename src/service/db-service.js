import "dotenv/config";
import pg from "pg";

const { Client } = pg;

export class DBService {
    static async getAllActions() {
        const client = new Client({
            user: process.env.USER,
            password: process.env.PGPASSWORD,
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            database: process.env.PGDATABASE,
        });

        try {
            await client.connect();

            const queryResult = await client.query('SELECT * FROM action_list');
            const { rowCount: totalResult, rows: result } = queryResult;
            return { totalResult, result };
        } catch (error) {
            console.error(error);
        } finally {
            await client.end();
        }
    }

    static async saveUserData(user) {
        const client = new Client({
            user: process.env.USER,
            password: process.env.PGPASSWORD,
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            database: process.env.PGDATABASE,
        });

        try {
            await client.connect();

            const {
                id,
                firstName,
                lastName,
                email,
                hashedPassword
            } = user;

            const queryText = `INSERT INTO users(id, first_name, last_name, email, hashed_password) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const queryValues = [id, firstName, lastName, email, hashedPassword];

            const queryResult = await client.query(queryText, queryValues);
            const result = queryResult.rows[0];
            return result;
        } catch (error) {
            console.error(error);
        } finally {
            await client.end();
        }
    }

    static async findEmail(email) {
        const client = new Client({
            user: process.env.USER,
            password: process.env.PGPASSWORD,
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            database: process.env.PGDATABASE,
        });

        try {
            await client.connect();

            const values = [email];
            const queryResult = await client.query(`SELECT * FROM users WHERE email = $1`, values);
            const result = queryResult.rows[0];
            return result;
        } catch (error) {
            console.error(error);
        } finally {
            await client.end();
        }
    }

    static async findIdAndEmail(id, email) {
        const client = new Client({
            user: process.env.USER,
            password: process.env.PGPASSWORD,
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            database: process.env.PGDATABASE,
        });

        try {
            await client.connect();

            const values = [id, email];
            const queryText = 'SELECT * FROM users WHERE id = $1 AND email = $2';
            const queryResult = await client.query(queryText, values);
            const result = queryResult.rows[0];
            return result;
        } catch (error) {
            console.error(error);
        } finally {
            await client.end();
        }
    }
};

DBService.findIdAndEmail('vYQylzzPKCTa5nt2V82hQ', 'genzow1@mail.com');