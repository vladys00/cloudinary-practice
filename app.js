require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const path = require('path')

const app = express()

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

app.use(logger('dev')) // to see details in terminal (monitor and debug)

const routes = require('./routes/routes')
app.use('/', routes)

// Manejo de errores
app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).render("not-found");
  });

  app.use((err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error("ERROR", req.method, req.path, err);
  
    if (err.status === 404) {
      return res.status(404).render('not-found')
    }
  
    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(500).render("error");
    }
  });

  const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});