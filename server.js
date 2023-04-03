const express = require('express')
const { futimesSync, ftruncateSync } = require('fs')
const path = require('path')
const auth = require("./auth")
const body_parser = require('body-parser')
let app = express()
app.use(body_parser.urlencoded({extended: false}))

app.get('/', function(req, res){
    res.render(path.join(__dirname, "/template/login.hbs"))
})
app.post('/', function(req,res){
    auth.isAuth(req.body.email, req.body.password).then(()=>{
        console.log("user is authorised")
        res.redirect("/shopping")
    }).catch(()=>{
        console.log("user not authorised")
        res.render(path.join(__dirname,"/template/404.hbs"))
    })
})
app.get('/register', function(req,res){
    res.render(path.join(__dirname, "/template/register.hbs"))
})
app.post('/register', function(req, res){
    auth.registerUser(req.body)
    res.render(path.join(__dirname, "/template/login.hbs"))
})
app.get("/logout", function(req, res){
    auth.logOut();
    res.redirect("/")
})
app.get('/shopping', function(req,res){
    
    if(auth.userLogin() == true){
        data = auth.getShoppingData()
    res.render(path.join(__dirname,"/template/shopping.hbs"), {data : data})
    }else{
        res.render(path.join(__dirname,"/template/404.hbs"))
    }
})
app.get("/addItem/:id", function(req,res){
    let idOfProduct = req.params.id
    console.log(idOfProduct)
    auth.addItem(idOfProduct)
    res.redirect("/shopping") 
})
app.get("/remove/:id", function(req,res){
    let idOfProduct = req.params.id
    console.log(idOfProduct)
    auth.removeItem(idOfProduct)
    res.redirect("/cart") 
})
app.get("/cart" ,function(req,res){
    data = auth.getcartItems()
    price = auth.price()
    res.render(path.join(__dirname,"/template/cart.hbs"), {cartItems: data, price: price})
})
app.listen(8080)
console.log("server started") 