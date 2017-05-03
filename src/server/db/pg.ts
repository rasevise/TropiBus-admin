import * as pg from 'pg';


var client:any;
var pool:any;

/**
 * Init PG database.
 */
export function Init() {

  client = {
    user: 'wymxggcwikpwav', //env var: PGUSER
    database: 'dd0arpc8l5k2be', //env var: PGDATABASE
    password: '203bccfd54e249de1659cdcb1d99cac0f82a14eb9246b51bbef0c1598c46089d', //env var: PGPASSWORD
    host: 'ec2-54-83-205-71.compute-1.amazonaws.com', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    ssl: true,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  }; 

  pool = new pg.Pool(client);
  //this initializes a connection pool
  //it will keep idle connections open for 30 seconds
  //and set a limit of maximum 10 idle clients
  console.log('connected to database: ');

  pool.on('error', function (err:any, client:any) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  // console.error('idle client error', err.message, err.stack);
  console.error('idle client error', err.stack);
});

}

//export the query method for passing queries to the pool
export function query (text:any, values:any, callback:any) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
export function connect (callback:any) {
  return pool.connect(callback);
}

