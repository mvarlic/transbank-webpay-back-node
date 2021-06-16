"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var path_1 = require("path");
var WebpayPlusController = require('./controllers/WebpayNormalController');
var app = express_1["default"]();
var PORT = process.env.PORT || 3000;
// Configure Express to use EJS
app.set("views", path_1["default"].join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.use(express_1["default"].static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.render('index');
});
/*
 |--------------------------------------------------------------------------
 | Webpay Plus Normal
 |--------------------------------------------------------------------------
 */
app.get("/webpay-normal/init", WebpayPlusController.init);
app.post("/webpay-normal/response", WebpayPlusController.response);
app.post("/webpay-normal/finish", WebpayPlusController.finish);
app.listen(PORT, function () {
    console.log("server running on port " + PORT);
});
