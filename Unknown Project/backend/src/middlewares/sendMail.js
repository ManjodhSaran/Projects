import dotenv from 'dotenv';
dotenv.config();
import { google } from 'googleapis';
import nodemailer from 'nodeMailer';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN
// console.log(CLIENT_ID, "\n", CLIENT_SECRET, "\n", REFRESH_TOKEN, "\n", REDIRECT_URI)
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const sendMail = async (from, to, subject, text, html) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        // console.log(accessToken)
        nodemailer.createTransport({ sendmail: true })
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            port: 587, // I also tried port : 26  as in email client config on                 bluehost I found supported port for outgoing is 26  
            secure: false,
            auth: {
                type: 'OAuth2',
                user: 'manjodhsaran39@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refresh_token: REFRESH_TOKEN,
                accessToken: accessToken.token
            },
            // name: "manjodhsaran39@gmail.com"
        });
        const mailOptions = {
            from: 'Verify - Unknown',
            to: ['manjodhsaran39@gmail.com', 'manjodhsaran1@gmail.com', 'manjodhsaran05@gmail.com', 'epicdevil1325.1@gmail.com'],
            // to: ['no-reply-unknown@outlook.com'],
            subject: 'Node Mailer',
            text: 'Click Link to verfy',
            html: '<h1>WOow ,Hello hello this is working</h1>'
        };

        const result = await transporter.sendMail(mailOptions)
        return result
    } catch (error) {
        return error
    }
}

export default sendMail;