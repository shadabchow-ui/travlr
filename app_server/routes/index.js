const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');

// Customer-facing pages
router.get('/', ctrlMain.index);
router.get('/travel', ctrlMain.travel);
router.get('/rooms', ctrlMain.rooms);
router.get('/meals', ctrlMain.meals);
router.get('/news', ctrlMain.news);
router.get('/about', ctrlMain.about);
router.get('/contact', ctrlMain.contact);

// Optional: support old .html links if someone hits them
router.get('/index.html', (req, res) => res.redirect('/'));
router.get('/travel.html', (req, res) => res.redirect('/travel'));
router.get('/rooms.html', (req, res) => res.redirect('/rooms'));
router.get('/meals.html', (req, res) => res.redirect('/meals'));
router.get('/news.html', (req, res) => res.redirect('/news'));
router.get('/about.html', (req, res) => res.redirect('/about'));
router.get('/contact.html', (req, res) => res.redirect('/contact'));

module.exports = router;
