const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");

router.get("/", booksController.getAll);
router.get("/:id", booksController.getById);
router.post("/", booksController.create);
router.put("/:id", booksController.updateById);
router.delete("/:id", booksController.deleteById);

module.exports = router;