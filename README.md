# Travlr Getaways - Module 1 (Express Static Shell)

## Run
```bash
npm install
npm start
```
Visit: http://localhost:3000

## Dev (auto-reload)
```bash
npm run dev
```


## Module 3 (HBS + MVC + JSON)
This project has been updated to render customer-facing pages using Handlebars (HBS) templates under `app_server/views`.

- Routes: `app_server/routes/index.js`
- Controllers: `app_server/controllers/main.js`
- JSON data: `app_server/data/trips.json` (used by `/travel`)
- Static assets (CSS/images): `public/`

### Run
```bash
npm install
npm start
```

Open: http://localhost:3000

### Quick test (dynamic JSON)
Edit `app_server/data/trips.json` (change a trip name), refresh `/travel`, and confirm the page updates without editing HTML.
