const mysql = require('mysql')
const inq = require('inquirer')

// creates connection 
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'rootroot',
  database: 'bamazon_db'
})

connection.connect( function (err) {
  if (err) throw err
  start()
})

let productsList = []

// will display all products available
function start() {
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw err;
    console.log('Current Inventory: \n');
    for (let i = 0; i < res.length; i++) {
      console.log(
        'Item ID: ' + res[i].item_id + '\n' +
        'Product Name: ' + res[i].product_name + '\n' +
        'Department: ' + res[i].department_name + '\n' +
        'Price: $' + res[i].price + '\n' +
        '---------------------------------------------\n'
      )
      // pushes product id and name into array so they can display
      productsList.push('Item ID: ' + res[i].item_id + ", " + res[i].product_name)
    }
    purchase(productsList)
  })
}

function purchase(productsList) {
  // will ask user what they want to buy
  inq.prompt([
    {
      type: 'list',
      message: 'What would you like to purchase?',
      name: 'choice',
      choices: productsList
    },
    // will ask user how many they want
    {
      name: 'quantity',
      type: 'input',
      message: 'Enter quantity'
    }
  ])
  .then(answer => {
  })
}