const nodemailer = require("nodemailer");

// Function to send the adoption approval email
async function sendAdoptionApprovalEmail(userEmail, petName) {
  // Create a transporter for Gmail (you can also use other email services like Outlook, Yahoo, etc.)
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use other email services like Outlook, Yahoo, etc.
    auth: {
      user: process.env.EMAIL_USER,  // Your Gmail email address (set in .env file)
      pass: process.env.EMAIL_PASSWORD,  // Your email password (set in .env file)
    },
  });

  // Set up the email details
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender address
    to: userEmail,  // Recipient's email address
    subject: "Pet Adoption Request Approved",  // Subject of the email
    text: `Congratulations! Your adoption request for ${petName} has been approved. Please visit us to complete the adoption process.`,  // Email body
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendAdoptionApprovalEmail };
