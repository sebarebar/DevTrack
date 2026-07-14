import pg from 'pg';
const { Pool } = pg;
const pool = new Pool();

console.log('starting async query');
const result = await pool.query('SELECT NOW()');
console.log('async query finished');

console.log('starting callback query');
pool.query('SELECT NOW()', (err, res) => {
  console.log('callback query finished');
});

console.log('calling end');
await pool.end();
console.log('pool has drained');
