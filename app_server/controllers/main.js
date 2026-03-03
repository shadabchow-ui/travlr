const index = (req, res) => {
  res.render('index', { title: 'Travlr Getaways' });
};

const about = (req, res) => {
  res.render('about', { title: 'Travlr Getaways - About' });
};

const contact = (req, res) => {
  res.render('contact', { title: 'Travlr Getaways - Contact' });
};

const meals = (req, res) => {
  res.render('meals', { title: 'Travlr Getaways - Meals' });
};

const news = (req, res) => {
  res.render('news', { title: 'Travlr Getaways - News' });
};

const rooms = (req, res) => {
  res.render('rooms', { title: 'Travlr Getaways - Rooms' });
};

const travel = async (req, res) => {
  // Separation of concerns: MVC consumes JSON from the REST API
  // (instead of reading trips.json directly)
  try {
    const base = `${req.protocol}://${req.get('host')}`;
    const response = await fetch(`${base}/api/trips`);
    const trips = await response.json();

    return res.render('travel', {
      title: 'Travlr Getaways - Travel',
      trips,
    });
  } catch (err) {
    return res.render('travel', {
      title: 'Travlr Getaways - Travel',
      trips: [],
      apiError: 'Could not load trips from API.',
    });
  }
};

module.exports = {
  index,
  about,
  contact,
  meals,
  news,
  rooms,
  travel,
};
