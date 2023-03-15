module.exports = srv => {
    srv.after("READ", "MailGet", async (req, res) => {
        const aAllReceiver = await SELECT.from(`fleetdb.db.Expiry`);
        //console.log(aAllReceiver);

        var nodemailer = require('nodemailer');
        var mailgen = require("mailgen")
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "capmtest.birlasoft@gmail.com",
                pass: "jzxjphvoqbvgngms"
            }
        });
        let MailGenerator = new mailgen({
            theme: "default",
            product: {
                name: "mailgen",
                link: "https://mailgen.js/"
            }
        });
        let response = {
            body: {
                name: "Eshan",
                intro: "Your Insurance Will be expiring!",
                table: {
                    data: [
                        {
                            item: "Node-js stack book",
                            description: "A CAPM application"
                        }
                    ]
                },
                outro: "Looking forwad to renew"
            }
        }
        let mail = MailGenerator.generate(response);
        for (let data of aAllReceiver) {
            var mailOptions = {
                from: 'capmtest.birlasoft@gmail.com',
                to: data.mailid,
                subject: 'Sending Email using Node.js',
                Text: "This Is CAPM Test"
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    })
}