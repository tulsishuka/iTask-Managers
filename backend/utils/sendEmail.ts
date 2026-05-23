
// import nodemailer from "nodemailer";

// export const sendEmail = async (
//   to: string,
//   subject: string,
//   text: string
// ) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp-relay.brevo.com",
//       port: 587,
//       secure: false,

//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });
// console.log("USING BREVO SMTP");
// console.log(process.env.EMAIL_USER);
//     await transporter.verify();

//     console.log("SMTP VERIFIED");

//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       text,
//     });

//     console.log("EMAIL SENT:", info.response);

//   } catch (error) {
//     console.log("EMAIL ERROR:", error);
//   }
// };


import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  text: string
) => {
  try {
    console.log("USING BREVO SMTP");

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    await transporter.verify();

    console.log("SMTP VERIFIED");

    const info = await transporter.sendMail({
      from: '"GiveHope" <tulsishuklag@gmail.com>',
      to,
      subject,
      text,
    });

    console.log("EMAIL SENT:", info.response);

  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};