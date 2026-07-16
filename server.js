const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(__dirname));

// API Endpoint to handle appointment booking
app.post('/api/book-appointment', (req, res) => {
  const { name, phone, reason } = req.body;
  
  // In a real application, you would save this to a database,
  // send an email notification, or integrate with an EHR system.
  console.log('--- New Appointment Request ---');
  console.log(`Name: ${name}`);
  console.log(`Phone: ${phone}`);
  console.log(`Reason: ${reason}`);
  console.log('-------------------------------');

  // Simulate a slight delay for realism
  setTimeout(() => {
    res.status(200).json({ 
      success: true, 
      message: 'Appointment request received successfully! Our team will contact you shortly.' 
    });
  }, 1000);
});

// Fallback for SPA routing if needed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server (listen on all interfaces for mobile access)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ Server running!`);
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   Mobile:  http://10.166.88.144:${PORT}  (open on your phone)\n`);
});
