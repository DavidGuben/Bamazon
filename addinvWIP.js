var query = 'SELECT * FROM Products WHERE itemID=' + answer.product;
connection.query(query, function(err, res) {
  for (var i = 0; i < res.length; i++) {
  connection.query("INSERT INTO Products SET ?", {
      stockQuantity: res[i].stockQuantity + answer.StockQuantity,
  }, function(err, res) {
      viewProducts();
      console.log("Your product was added successfully!");
      start();
  });
}
})
