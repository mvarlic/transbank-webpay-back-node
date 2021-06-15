"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
// import WebpayPlusController from './controllers/WebpayNormalController';
const WebpayPlusController = require('./controllers/WebpayNormalController');
const app = express_1.default();
const port = 3000;
// Configure Express to use EJS
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname + '/public'));
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
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
//# sourceMappingURL=server.js.map