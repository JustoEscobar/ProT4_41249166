import mysqlConnection from "mysql2/promise";

const properties = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'prot4_41249166'
};

export const pool = mysqlConnection.createPool(properties);