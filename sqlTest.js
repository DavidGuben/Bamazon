var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
});


var displayProducts = function() {
  var query = 'SELECT * FROM Bamazon';
  connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
          console.log(res[i]);
      }

  })
};
