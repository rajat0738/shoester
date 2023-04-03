const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema({
  email: String,
  password: String,
});

let User;

function initalize() {
  let db = mongoose.createConnection(
    "mongodb+srv://Rajat:1234yuio@cluster0.ao5w3br.mongodb.net/test"
  );

  return new Promise((resolve, reject) => {

    db.on("error", (err) => {
      console.log("Error: ", err);
      reject();
    });
    db.once("open", () => {
      User = db.model("users", schema);
      console.log("user created");
      resolve();
    });
  });
}

function registerInDb(userdata) {

   initalize().then(() => {
      console.log(userdata);
      let user1 = new User(userdata);

      console.log(user1);
      user1
        .save((err) => {
          if (err) {
            console.log("Already exists");
          } else if (err) {
            console.log("Error creating user");
          }
        })
 });
}

function getUser(Email,pass){
    return new Promise((resolve, reject) => {
      initalize().then(() => {

        User.find({email: Email}).exec().then((data)=> {
          console.log(data[0].password, pass)
            if (data[0].password==pass){
                resolve(true)
            }
        }).catch((err)=>{
            reject(err)
        })
   });
    })


}

module.exports = {registerInDb, getUser};
