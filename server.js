// server.js
// Simple Express server to serve the site and provide a fake API for station & schedule data

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// basic station data
const stations = [
  {id:1, name:{en:'Dahisar (East)',hi:'दहिसर (पूर्व)',mr:'दहिसार (पूर्व)'}},
  {id:2, name:{en:'Pandurang Wadi',hi:'पांडुरंग वाडी',mr:'पांडुरंग वाडी'}},
  {id:3, name:{en:'Miragaon',hi:'मिरागोन',mr:'मिरागोन'}},
  {id:4, name:{en:'Kashigaon',hi:'काशीगाव',mr:'काशीगाव'}},
  {id:5, name:{en:'Sai Baba Nagar',hi:'साईबाबा नगर',mr:'साईं बाबा नगर'}},
  {id:6, name:{en:'Meditiya (Deepak Hospital)',hi:'मेदितिया (डीपक हॉस्पिटल)',mr:'मेदित्य (डीपक रुग्णालय)'}},
  {id:7, name:{en:'Shahid Bhagat Singh Garden',hi:'शहीद भगत सिंग बगीचा',mr:'शहीद भगत सинг बाग'}},
  {id:8, name:{en:'Subhash Chandra Bose Stadium',hi:'सुभाष चंद्र बोस स्टेडियम',mr:'सुभाष चंद्र बोस स्टेडियम'}}
];

// Serve static files. If your frontend is inside a subfolder named 'Webbapp', serve that folder too.
const webappDir = path.join(__dirname, 'Webbapp');
if (fs.existsSync(webappDir)) {
  console.log('Serving static files from:', webappDir);
  app.use(express.static(webappDir));
} else {
  console.log('Serving static files from project root:', __dirname);
  app.use(express.static(path.join(__dirname)));
}

// Simple request logger to help debugging
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});

// API: /api/stations
app.get('/api/stations', (req, res) => {
  res.json({stations});
});

// API: /api/next?from=1  -> returns simulated next-train time in minutes
app.get('/api/next', (req, res) => {
  const from = parseInt(req.query.from || '1');
  const now = Date.now();
  // simple deterministic pseudo-random next arrival for demo
  const eta = ((from * 7) + (Math.floor(now/60000) % 10));
  res.json({from, etaMinutes: eta});
});

app.listen(port, ()=> console.log(`Server running on http://localhost:${port}`));
