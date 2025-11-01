const mongoose = require('mongoose');

// MongoDB Connection - Updated for MongoDB Atlas
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('MongoDB URI is not defined. Please set MONGODB_URI environment variable.');
}

// Connect to MongoDB
mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 5000,
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body;
      
      // Basic validation
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide name, email, and message' });
      }
      
      const contact = new Contact({ name, email, message });
      await contact.save();
      res.status(200).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
      console.error('Error saving contact:', error);
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    // Handle GET request - return all contacts
    try {
      const contacts = await Contact.find().sort({ date: -1 });
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

