const express = require('express')
const app = express()
var faker = require('faker')

var products = new Array();

//testing faker

app.get('/', function(req, res) {
    for (var i = 0; i < 10; i++) {
        var randomProduct = faker.commerce.productName();
        var randomPrice = faker.commerce.price();
        products.push(randomProduct + " - " + randomPrice)
    }
    res.send(products);
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})