export default async function (req, res) {
  require("dotenv").config();

  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
    secure: true,
  });
  const mailData = {
    from: "mongo4688@gmail.com",
    to: "detailsclass625@gmail.com",
    subject: `Class Fees`,
    //   text: req.body.message + " | Sent from: " + req.body.email,
    html: `
    <div><strong>Name:</strong> ${req.body.fullName}</div>
    <br/>
    <div><strong>Paid or Not:</strong> ${req.body.email}</div>
    <br/>
    <div><strong>Amount:</strong> ${req.body.phone}</div>
    <br/>`,
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
  res.status(200).json({ status: "OK" });
}
