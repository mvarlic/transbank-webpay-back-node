import express from 'express';
const WebpayPlusController = require('./controllers/WebpayNormalController')
const app = express();



app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get("/init", WebpayPlusController.init)

app.post("/webpay-normal/response", WebpayPlusController.response)

app.post("/webpay-normal/finish", WebpayPlusController.finish)


app.listen(3000, () => {
  console.log(`server running on port 3000`);
});