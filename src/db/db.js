import "dotenv/config";
import pg from "pg";

const { Client } = pg;
const client = new Client({
    user: process.env.USER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
});

export async function getAllActions() {
    await client.connect();

    let queryResult;

    try {
        queryResult = await client.query('SELECT * FROM action_list');
        const {rowCount : totalResult, rows : result} = queryResult;
        return {totalResult, result};
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
}
