const Transbank = require("transbank-sdk");
const transactions = {};
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
};
const getWebPay = () => {
    const configuration = Transbank.Configuration.forTestingWebpayPlusNormal();
    return new Transbank.Webpay(configuration).getNormalTransaction();
};
class WebpayPlusController {
    static init(req, res) {
        console.log('================================================WebpayPlusController.init================================================');
        const url = "http://" + req.get("host");
        const amount = 1500;
        getWebPay().initTransaction(amount, "Orden" + getRandomInt(10000, 99999), req.sessionId, url + "/webpay-normal/response", url + "/webpay-normal/finish").then((data) => {
            transactions[data.token] = { amount: amount };
            res.render("redirect-transbank", { url: data.url, token: data.token, inputName: "TBK_TOKEN" });
        });
    }
    static response(req, res) {
        console.log('================================================WebpayPlusController.response================================================');
        const token = req.body.token_ws;
        getWebPay().getTransactionResult(token).then((response) => {
            transactions[token] = response;
            res.render("redirect-transbank", { url: response.urlRedirection, token, inputName: "token_ws" });
        }).catch((e) => {
            console.log(e);
            res.send("Error");
        });
    }
    static finish(req, res) {
        console.log('================================================WebpayPlusController.finish================================================');
        let status = null;
        let transaction = null;
        // Si se recibe TBK_TOKEN en vez de token_ws, la compra fue anulada por el usuario
        if (typeof req.body.TBK_TOKEN !== "undefined") {
            status = 'ABORTED';
        }
        if (typeof req.body.token_ws !== "undefined") {
            transaction = transactions[req.body.token_ws];
            if (transaction.detailOutput[0].responseCode === 0) {
                status = 'AUTHORIZED';
            }
            else {
                status = 'REJECTED';
            }
        }
        // Si no se recibió ni token_ws ni TBK_TOKEN, es un usuario que entró directo
        if (status === null) {
            return res.status(404).send("Not found.");
        }
        //transacción, como el código de autorización, los últimos números de la tarjeta y el tipo de tarjeta utilizada 
        console.log(transaction);
        let result = `La transacción se ha ejecutado correctamente => tarjeta: 'XXXX XXXX XXXX ${transaction.cardDetail.cardNumber}' ,codigo de autorizacion: '${transaction.detailOutput[0].authorizationCode}'`;
        return res.render("webpay-normal/finish", { result, transaction, status });
    }
}
module.exports = WebpayPlusController;
//# sourceMappingURL=WebpayNormalController.js.map