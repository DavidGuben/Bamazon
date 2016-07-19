USE Bamazon;
CREATE TABLE Products (
    -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
    itemID INTEGER(11) AUTO_INCREMENT NOT NULL,
	productName VARCHAR(30) NOT NULL,
    departmentName VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NULL,
    stockQuantity INT(15),
    -- Sets id as this table's primary key which means all data contained within it will be unique --
    PRIMARY KEY (itemID)
);


