// --- Zaroori Libraries Ko Import Karna ---
const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Email Transporter Setup (Gmail ke liye) ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Yeh .env file se aapka Gmail le lega
        pass: process.env.EMAIL_PASS  // Yeh .env file se aapka App Password le lega
    }
});

// --- API Routes ---

// 1. Contact Form ke liye Route
app.post('/submit-contact', (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body;
    const senderName = `${firstName} ${lastName}`;

    const mailOptions = {
        // IMPORTANT CHANGE: 'from' ko is naye format mein likha gaya hai
        from: `"${senderName}" <${process.env.EMAIL_USER}>`,
        to: 'lucyfer5012@gmail.com', // Yahan apna receiving email daalein
        subject: `New Contact Message from ${senderName}`, // Subject mein bhi naam daal diya
        replyTo: email, // Jab aap reply karenge, toh email seedhe customer ko jaayega
        html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${senderName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not Provided'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Nodemailer Error:", error);
            res.status(500).send('Something went wrong.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Message sent successfully!');
        }
    });
});

// Baaki ka code (submit-resume route aur app.listen) same rahega
// ...

// 2. Submit Resume Form ke liye Route
app.post('/submit-resume', upload.single('resume'), (req, res) => {
    const { fullName, email, phone } = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
        return res.status(400).send('Resume file is required.');
    }

    const mailOptions = {
        from: `"${fullName}" <${process.env.EMAIL_USER}>`,
        to: 'lucyfer5012@gmail.com', // Yahan bhi apna receiving email daalein
        subject: `New Resume Submission from ${fullName}`,
        replyTo: email,
        html: `
            <h2>New Candidate Application</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not Provided'}</p>
            <p>A resume has been attached to this email.</p>
        `,
        attachments: [
            {
                filename: resumeFile.originalname,
                content: resumeFile.buffer
            }
        ]
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Nodemailer Error:", error);
            res.status(500).send('Something went wrong.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Application submitted successfully!');
        }
    });
});



// 3. Teesre Form (General Inquiry) ke liye Route
app.post('/submit-inquiry', (req, res) => {
    // Form se 'name', 'mobile', 'email', 'message' nikal rahe hain
    const { name, mobile, email, message } = req.body;

    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        to: 'lucyfer5012@gmail.com', // Yahan apna receiving email daalein
        subject: `New General Inquiry from ${name}`,
        replyTo: email,
        html: `
            <h2>New General Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mobile:</strong> ${mobile || 'Not Provided'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Nodemailer Error:", error);
            res.status(500).send('Something went wrong.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Inquiry submitted successfully!');
        }
    });
});


// --- Server ko Start Karna ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

