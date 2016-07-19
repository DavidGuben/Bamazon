
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
    database: "Bamazon"
})

// Connect to the database and create a function that runs the "runSearch()" function which contains all the prompt sequences
connection.connect(function(err) {
    if (err) throw err;
    runSearch();
})

// Main function which is where the user starts
var runSearch = function() {
  displayProducts();
    inquirer.prompt({
      // Name of this prompt
        name: "action",
      // Type of prompt
        type: "list",
      // Message the prompt asks
        message: "What would you like to do?",
      // An array of choinces that the user can ask
        choices: ["Find songs by artist", "Find all artists who appear more than once", "Find data within a specific range", "Search for a specific song"]
      // When a user chooses an option "then()" initiate a switch case that contains functions defined later on that relates to the users choice
    }).then(function(answer) {
        switch(answer.action) {
            case 'Find songs by artist':
                artistSearch();
            break;

            case 'Find all artists who appear more than once':
                multiSearch();
            break;

            case 'Find data within a specific range':
                rangeSearch();
            break;

            case 'Search for a specific song':
                songSearch();
            break;
        }
    })
};

var displayProducts = function() {
  var query = 'SELECT * FROM Bamazon WHERE ?'
  connection.query(query, {artist: answer.artist}, function(err, res) {
      for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
      }
      runSearch();
}

var artistSearch = function() {
    inquirer.prompt({
        name: "artist",
        type: "input",
        message: "What artist would you like to search for?"
    }).then(function(answer) {
        var query = 'SELECT position, song, year FROM top5000 WHERE ?'
        connection.query(query, {artist: answer.artist}, function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
            }
            runSearch();
        })
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

var rangeSearch = function() {
    inquirer.prompt([{
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(answer) {
        var query = 'SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?';
        connection.query(query, [answer.start, answer.end], function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Artist: " + res[i].artist + " || Year: " + res[i].year);
            }
            runSearch();
        })
    })
};

var songSearch = function() {
    inquirer.prompt({
        name: "song",
        type: "input",
        message: "What song would you like to look for?"
    }).then(function(answer) {
        console.log(answer.song)
        connection.query('SELECT * FROM top5000 WHERE ?', {song: answer.song}, function(err, res) {
            console.log("Position: " + res[0].position + " || Song: " + res[0].song + " || Artist: " + res[0].artist + " || Year: " + res[0].year);
            runSearch();
        })
    })
};
