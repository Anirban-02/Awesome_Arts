const nodemailer=require('nodemailer');
const Mailgen=require('mailgen');
const {Email,Password}=require('./env.js')
const orderConfirmMail=(req,res)=>{
    const {email}=req.body;
    console.log("usermail : ",email)
    let config={
        service:'gmail',
        auth:{
            user:Email,
            pass:Password
        }
    }
    let transporter=nodemailer.createTransport(config);
    let MailGenerator=new Mailgen(
        {
            theme:"default",
            product : {
                name:"Mailgen",
                link:'https://mailgen.js/'
            }
        }
    )
    let response={
        body:{
            name:"",
            intro:"Your Order has been Successfully Placed!",
            table:{
                data: [
                {
                    item:"Dawingg",
                    desc:"SOLD",
                    price:"Rs.300"
                }
                ]
            },
            outro:"Thanks for placing the Order"
        }
    }
    let mail=MailGenerator.generate(response);
    let message={
        from:Email,
        to:email,
        subject:"Order Placed",
        html:mail
    }
    transporter.sendMail(message).then(()=>{
        return res.status(201).json({
            msg:'You received an email'
        })
    }).catch(error=>{
        return res.status(500).json({error})
    })
}
module.exports={
    orderConfirmMail
}