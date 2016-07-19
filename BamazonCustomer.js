
	//* First Display All of the Items available for sale. This initial display, should include the ids, names, and prices of products for sale

  // * Users should then be prompted with two messages. The first message should ask them the ID of the product they would like to buy. The second message should ask them how many of the product they would like to buy.

	// * Once the customer has placed the order: Your application should...

	  // *
		// * Check if your store has enough quantity of the product to meet the customer's request.
    //   If not, you should respond to the user by saying: "Insufficient quantity" and prevent the order from going through.
    // * If your store DOES have enough of the product to meet the customer's request, you should fulfill their order.
    //   This means that you should show them the total cost of their puchase. Then update the SQL database to reflect the remaining quantity.


var mysql = require('mysql');
var inquirer = require('inquirer');

// Create a SQl connection via node using server and daatabase credentials created in mySQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
})

// Connect to the database and create a function that runs the "runSearch()" function which contains all the prompt sequences
connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
})



var displayProducts = function() {
  var query = 'SELECT * FROM Products'
  connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
          console.log("Item ID: " + res[i].itemID + " || Product: " + res[i].productName + " || Department: " + res[i].productDepartment + " || Price: " + res[i].price + " || Stock: " + res[i].stockQuantity);
      }
    })
};
