module.exports = {
  hosts: {
    deno: 'http://localhost:7700',
    // node: 'http://localhost:3000',
  },
  db: {
    user: 'postgres',
    host: 'localhost',
    database: 'node-deno-reports',
    password: 'Encantos2021!!',
    port: 5432,
  },
  tests: {
    rounds: [500, 1000, 3000, 5000, 10000],
    concurrency: 10
  },
};
