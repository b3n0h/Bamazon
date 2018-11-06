const mysql = require('mysql')
const inq = require('inquirer')

// creates connection 
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "bamazon_db"
})

connection.connect(function (err) {
  if (err) throw err
})

let productsList = []

// will display all products available
function start () {
  connection.query('SELECT * FROM products', (err, res) => {
    if (err) throw err
    console.log('Current inventory: \n')
    for (let i = 0; i < res.length; i++)
    console.log(
      'Item ID: ' + res[i].item_id + '\n' +
      'Product name: ' + res[i].product_name + '\n' +
      'Department: ' + res[i].department_name + '\n' +
      'Price: ' + res[i].price + '\n' + 
      'Quantity: ' + res[i].stock_quantity + '\n'
    )
  })
}

function purchase() {
  inq.prompt([
    {
      type: 'list',
      message: 'What would you like to purchase?',
      name: 'choice',
      choices: 
    }
}