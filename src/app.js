const express = require("express");
const booksRoutes = require("./routes/booksRoutes");

const app = express();
app.use(express.json());
app.use("/", booksRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});