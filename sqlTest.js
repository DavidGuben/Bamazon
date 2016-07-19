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
  var query = 'SELECT * FROM Products';
  connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
          console.log(res[i]);
      }
runSearch();
  })
};


var multiSearch = function() {
    var query = 'SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1';
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].artist);
        }
        runSearch();
    })
};
