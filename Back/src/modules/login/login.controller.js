const Database = require("../../core/database");
const Login = require("./login.model");
const { OAuth2Client, JWT } = require('google-auth-library');
const jsonwebtoken = require("jsonwebtoken");
const googleClient = new OAuth2Client(  '402060880190-hce6bc8gl31jgi9f8vava68h2ep0suf8.apps.googleusercontent.com');
const jwt = require('jsonwebtoken')

        /*Database.collection("users").updateOne(
          { _id: usuario._id },
          { $set: usuario },
          function (err, response) {
            if (err) {
                res.sendStatus(404)
            } else {
              console.log("Se pudo");
            }
          }
        );*/
const LogInController = {
  updateOne: (req, res) => {
    const login = new Login();
    login.getOne(req.body).then((result) => {
      if (result) {
        console.log(result)
        usuario = result;
        jwt.sign({user:usuario}, 'secretkey', (err,token) =>{
          usuario.token = token;
          Database.collection("users").updateOne(
            { _id: usuario._id },
            { $set: usuario },
            function (err, response) {
              if (err) {
                  res.sendStatus(404)
              } else {
                console.log("Se pudo");
              }
            }
          );
          jwt.verify(usuario.token,'secretkey',(err,data) => {
            if(err) res.sendStatus(403);
            else res.json({data})
          })
        })
        //res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    });
  },
  checkGoogleToken:(req,res) =>{
      //console.log(req.body.idToken)
      //console.log("intentando")
      googleClient.verifyIdToken({
      idToken: req.body.idToken
    }).then((res.send({message:"todo bien"})))
  }
};

module.exports = LogInController;
