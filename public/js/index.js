const express = require("express");
const bodyParser = require("body-parser");
const booksRoutes = require("./src/routes/books");

const app = express();
const PORT = 4000;

// middleware
app.use(bodyParser.json());

// routes
app.use("/books", booksRoutes);

// start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});