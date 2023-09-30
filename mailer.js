const nodemailer = require('nodemailer')
module.exports = async(orderer) => {
    // let testAccount = await nodemailer.createTestAccount()
    
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,//uses port 465 if secure is true.
        secure: false,
        auth: { user: 'abubakr.shomirsaidov2@gmail.com', pass: 'xswciwlmhzicmojr' },
      });
    let email = await transporter.sendMail({
        from: '"Kitob.tj" abubakr.shomirsaidov2@gmail.com', // sender address
        to: "shomirsaidov.abubakr@mail.ru", // list of recipients
        subject: "Новый заказ", // Subject line
        text: "Hi bro !", // plain text body
        html: `
            <h4>
            <em style="color: gray">Заказчик : </em><b>${orderer.name}</b><br/>        
            <em style="color: gray">Телефон заказчика : </em><b>${orderer.tel}</b><br/>
            <em style="color: gray">Почта заказчика : </em><b>${orderer.email}</b><br/>
            <em style="color: gray">Книга : </em><b>${orderer.book}</b><br/>
            <em style="color: gray">Адрес доставки : </em><b>${orderer.address}</b><br/>        
            <em style="color: gray">Номер карты (пусто если наличными курьеру): </em><b>${orderer.card}</b><br/>        
            <em style="color: gray">Стоимость заказа : </em><b>${orderer.price} сомони</b><br/>        
            </h4>
            `, // html body
      });
      console.log("Email: "+email.messageId+" was sent.") //This prints to the console that the email has been sent.
    }


