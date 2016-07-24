
	//	* List a set of menu options: 1) View Products for Sale 2) View Low Inventory 3) Add to Inventory 4) Add New Product

	//	* If a manager selectis option 1 it should list all of the products available for sale: the item IDs, names, prices, and quantities.

	//	* If a manager selects option 2 it should list all items for which the quantity available in stores is less than 5.

	//	* If a manager selects option 3 it should provide the manager with the ability to "add more" of any item currently in the store.

	//	* If a manager selects option 4 it should provide the manager with the ability to add a completely new product to the store.
  // Required npm packages for this project
  var mysql = require('mysql');
  var inquirer = require('inquirer');

  // Create a SQl connection via node using server and daatabase credentials created in mySQL
  var connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "password",
      database: "Bamazon"
  })

  // Connect to the database and create a function that runs the "displayProducts()" function which contains all the products organized in a table
  connection.connect(function(err) {
      if (err) throw err;
      start();
  })

  var start = function() {
      inquirer.prompt({
          name: "Welcome",
          type: "rawlist",
          message: "Welcome Manager, What would you like to do?",
          choices: [
            "View Products For Sale",
            "View Low Inventory",
            "Add To Inventory",
            "Add New Product"
            ]
      }).then(function(answer) {
          switch(answer.Welcome) {
              case 'View Products For Sale':
                  viewProducts();
              break;

              case 'View Low Inventory':
                  viewLowInv();
              break;

              case 'Add To Inventory':
                  addToInv();
              break;

              case 'Add New Product':
                  addNewProduct();
              break;
          }
  });
}

var viewProducts = function() {
  var query = 'SELECT * FROM Products';
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].itemID + " || Product: " + res[i].productName + " || Department: " + res[i].productDepartment + " || Price: " + res[i].price + " || Stock: " + res[i].stockQuantity);
      }
      start();
    })
};

var viewLowInv = function() {}

var addToInv = function() {}

var addNewProduct = function() {}
