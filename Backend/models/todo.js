var connection = require('../db/connection');

function Todo() {
  this.get = function(res) {
    connection.acquire(function(err, con) {
      if (err) {
        res.send({ status: 1, message: 'Failed to acquire connection' });
      } else {
        con.query('SELECT * FROM todo_list', function(err, result) {
          con.release();
          if (err) {
            res.send({ status: 1, message: 'Failed to fetch tasks' });
          } else {
            res.send(result);
          }
        });
      }
    });
  };

  this.create = function(todo, res) {
    connection.acquire(function(err, con) {
      if (err) {
        res.send({ status: 1, message: 'Failed to acquire connection' });
      } else {
        con.query('INSERT INTO todo_list SET ?', todo, function(err, result) {
          con.release();
          if (err) {
            res.send({ status: 1, message: 'TODO creation failed' });
          } else {
            res.send({ status: 0, message: 'TODO created successfully' });
          }
        });
      }
    });
  };

  this.update = function(todo, res) {
    connection.acquire(function(err, con) {
      if (err) {
        res.send({ status: 1, message: 'Failed to acquire connection' });
      } else {
        con.query('UPDATE todo_list SET ? WHERE id = ?', [todo, todo.id], function(err, result) {
          con.release();
          if (err) {
            res.send({ status: 1, message: 'TODO update failed' });
          } else {
            res.send({ status: 0, message: 'TODO updated successfully' });
          }
        });
      }
    });
  };

  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      if (err) {
        res.send({ status: 1, message: 'Failed to acquire connection' });
      } else {
        con.query('DELETE FROM todo_list WHERE id = ?', [id], function(err, result) {
          con.release();
          if (err) {
            res.send({ status: 1, message: 'Failed to delete' });
          } else {
            res.send({ status: 0, message: 'Deleted successfully' });
          }
        });
      }
    });
  };
}

module.exports = new Todo();
