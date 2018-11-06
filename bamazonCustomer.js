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

connection.connect(function (err) {
  if (err) throw err
  start()
})

let productsList = []

// will display all products available
function start() {
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    console.log('Current Inventory: \n');
    for (let i = 0; i < res.length; i++) {
      console.log(
        'Item ID: ' + res[i].item_id + '\n' +
        'Product Name: ' + res[i].product_name + '\n' +
        'Department: ' + res[i].department_name + '\n' +
        'Price: ' + res[i].price + '\n' +
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
      type: 'input',
      name: 'quantity',
      message: 'Enter quantity'
    }
  ])
  .then(function(answer) {
    // used regex to grab product id
    let id = answer.choice.match(/^Item ID: (\d+)/)[1]
    userOrder(id, answer.quantity)
  })
}

function userOrder(id, quantity) {
  // queries the database off of id
  connection.query('SELECT * FROM products WHERE ?', { item_id: id }, function (err, res) {
    if (err) throw err
    if (quantity > res[0].stock_quantity) {
      console.log('Insufficient quantity!')
      startOver()
    } else {
      let newStock = res[0].stock_quantity - quantity
      //updates stock after user places order
      connection.query('UPDATE products SET ? WHERE ?', [{ stock_quantity: newStock }, { item_id: id }], function (err, res) {
        if (err) throw err
        console.log('Order placed!')
        startOver()
      })
    }
  })
}

function startOver() {
  inq.prompt({
      name: 'restart',
      type: 'list',
      message: 'Would you start over?',
      choices: ['Yes', 'No']
    })
    .then(function(answer) {
      if (answer.restart === 'Yes') {
        start()
      } else {
        process.exit()
      }
    })
}