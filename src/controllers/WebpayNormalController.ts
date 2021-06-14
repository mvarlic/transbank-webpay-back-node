const Transbank = require("transbank-sdk")
const transactions: any = {}

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

class WebpayPlusController {
  static init (req: any, res: any) {
    console.log('================================================WebpayPlusController.init================================================');
    const configuration = Transbank.Configuration.forTestingWebpayPlusNormal()
    let Webpay = new Transbank.Webpay(configuration).getNormalTransaction()
    let url = "http://" + req.get("host")
    let amount = 1500
    try {
      Webpay.initTransaction(
        amount,
        "Orden" + getRandomInt(10000, 99999),
        req.sessionId,
        url + "/webpay-normal/response",
        url + "/webpay-normal/finish").then((data: any) => {
          console.log('WebpayPlusController.terminandooooooo => ', data);
          /*
        transactions[data.token] = { amount: amount }
        res.render("redirect-transbank",
          { url: data.url, token: data.token, inputName: "TBK_TOKEN" })*/
      })
    } catch (error) {
      console.log('================================================ WebpayPlusController.init ERROR ================================================');
      console.error(error);

      res.json({ 
        anObject: { item1: "item1val", item2: "item2val" }, 
        anArray: ["item1", "item2"], 
        another: "item"
      });
    }

  }

  static response (req: any, res: any) {
    // Esta inicialización que se repite, es mejor llevarla a nu lugar en donde
    // se pueda reutilizar. Por simplicidad, en este ejemplo está el código
    // duplicado en cada método
    console.log('response => ');


    const configuration = Transbank.Configuration.forTestingWebpayPlusNormal()
    let Webpay = new Transbank.Webpay(configuration).getNormalTransaction()

    let token = req.body.token_ws
    

    res.json({ token });
    /*
    Webpay.getTransactionResult(token).then((response: any) => {
      transactions[token] = response
      res.render("redirect-transbank",{ url: response.urlRedirection, token, inputName: "token_ws" })
    }).catch((e: any) => {
      console.log(e)
      res.send("Error")
    })*/
  }

  static finish (req: any, res: any) {
    console.log('finish => ');


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
      } else {
        status = 'REJECTED';
      }
    }

    // Si no se recibió ni token_ws ni TBK_TOKEN, es un usuario que entró directo
    if (status === null) {
      return res.status(404).send("Not found.");
    }


    return res.render("webpay-normal/finish", { transaction, status })

  }
}

module.exports = WebpayPlusController
