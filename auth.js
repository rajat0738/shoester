
const fs =  require('fs');
const mongo = require("./mongo")
let cartArray = []
let data = []
let login = false;
 
 function isAuth(email, pass){
    login = true;
    return mongo.getUser(email,pass)
 }

function registerUser(data){
    mongo.registerInDb(data)
}

function getShoppingData(){
    data1 = require("./d.json")
    data = data1.data
    return data1.data
}

function userLogin(){
    console.log("login value: ", login)
    return login;
}
function logOut(){
    login = false;
}
function getcartItems(){
    return cartArray
}

function addItem(id){
    for( let i = 0; i<cartArray.length; i++){
        if(cartArray[i].id == id){
            return
        }
    }
    for(let i = 0; i<data.length; i++){
        if(data[i].id == id){
            cartArray.push(data[i])
        }
    }
    console.log("Cart Items: ", cartArray)
}
function removeItem(id){
    for(let i = 0; i<cartArray.length; i++){
        if(cartArray[i].id == id){
            cartArray.splice(i,1)
        }
    }
}
function price(){
    price = 0
    for(let i=0;i>cartArray.length;i++){
        price += cartArray[i].price
        return price
    }
}
// getShoppingData()
module.exports = {isAuth, registerUser, getShoppingData, userLogin, logOut, getcartItems, addItem, removeItem, price}