const config = require('./config');
const db = require('./db');
const addBookFlow = require('./flows/add-book');
const execFlow = require('./flows/exec');
const { v4 } = require("uuid");

const runTests = async ({ rounds = [100], concurrency = 5 }) => {
  const uuid = v4();
  console.time('Run Tests - Deno vs NodeJS');
  try {
    const { hosts } = config;
    const hostList = Object.keys(hosts);

    for (let counter = 0; counter < hostList.length; counter += 1) {
      // run all rounds defined in config
      for (let roundCounter = 0; roundCounter < rounds.length; roundCounter += 1) {
        for (let i = 0; i < rounds[roundCounter]; i += 1) {
          const startedAt = new Date().toISOString();
          let status = 'Success';
  
          // ISOLATE IN TRY CATCH THE EXECUTION TO STORE ERRORS TOO
          try {
            const parallelExec = [];
  
            for (let j = 0; j < concurrency; j += 1) {
              parallelExec.push(execFlow(addBookFlow, hosts[hostList[counter]]));
            }
  
            // NOTE: using Promise.all to crash and set the status to ERROR
            await Promise.all(parallelExec);
          } catch (error) {
            console.error(`Error executing round ${i + 1}`, error);
            status = 'Error';
          }
  
          console.log(`Executed round ${i+1} of ${ rounds[roundCounter]} of type ${hostList[counter]}`);
          // TODO: should save currentROUND and totalROUNDS
          // SAVES NEW ROW TO REPORT TB
          db.executeQuery(`INSERT INTO 
            report (exec_uid, round, concurrency, app_type, status, started_at, ended_at)
            VALUES ($1::uuid, $2::integer, $3::integer, $4::text, $5::text, $6::timestamp, $7::timestamp);`,
            [uuid, rounds[roundCounter], concurrency, hostList[counter], status, startedAt, new Date().toISOString()]);
        }
      }
    }
  } catch (error) {
    console.error('Failed to run tests', error);
    process.exit();
  }
  console.timeEnd('Run Tests - Deno vs NodeJS');
};

runTests(config.tests);