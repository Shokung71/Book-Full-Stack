// File config.js
var config = {};
config.mysql = {};
config.mysql.host = 'localhost';
config.mysql.port = 3306;
config.mysql.database = 'bw';
config.mysql.user = 'root';
config.mysql.password = 'root';

config.express = {};
config.express.port = 3001;
module.exports = config;