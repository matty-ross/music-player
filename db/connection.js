import sqlite from 'node:sqlite';

const database = new sqlite.DatabaseSync('./db.sqlite3');

export default database;
