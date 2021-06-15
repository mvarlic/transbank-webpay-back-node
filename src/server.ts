import express from 'express';
import bodyParser from 'body-parser';
import path from "path";
// import WebpayPlusController from './controllers/WebpayNormalController';
const WebpayPlusController = require('./controllers/WebpayNormalController')
const app = express();
const port = 3000

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

app.use(bodyParser.urlencoded({ extended: true }))

/*
app.get( "/", ( req, res ) => {
  res.send( "Hello world!" );
} );*/

// index page

app.get('/', function(req, res) {
  res.render('index');
});


/*
 |--------------------------------------------------------------------------
 | Webpay Plus Normal
 |--------------------------------------------------------------------------
 */
 app.get("/webpay-normal/init", WebpayPlusController.init)

 app.post("/webpay-normal/response", WebpayPlusController.response)

 app.post("/webpay-normal/finish", WebpayPlusController.finish)


app.listen(port, () => {
  console.log(`server running on port ${port}`);
});