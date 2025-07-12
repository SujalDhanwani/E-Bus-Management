const bcrypt = require("bcryptjs");
const User = require("../models/User");
const nodemailer = require("nodemailer");

exports.createDriver = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    // 1. Validation
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ msg: "All fields are required (firstName, lastName, email)." });
    }

    // 2. Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "A user with this email already exists." });
    }

    // 3. Generate password and hash
    const plainPassword = `${firstName.toLowerCase()}${Math.floor(1000 + Math.random() * 9000)}`;
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // 4. Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "driver"
    });

    await user.save();

    // 5. Configure Nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM, // must match Gmail app password
        pass: process.env.EMAIL_PASS
      }
    });

    // 6. Email content
    const mailOptions = {
      from: `"E-Bus Management" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Your Driver Account Credentials",
      text: `Hello ${firstName},

Your driver account has been created.

Login Details:
Email: ${email}
Password: ${plainPassword}

Please log in and change your password after first login.

Best regards,
E-Bus Management System`
    };

    // 7. Send email
    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      msg: "✅ Driver created and email sent successfully.",
      driver: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("❌ Error creating driver:", err);
    return res.status(500).json({ msg: "Server error creating driver. See logs." });
  }
};
