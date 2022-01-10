import { Client } from "https://deno.land/x/postgres/mod.ts";

// You can use the connection interface to set the connection properties
const config = {
  database: "deno-node",
  hostname: "localhost",
  password: "Encantos2021!!",
  port: 5432,
  user: "postgres"
};

export async function executeQuery(query: string, args: Array<any>) {
  const client = new Client(config);
  let result;

  try {
    const queryResult = await client.queryArray(query, ...args);
    console.log('queryResult', queryResult);
    result = {
      rows: queryResult?.rows || [],
      rowCount: queryResult?.rowCount || 0,
    };
  } catch (err) {
    console.error('Failed to execute the query', err);
    throw err;
  } finally {
    client.end();
  }


  return result;
}
