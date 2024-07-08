var mysql = require('mysql');

function Connection() {
  this.pool = null;

  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: 'localhost',
      user: 'root',
      password: 'Password', // Replace with your actual MySQL password
      database: 'Databasename'
    });
  };

  this.acquire = function(callback) {
    if (this.pool) {
      this.pool.getConnection(function(err, connection) {
        if (err) {
          console.error('Error acquiring connection:', err);
          callback(err, null);
        } else {
          callback(null, connection);
        }
      });
    } else {
      const poolError = new Error('Connection pool is not initialized.');
      console.error(poolError);
      callback(poolError, null);
    }
  };
}

module.exports = new Connection();
