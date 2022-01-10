const { Client } = require('pg');

async function executeQuery(query, values) {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'node-deno',
    password: 'Encantos2021!!',
    port: 5432,
  });
  try {
    console.time('executeQuery');
    await client.connect();
    const { rows, rowCount } = await client.query(query, values);
    await client.end();
    console.timeEnd('executeQuery');
    return { rows, rowCount };
  } catch (err) {
    console.log('error running query:', err);
    await client.end();
    console.timeEnd('executeQuery');
    throw {
      errorMessage: 'Oops, something went wrong.',
    };
  }
}

module.exports = {
  executeQuery,
};
