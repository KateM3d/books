const express = require("express");
const router = express.Router();
const booksRoutes = require("./books");

router.use("/books", booksRoutes);

module.exports = router;