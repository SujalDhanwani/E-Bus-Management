const sgMail = require("@sendgrid/mail");

// Replace with your actual API key if not using .env
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "sujaldhanwani25@gmail.com",       // ✅ Put YOUR OWN email here
  from: process.env.EMAIL_FROM,               // ✅ Must be VERIFIED in SendGrid
  subject: "✅ SendGrid Test Email",
  text: "This is a test email sent via SendGrid to verify configuration."
};

sgMail
  .send(msg)
  .then(() => console.log("✅ Test email sent successfully!"))
  .catch((error) => {
    console.error("❌ Error sending test email:", error);
    if (error.response) {
      console.error("Response body:", error.response.body);
    }
  });
