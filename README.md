# Proyecto Typescript ejemplo usando sdk Transbank 

Tarjeta para compra exitosa
```bash
4051 8856 0044 6623
CCV: 123
11/22 (cualquier fecha futura)
```

Datos a usar en transbank:
```bash
User:  11111111-1
Pass: 123
```

Respuesta a transaccion exitosa:
```bash
{
  "accountingDate": "0610",
  "buyOrder": "Orden67847",
  "cardDetail": {
    "cardNumber": "6623"
  },
  "detailOutput": [
    {
      "sharesNumber": 0,
      "amount": "1500",
      "commerceCode": "597020000540",
      "buyOrder": "Orden67847",
      "authorizationCode": "1213",
      "paymentTypeCode": "VN",
      "responseCode": 0
    }
  ],
  "transactionDate": "2021-06-10T14:56:08.120Z",
  "urlRedirection": "https://webpay3gint.transbank.cl/webpayserver/voucher.cgi",
  "VCI": "TSY"
}
```
