const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies (needed for REST API)
app.use(express.json());

// Dev-friendly CORS for the Angular Admin SPA (typically runs on :4200)
// Keeps Postman testing simple and avoids browser CORS blocks.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  return next();
});

// Database (Mongoose) + optional seed
require('./app_api/models/db');

// View engine (HBS)
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Partials
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Static assets (CSS/images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes (MVC)
const routes = require('./app_server/routes/index');
app.use('/', routes);

// Routes (REST API)
const apiRoutes = require('./app_api/routes/index');
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Travlr Getaways running at http://localhost:${PORT}`);
});

