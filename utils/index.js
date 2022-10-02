const sgMail = require('@sendgrid/mail');

// Set up apikey for sendgrid api
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Method to send an email
function sendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
        sgMail.send(mailOptions, (error, result) => {
            if (error) return reject(error);
            return resolve(result);
        });
    });
}

module.exports = { sendEmail };