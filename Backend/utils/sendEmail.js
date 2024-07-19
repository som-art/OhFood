const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: "Yahoo",
    auth: {
      // user: process.env.SMPT_MAIL,
      user: "oh_food@yahoo.com",
      // pass: process.env.SMPT_PASSWORD,
      pass: "xuaslqbveekdjnga",
    },
  });

  const mailOptions = {
    // from: process.env.SMPT_MAIL,
    from: "oh_food@yahoo.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
