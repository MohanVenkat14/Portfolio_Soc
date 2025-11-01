const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection - Updated for MongoDB Atlas
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('MongoDB URI is not defined. Please set MONGODB_URI environment variable.');
}

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
})

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

// Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide name, email, and message' });
    }
    
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: error.message });
  }
});

// Export for Vercel
module.exports = app;

