import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  //
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //smpt gmail host
    port: 587, //smpt gmail port
    secure: config.node_env === "pruduction",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "sayedulhoque3544@gmail.com", //smpt gmail
      pass: "qukq hhhq cgto wxuw", //smpt gmail app pass
    },
  });
  //

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"sayedulhoque@gmail.com', // sender address
    to, // list of receivers//princesayed746@gmail.com
    subject: "Reset your password withing 10 minitues", // Subject line
    text: "", // plain text body
    html, // html body
  });
};
