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

// View products in the store
var viewProducts = function() {
  var query = 'SELECT * FROM Products';
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].itemID + " || Product: " + res[i].productName + " || Department: " + res[i].departmentName + " || Price: " + res[i].price + " || Stock: " + res[i].stockQuantity);
      }
      start();
    })
};

// View the 5 items with the lowest inventory
var viewLowInv = function() {
  var query = 'SELECT * FROM Products ORDER BY stockQuantity ASC LIMIT 5';
  connection.query(query, function(err, res){
    console.log("Low Inventory List:");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].productName + ": " + res[i].stockQuantity);
    }
    start();
  })
};

// Add product quantity to inventory
var addToInv = function() {
  inquirer.prompt([{
      name: "product",
      type: "input",
      message: "What is the ID of the product you would like to add to the store?"
  }, {
      name: "StockQuantity",
      type: "input",
      message: "How much would you like to add to the store?",
      validate: function(value) {
          if (isNaN(value) == false) {
              return true;
          } else {
              return false;
          }
      }
  }]).then(function(answer) {
        var query = 'SELECT * FROM Products WHERE itemID=' + answer.product;
        connection.query(query, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            var addInvMath = parseInt(res[i].stockQuantity) + parseInt(answer.StockQuantity);
            connection.query("UPDATE Products SET ? WHERE itemID="+ answer.product, {
              stockQuantity: addInvMath,
            });
            // If statement checking if 1 product, multiple products or no product added
            if(answer.StockQuantity == 1) {
              console.log("YOU DIDN'T ADD ANY PRODUCT");
            } else if (answer.StockQuantity == 0) {
              console.log("SUCCESSFULY ADDDED " + answer.StockQuantity + " " + res[i].productName + " TO PRODUCT INVENTORY.");
            } else {
              console.log("SUCCESSFULY ADDDED " + answer.StockQuantity + " " + res[i].productName + "s TO PRODUCT INVENTORY.");
            }
          }
          start();
        })
      })
};

var addNewProduct = function() {
  inquirer.prompt([{
    name: "addProduct",
    type: "input",
    message: "What is the name of the product you would like to add?"
  }, {
    name: "addQuantity",
    type: "input",
    message: "How much of this product would you like to add?"
  }, {
    name: "addDepartment",
    type: "input",
    message: "What department will this product be located in?"
  }, {
    name: "addPrice",
    type: "input",
    message: "How much will it cost?"
  }]).then(function(answer) {
        var query = 'SELECT * FROM Products';
        connection.query("INSERT INTO Products SET ?", { productName: answer.addProduct, stockQuantity: answer.addQuantity, departmentName: answer.addDepartment, price: answer.addPrice });
        console.log("SUCCESSFULLY ADDED PRODUCT INTO STORE");
  })
  start();
};
