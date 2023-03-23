import mysql from 'mysql';

//EXPORT DATABASE CONNECTION
export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Wilson160104*',
  database: 'blog',
});
